import os
import json

ROOT_DIR = r"Y:\Drive'ım\OKUL\paylaş"
OUT_PATH = os.path.join("src", "data", "driveTreeData.ts")


def scan_dir(path: str, max_depth: int = 7, depth: int = 0) -> dict:
    name = os.path.basename(path) or "Ortak Drive (paylaş)"
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
                node["c"].append(scan_dir(entry.path, max_depth, depth + 1))
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


def sync_drive_tree():
    if not os.path.exists(ROOT_DIR):
        print(f"[UYARI] {ROOT_DIR} bulunamadı, mevcut driveTreeData.ts korunuyor.")
        return

    tree = scan_dir(ROOT_DIR)
    ts_content = f"""// Bu dosya {ROOT_DIR} dizininden scripts/sync_drive_tree.py ile otomatik üretilmiştir.

export interface DriveTreeNode {{
  n: string;
  t: 'd' | 'f';
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
