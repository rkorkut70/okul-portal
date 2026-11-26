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
                    "startDate": str(row[3]).strip() if len(row) > 3 and row[3] else ""
                })
        return items

    management_board = parse_board('Yönetim Kurulu')
    school_board = parse_board('Yüksekokul Kurulu')

    # 7. Birim Görev Tanımları (Kalite El Kitabı Özeti)
    ws_duties = wb['Birim Görev Tanımları'] if 'Birim Görev Tanımları' in wb.sheetnames else None
    unit_duties = []
    if ws_duties:
        for row in list(ws_duties.iter_rows(values_only=True))[1:]:
            if row and row[0]:
                unit_duties.append({
                    "code": str(row[0]).strip(),
                    "name": str(row[1]).strip(),
                    "head": str(row[2]).strip(),
                    "mission": str(row[3]).strip(),
                    "vision": str(row[4]).strip(),
                    "summary": str(row[5]).strip(),
                    "note": str(row[6]).strip()
                })

    # 8. Sık Kullanılan Bağlantılar
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

    # 9. Telefon Rehberi
    ws_phone = wb['Telefon Rehberi'] if 'Telefon Rehberi' in wb.sheetnames else None
    phone_directory = []
    if ws_phone:
        for row in list(ws_phone.iter_rows(values_only=True))[1:]:
            if row and row[1]:
                phone_directory.append({
                    "id": row[0],
                    "name": str(row[1]).strip(),
                    "role": str(row[2]).strip() if row[2] else "",
                    "extension": str(row[3]).strip() if row[3] else "",
                    "externalPhone": str(row[4]).strip() if row[4] else "",
                    "email": str(row[5]).strip() if row[5] and str(row[5]) != '-' else None
                })

    # 10. CPD Faaliyetleri
    ws_cpd = wb['CPD Faaliyetleri'] if 'CPD Faaliyetleri' in wb.sheetnames else None
    cpd_activities = []
    archive_prefix = [
        "Kalite ve Akreditasyon",
        "4. AKADEMIK BIRIMLER - ACADEMIC UNITS",
        "5. SÜREKLİ MESLEKİ GELİŞİM BİRİMİ",
        "Etkinlikler & Eğitimler - Events & Trainings",
        "Yıllık Kronolojik Arşiv (2023-2027)",
    ]
    year_folder_map = {
        "2023-2024": "2023-24",
        "2024-2025": "2024-25",
        "2025-2026": "2025-26",
        "2026-2027": "2026-27",
    }
    event_folder_lookup = {
        ("2026-10-19", "Kurum İçi"): "2026-10-19_Kalite-Guvencesi-Ders-Gozlemi-ve-Veri-Toplama",
        ("2026-11-06", "Kurum İçi"): "2026-11-06_Madde-Analizi-Sinavdan-Kanita-MUSE",
        ("2026-12-11", "Kurum İçi"): "2026-2027_Planli-Workshop-Programi",
        ("2027-02-26", "Kurum İçi"): "2026-2027_Planli-Workshop-Programi",
        ("2027-03-26", "Kurum İçi"): "2026-2027_Planli-Workshop-Programi",
        ("2027-05-07", "Kurum İçi"): "2026-2027_Planli-Workshop-Programi",
        ("2025-10-10", "Kurum İçi"): "2025-10-10_Yeni-Pacing-Formati-Kullanim-Onerileri",
        ("2025-10-31", "Kurum İçi"): "2025-10-31_Ogrenci-Konusma-Suresinin-Artirilmasi",
        ("2025-12-26", "Kurum İçi"): "2025-12-26_Etkili-Ders-Planlama-Lesson-Planning",
        ("2026-02-27", "Kurum İçi"): "2026-02-27_Sinif-Yonetimi-Sanati-Classroom-Management",
        ("2026-04-01", "Kurum İçi"): "2026-04-01_Ogrenci-Ozerkligi-Nasil-Saglanir",
        ("2026-04-17", "Kurum Dışı"): "2026-05-15_Unifest-2026",
        ("2026-04-24", "Kurum Dışı"): "2026-04-24_Empowering-Teachers-for-Classroom-Impact-Mugla",
        ("2026-05-07", "Kurum Dışı"): "2026-05-01_18-YDYO-Yoneticiler-Toplantisi",
        ("2026-06-09", "Kurum Dışı"): "2026-06-09_MSKU-YDYO-Language-and-Fun-Day",
        ("2024-11-22", "Kurum Dışı"): "2024-11-22_3rd-Aegean-SoFL-Symposium-Yasar-Uni",
        ("2024-12-06", "Kurum İçi"): "2024-12-06_Etkili-Program-Tasarimi-CEFR-Mapping",
        ("2024-12-13", "Kurum Dışı"): "2024-12-13_15-Uluslararasi-Egitimde-Yeni-Yonelimler-Kongresi",
        ("2025-01-24", "Kurum İçi"): "2025-01-24_Dil-Degerlendirme-ve-Madde-Analizi",
        ("2025-02-22", "Kurum Dışı"): "2025-02-22_Syllabus-Design-in-Practice-Izmir",
        ("2025-02-28", "Kurum İçi"): "2025-02-28_Formative-and-Summative-Assessment",
        ("2025-03-01", "Kurum Dışı"): "2025-03-01_Looking-for-Evidence-of-Learning-Izmir",
        ("2025-03-19", "Kurum Dışı"): "2025-03-19_Designing-Framework-for-Language-Learning-Istanbul",
        ("2025-03-21", "Kurum Dışı"): "2025-03-21_Leadership-in-the-AI-Era-Izmir",
        ("2025-03-21", "Kurum İçi"): "2025-03-21_Use-of-AI-for-Exam-Preparation-and-Writing-Assessment",
        ("2025-04-10", "Kurum İçi"): "2025-04-10_AI-Based-Language-Teaching-Sharing-Session",
        ("2025-04-25", "Kurum Dışı"): "2025-04-25_Bridging-Ideas-Building-Solutions-Antalya",
        ("2025-05-02", "Kurum Dışı"): "2025-05-02_Future-Ready-ELT-Uludag-Uni",
        ("2025-06-17", "Kurum İçi"): "2025-06-17_SARSing-for-Effective-Learning-Objectives",
        ("2023-09-18", "Kurum İçi"): "2023-07-12_ve_09-18_Erasmus-Proje-Yazma-Egitimi",
        ("2023-12-15", "Kurum Dışı"): "2023-12-15_FOCI-XXIV-AI-in-Curriculum-Design-Istanbul",
        ("2024-01-19", "Kurum Dışı"): "2024-01-19_Agility-Adaptability-Testing-Assessment-Istanbul",
        ("2024-01-19", "Kurum İçi"): "2024-01-19_Sinif-Ici-Oz-Yansitma-Teknikleri",
        ("2024-02-23", "Kurum Dışı"): "2024-02-23_AI-in-the-Classroom-Ankara",
        ("2024-03-01", "Kurum İçi"): "2024-03-01_Akran-Gozlemi-ve-Geri-Bildirim-Sanati",
        ("2024-03-06", "Kurum İçi"): "2024-03-06_Sinifta-Yapay-Zeka-ve-Socrative-Kullanimi",
        ("2024-03-22", "Kurum İçi"): "2024-03-22_Ders-Gozlemi-Bilgilendirme-Toplantisi",
        ("2024-05-03", "Kurum İçi"): "2024-05-03_Yabanci-Dil-Ogretiminde-Yapay-Zeka-Kullanimi",
        ("2024-05-09", "Kurum Dışı"): "2024-05-09_Defining-Institutional-Effectiveness-KKTC",
        ("2024-05-17", "Kurum İçi"): "2024-05-17_FOCI-XXV-ADU-YDYO",
        ("2024-05-24", "Kurum İçi"): "2024-05-24_Yabanci-Dil-Ogretiminde-Teknoloji-ve-Yapay-Zeka",
        ("2024-06-11", "Kurum İçi"): "2024-06-11_Ders-Gozlemi-ve-Mesleki-Ogrenme-Topluluklari",
    }
    CPD_EVENTS_DRIVE_URL = "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll"
    if ws_cpd:
        for idx, row in enumerate(list(ws_cpd.iter_rows(values_only=True))[1:], start=1):
            if not row or len(row) < 8 or not row[7]:
                continue
            academic_year = str(row[0]).strip() if row[0] else "2026-2027"
            raw_status = str(row[1]).strip().lower() if row[1] else "planlandı"
            status = "completed" if any(k in raw_status for k in ["tamam", "completed", "bitti"]) else "upcoming"
            sort_date = str(row[2]).strip() if row[2] else ""
            date_str = str(row[3]).strip() if row[3] else ""
            category = str(row[4]).strip() if row[4] else "Atölye"
            scope = str(row[5]).strip() if row[5] else "Kurum İçi"
            location = str(row[6]).strip() if row[6] else ""
            title = str(row[7]).strip()
            trainers = str(row[8]).strip() if len(row) > 8 and row[8] else ""

            participant_count = None
            if len(row) > 9 and row[9] is not None and str(row[9]).strip() != "":
                try:
                    val = int(float(str(row[9]).strip()))
                    if val > 0:
                        participant_count = val
                except ValueError:
                    participant_count = None

            participants = str(row[10]).strip() if len(row) > 10 and row[10] else ""
            doc_title = str(row[11]).strip() if len(row) > 11 and row[11] else ""
            doc_url = str(row[12]).strip() if len(row) > 12 and row[12] else ""
            if doc_url == "https://drive.google.com/drive/folders/12u9Lgl5DngydJAwf3BrxNp-I8Catbt_z":
                doc_url = CPD_EVENTS_DRIVE_URL
            summary = str(row[13]).strip() if len(row) > 13 and row[13] else ""

            item = {
                "id": f"cpd-{academic_year}-{idx}",
                "unitId": "cpd",
                "academicYear": academic_year,
                "title": title,
                "date": date_str,
                "sortDate": sort_date,
                "category": category,
                "scope": scope,
                "summary": summary,
                "targetAudience": "Tüm Öğretim Elemanları" if scope == "Kurum İçi" else (participants or "Öğretim Elemanları"),
                "status": status,
                "organizer": trainers if trainers else "Sürekli Mesleki Gelişim Birimi (CPD)",
            }
            if trainers:
                item["trainers"] = trainers
            if participant_count is not None:
                item["participantCount"] = participant_count
            if participants:
                item["participants"] = participants
            if location:
                item["location"] = location
            if doc_title:
                item["driveDocTitle"] = doc_title
            if doc_url:
                item["driveDocUrl"] = doc_url
            y_dir = year_folder_map.get(academic_year)
            ev_dir = event_folder_lookup.get((sort_date, scope))
            if y_dir and ev_dir:
                item["driveFolderPath"] = archive_prefix + [y_dir, ev_dir]

            cpd_activities.append(item)

    ts_content = f"""// Bu dosya docs/okul_bilgi.xlsx dosyasından scripts/sync_school_data.py ile otomatik üretilmiştir.
// Manuel düzenleme yapmayınız.

import type {{ ActivityItem }} from '../types';

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
  startDate: string;
}}

export interface UnitDutyInfo {{
  code: string;
  name: string;
  head: string;
  mission: string;
  vision: string;
  summary: string;
  note: string;
}}

export interface UsefulLinkInfo {{
  id: number;
  title: string;
  category: string;
  url: string;
  description: string;
}}

export interface PhoneDirectoryItem {{
  id: number;
  name: string;
  role: string;
  extension: string;
  externalPhone: string;
  email: string | null;
}}

export const ACADEMIC_STAFF: AcademicStaff[] = {json.dumps(academic_staff, ensure_ascii=False, indent=2)};

export const ADMINISTRATIVE_STAFF: AdministrativeStaff[] = {json.dumps(admin_staff, ensure_ascii=False, indent=2)};

export const ACADEMIC_UNITS_DATA: AcademicUnitInfo[] = {json.dumps(academic_units, ensure_ascii=False, indent=2)};

export const CLASSROOMS: ClassroomInfo[] = {json.dumps(classrooms, ensure_ascii=False, indent=2)};

export const BRANCH_ADVISORS: BranchAdvisorInfo[] = {json.dumps(advisors, ensure_ascii=False, indent=2)};

export const MANAGEMENT_BOARD: BoardMemberInfo[] = {json.dumps(management_board, ensure_ascii=False, indent=2)};

export const SCHOOL_BOARD: BoardMemberInfo[] = {json.dumps(school_board, ensure_ascii=False, indent=2)};

export const UNIT_DUTIES: UnitDutyInfo[] = {json.dumps(unit_duties, ensure_ascii=False, indent=2)};

export const USEFUL_LINKS: UsefulLinkInfo[] = {json.dumps(useful_links, ensure_ascii=False, indent=2)};

export const PHONE_DIRECTORY: PhoneDirectoryItem[] = {json.dumps(phone_directory, ensure_ascii=False, indent=2)};

export const CPD_ACTIVITIES_DATA: ActivityItem[] = {json.dumps(cpd_activities, ensure_ascii=False, indent=2)};
"""

    with open('src/data/schoolData.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print("src/data/schoolData.ts başarıyla üretildi!")

if __name__ == '__main__':
    sync_school_data()
