import openpyxl
import json
import re

def sync_school_data():
    wb = openpyxl.load_workbook('docs/okul_bilgi.xlsx')

    # 1. Akademik Personel
    ws_ap = wb['Akademik Personel']
    academic_staff = []
    for row in list(ws_ap.iter_rows(values_only=True))[1:]:
        if row and row[2]:
            academic_staff.append({
                "id": row[0],
                "title": str(row[1]).strip() if row[1] else "",
                "name": str(row[2]).strip(),
                "language": str(row[3]).strip() if row[3] else "",
                "role": str(row[4]).strip() if row[4] else None,
                "dutyPlace": str(row[5]).strip() if row[5] else "YDYO",
                "email": str(row[6]).strip() if row[6] else None,
                "phone": str(row[7]).strip() if row[7] else None,
                "officeHour": str(row[8]).strip() if row[8] else None,
                "akbisUrl": str(row[9]).strip() if len(row) > 9 and row[9] else None,
            })

    # 2. İdari Personel
    ws_ip = wb['İdari Personel']
    admin_staff = []
    for row in list(ws_ip.iter_rows(values_only=True))[1:]:
        if row and row[1]:
            admin_staff.append({
                "id": row[0],
                "name": str(row[1]).strip(),
                "role": str(row[2]).strip() if row[2] else "",
                "email": str(row[3]).strip() if row[3] else None,
                "phone": str(row[4]).strip() if row[4] else None,
            })

    # 3. Akademik Birimler
    ws_ab = wb['Akademik birimler']
    units_map = {}
    current_unit = None

    for row in list(ws_ab.iter_rows(values_only=True))[1:]:
        if not any(row):
            continue
        unit_name = str(row[1]).strip() if row[1] else current_unit
        if not unit_name:
            continue
        current_unit = unit_name

        if current_unit not in units_map:
            units_map[current_unit] = {
                "academicYear": str(row[0]).strip() if row[0] else "2026-2027",
                "name": current_unit,
                "code": str(row[2]).strip() if row[2] else "",
                "head": str(row[4]).strip() if row[4] else "",
                "members": [],
                "driveUrl": str(row[6]).strip() if row[6] else None
            }
        
        # update head if present
        if row[4] and str(row[4]).strip():
            units_map[current_unit]["head"] = str(row[4]).strip()
        if row[2] and str(row[2]).strip():
            units_map[current_unit]["code"] = str(row[2]).strip()
        if row[6] and str(row[6]).strip():
            units_map[current_unit]["driveUrl"] = str(row[6]).strip()

        # member
        if row[5] and str(row[5]).strip():
            units_map[current_unit]["members"].append(str(row[5]).strip())

    academic_units = list(units_map.values())

    # 4. Derslikler
    ws_d = wb['Derslikler']
    classrooms = []
    for row in list(ws_d.iter_rows(values_only=True))[1:]:
        if row and row[0]:
            classrooms.append({
                "name": str(row[0]).strip(),
                "code": str(row[1]).strip() if row[1] else "",
                "capacity": int(row[2]) if row[2] else 30
            })

    # 5. Şube Danışmanları
    ws_sd = wb['Şube Danışmaları']
    advisors = []
    current_lang = "İngilizce"
    for row in list(ws_sd.iter_rows(values_only=True))[1:]:
        if not any(row):
            continue
        first_cell = str(row[0]).strip() if row[0] else ""
        if "İNGİLİZCE" in first_cell.upper():
            current_lang = "İngilizce"
            continue
        if "FRANSIZCA" in first_cell.upper():
            current_lang = "Fransızca"
            continue
        if "ALMANCA" in first_cell.upper():
            current_lang = "Almanca"
            continue

        if row[1] or row[3]:
            advisors.append({
                "language": current_lang,
                "obisCode": first_cell,
                "branch": str(row[1]).strip() if row[1] else "",
                "track": str(row[2]).strip() if row[2] else "",
                "advisor": str(row[3]).strip() if row[3] else ""
            })

    # 6. Kurullar
    def parse_board(sheet_name):
        ws = wb[sheet_name]
        items = []
        for row in list(ws.iter_rows(values_only=True))[1:]:
            if row and row[1]:
                items.append({
                    "id": row[0],
                    "name": str(row[1]).strip(),
                    "role": str(row[2]).strip() if row[2] else "",
                    "duty": str(row[3]).strip() if row[3] else ""
                })
        return items

    management_board = parse_board('Yönetim Kurulu')
    school_board = parse_board('Yüksekokul Kurulu')

    # 7. Sık Kullanılan Bağlantılar
    ws_l = wb['Sık Kullanılan Bağlantılar']
    useful_links = []
    for row in list(ws_l.iter_rows(values_only=True))[1:]:
        if row and row[1]:
            useful_links.append({
                "id": row[0],
                "title": str(row[1]).strip(),
                "category": str(row[2]).strip() if row[2] else "Genel",
                "url": str(row[3]).strip() if row[3] else "#",
                "description": str(row[4]).strip() if row[4] else ""
            })

    ts_content = f"""// Bu dosya docs/okul_bilgi.xlsx dosyasından scripts/sync_school_data.py ile otomatik üretilmiştir.
// Manuel düzenleme yapmayınız.

export interface AcademicStaff {{
  id: number;
  title: string;
  name: string;
  language: string;
  role: string | null;
  dutyPlace: string;
  email: string | null;
  phone: string | null;
  officeHour: string | null;
  akbisUrl: string | null;
}}

export interface AdministrativeStaff {{
  id: number;
  name: string;
  role: string;
  email: string | null;
  phone: string | null;
}}

export interface AcademicUnitInfo {{
  academicYear: string;
  name: string;
  code: string;
  head: string;
  members: string[];
  driveUrl: string | null;
}}

export interface ClassroomInfo {{
  name: string;
  code: string;
  capacity: number;
}}

export interface BranchAdvisorInfo {{
  language: string;
  obisCode: string;
  branch: string;
  track: string;
  advisor: string;
}}

export interface BoardMemberInfo {{
  id: number;
  name: string;
  role: string;
  duty: string;
}}

export interface UsefulLinkInfo {{
  id: number;
  title: string;
  category: string;
  url: string;
  description: string;
}}

export const ACADEMIC_STAFF: AcademicStaff[] = {json.dumps(academic_staff, ensure_ascii=False, indent=2)};

export const ADMINISTRATIVE_STAFF: AdministrativeStaff[] = {json.dumps(admin_staff, ensure_ascii=False, indent=2)};

export const ACADEMIC_UNITS_DATA: AcademicUnitInfo[] = {json.dumps(academic_units, ensure_ascii=False, indent=2)};

export const CLASSROOMS: ClassroomInfo[] = {json.dumps(classrooms, ensure_ascii=False, indent=2)};

export const BRANCH_ADVISORS: BranchAdvisorInfo[] = {json.dumps(advisors, ensure_ascii=False, indent=2)};

export const MANAGEMENT_BOARD: BoardMemberInfo[] = {json.dumps(management_board, ensure_ascii=False, indent=2)};

export const SCHOOL_BOARD: BoardMemberInfo[] = {json.dumps(school_board, ensure_ascii=False, indent=2)};

export const USEFUL_LINKS: UsefulLinkInfo[] = {json.dumps(useful_links, ensure_ascii=False, indent=2)};
"""

    with open('src/data/schoolData.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print("src/data/schoolData.ts başarıyla üretildi!")

if __name__ == '__main__':
    sync_school_data()
