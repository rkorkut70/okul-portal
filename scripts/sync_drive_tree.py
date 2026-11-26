import os
import json
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

ROOT_DIR = r"G:\Drive'ım\Portal Belge Deposu"
ROOT_DRIVE_ID = "12u9Lgl5DngydJAwf3BrxNp-I8Catbt_z"
OUT_PATH = os.path.join("src", "data", "driveTreeData.ts")


def fetch_gdrive_entries(folder_id: str) -> dict[str, tuple[str, bool]]:
    """Return {title: (entry_id, is_folder)} from Google Drive embeddedfolderview."""
    url = f"https://drive.google.com/embeddedfolderview?id={folder_id}#list"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        html = urllib.request.urlopen(req, timeout=15).read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"[WARN] Drive fetch failed for {folder_id}: {e}")
        return {}
    # Match each entry block
    entries: dict[str, tuple[str, bool]] = {}
    blocks = re.findall(
        r'id="entry-([^"]+)"[^>]*>.*?href="([^"]+)"[^>]*>.*?class="flip-entry-title">([^<]+)<',
        html,
        re.S,
    )
    for eid, href, title in blocks:
        is_folder = "/drive/folders/" in href or "folders/" in href
        clean_title = title.strip()
        # Unescape basic HTML entities if any
        clean_title = (
            clean_title.replace("&amp;", "&")
            .replace("&#39;", "'")
            .replace("&quot;", '"')
            .replace("&lt;", "<")
            .replace("&gt;", ">")
        )
        entries[clean_title] = (eid, is_folder)
    return entries


def scan_local(path: str, max_depth: int = 7, depth: int = 0) -> dict:
    name = os.path.basename(path) or "Portal Belge Deposu"
    node: dict = {"n": name, "t": "d", "c": []}
    if depth >= max_depth:
        return node
    try:
        entries = sorted(os.scandir(path), key=lambda e: (not e.is_dir(), e.name.lower()))
        for entry in entries:
            if entry.name.lower() == "desktop.ini" or entry.name.startswith("~") or entry.name.startswith("."):
                continue
            if entry.name == "yedekler":
                continue
            if entry.is_dir():
                node["c"].append(scan_local(entry.path, max_depth, depth + 1))
            else:
                ext = os.path.splitext(entry.name)[1].lower().lstrip(".")
                try:
                    sz = entry.stat().st_size
                except OSError:
                    sz = 0
                node["c"].append({"n": entry.name, "t": "f", "e": ext, "s": sz})
    except OSError:
        pass
    return node


def attach_drive_ids(root_node: dict, root_id: str) -> int:
    """Breadth-first concurrent crawl of Google Drive folders to attach 'id' to matching nodes."""
    root_node["id"] = root_id
    queue = [(root_node, root_id)]
    matched_count = 0

    with ThreadPoolExecutor(max_workers=12) as pool:
        while queue:
            futures = {pool.submit(fetch_gdrive_entries, fid): node for node, fid in queue}
            next_queue = []
            for fut in as_completed(futures):
                parent_node = futures[fut]
                entries = fut.result()
                if not entries:
                    continue
                for child in parent_node.get("c", []):
                    match = entries.get(child["n"])
                    if not match:
                        # Try case-insensitive fallback
                        low = child["n"].lower()
                        for k, v in entries.items():
                            if k.lower() == low:
                                match = v
                                break
                    if match:
                        eid, _is_dir = match
                        child["id"] = eid
                        matched_count += 1
                        if child["t"] == "d":
                            next_queue.append((child, eid))
            queue = next_queue
    return matched_count


def sync_drive_tree():
    if not os.path.exists(ROOT_DIR):
        print(f"[UYARI] {ROOT_DIR} bulunamadı, mevcut driveTreeData.ts korunuyor.")
        return

    tree = scan_local(ROOT_DIR)
    matched = attach_drive_ids(tree, ROOT_DRIVE_ID)
    print(f"Google Drive ID eşleştirilen öğe sayısı: {matched}")

    ts_content = f"""// Bu dosya {ROOT_DIR} dizininden scripts/sync_drive_tree.py ile otomatik üretilmiştir.

export interface DriveTreeNode {{
  n: string;
  t: 'd' | 'f';
  id?: string;
  e?: string;
  s?: number;
  c?: DriveTreeNode[];
}}

export const SHARED_DRIVE_TREE: DriveTreeNode = {json.dumps(tree, ensure_ascii=False)};
"""
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print("src/data/driveTreeData.ts başarıyla üretildi!")


if __name__ == "__main__":
    sync_drive_tree()
