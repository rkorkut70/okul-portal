import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import json
import re

# Load scraped staff
with open('scripts/scraped_staff.json', 'r', encoding='utf-8') as f:
    scraped = json.load(f)

web_staff = scraped['web_staff']
akbis_emails = scraped['akbis_emails']
dis_gorevliler = scraped['dis_gorevliler']

# Helper to normalize turkish characters for matching
def normalize(text):
    text = text.upper()
    tr_map = {'İ': 'I', 'I': 'I', 'Ş': 'S', 'Ğ': 'G', 'Ü': 'U', 'Ö': 'O', 'Ç': 'C'}
    for k, v in tr_map.items():
        text = text.replace(k, v)
    return ' '.join(re.sub(r'[^A-Z0-9]', ' ', text).split())

def match_dis_gorev(name):
    norm_name = normalize(name)
    for k, v in dis_gorevliler.items():
        norm_k = normalize(k)
        if norm_k in norm_name or norm_name in norm_k:
            return v
    return "YDYO (Yabancı Diller Yüksekokulu)"

# Languages
def get_language(name, default_lang="İngilizce"):
    norm = normalize(name)
    french = ['BUKET SAHIN', 'SEHER OZDEMIR', 'GUL TECIMER', 'ULVIYE KARACA']
    german = ['BUSE ARASILER', 'FATMA BASKAYA', 'CIMEN ATAY', 'FISUN KARABURUN', 'PELIN GURLER', 'BEYZASU KUCUKDANACI']
    for f in french:
        if f in norm:
            return "Fransızca"
    for g in german:
        if g in norm:
            return "Almanca"
    return "İngilizce"

# Load existing workbook
wb = openpyxl.load_workbook('docs/okul_bilgi.xlsx')
ws = wb['Akademik Personel']

# Preserve existing dahili tel or office hour if any
existing_data = {}
for r in list(ws.iter_rows(values_only=True))[1:]:
    if r and r[1]:
        name_key = normalize(str(r[1]))
        existing_data[name_key] = {
            'role': r[3],
            'email': r[4],
            'phone': r[5],
            'officeHour': r[6]
        }

# Define new headers
headers = [
    'S.No',
    'Unvan',
    'Ad Soyad',
    'Dil',
    'İdari Görev',
    'Görev Yeri / Dış Görevlendirme',
    'e-mail',
    'dahili-tel',
    'ofis-hour',
    'AKBİS Profili'
]

# Clear existing sheet
ws.delete_rows(1, ws.max_row + 20)
ws.append(headers)

# Build personnel list
# 1. Management first
# Prof. Dr. Bertan AKYOL
# Öğr. Gör. Rıdvan KORKUT
# Öğr. Gör. Dr. Hasan Ulvi EVREN
# Then other faculty members
personnel_rows = []

# Prof. Dr. Bertan AKYOL
personnel_rows.append({
    'title': 'Prof. Dr.',
    'name': 'Bertan AKYOL',
    'lang': 'İngilizce',
    'role': 'Müdür',
    'duty_place': 'Yabancı Diller Yüksekokulu',
    'email': 'bertan.akyol@adu.edu.tr',
    'phone': None,
    'office_hour': None,
    'akbis': 'https://akbis.adu.edu.tr/personel_detay.asp?sno=A-0565'
})

# Add all from web_staff
added_names = {'BERTAN AKYOL'}

for s in web_staff:
    title = s['title']
    name = s['name']
    norm = normalize(name)
    if norm in added_names:
        continue
    added_names.add(norm)
    
    # Check idari gorev
    role = None
    if 'RIDVAN KORKUT' in norm:
        role = 'Müdür Yardımcısı'
    elif 'HASAN ULVI EVREN' in norm:
        role = 'Müdür Yardımcısı'
    
    # Check outside assignment
    duty_place = match_dis_gorev(name)
    
    # Email
    email = akbis_emails.get(s['sno'])
    
    # Lang
    lang = get_language(name)
    
    # Existing extra data
    ex = existing_data.get(norm, {})
    phone = ex.get('phone')
    office_hour = ex.get('officeHour')
    if not role and ex.get('role'):
        role = ex.get('role')

    personnel_rows.append({
        'title': title,
        'name': name,
        'lang': lang,
        'role': role,
        'duty_place': duty_place,
        'email': email,
        'phone': phone,
        'office_hour': office_hour,
        'akbis': s['url']
    })

# Check if Öğr. Gör. Dr. Barış ÇAVUŞ is added (from page 2)
if 'BARIS CAVUS' not in added_names:
    personnel_rows.append({
        'title': 'Öğr. Gör. Dr.',
        'name': 'Barış ÇAVUŞ',
        'lang': 'İngilizce',
        'role': None,
        'duty_place': 'Eğitim Fakültesi',
        'email': None,
        'phone': None,
        'office_hour': None,
        'akbis': 'https://akbis.adu.edu.tr/'
    })
    added_names.add('BARIS CAVUS')

# Misafir Öğretim Elemanları
if 'PELIN GURLER' not in added_names:
    personnel_rows.append({
        'title': 'Misafir Öğr. Elm.',
        'name': 'Pelin GÜRLER',
        'lang': 'Almanca',
        'role': None,
        'duty_place': 'YDYO (Yabancı Diller Yüksekokulu)',
        'email': None,
        'phone': None,
        'office_hour': None,
        'akbis': None
    })

if 'BEYZASU KUCUKDANACI' not in added_names:
    personnel_rows.append({
        'title': 'Misafir Öğr. Elm.',
        'name': 'Beyzasu KÜÇÜKDANACI',
        'lang': 'Almanca',
        'role': None,
        'duty_place': 'YDYO (Yabancı Diller Yüksekokulu)',
        'email': None,
        'phone': None,
        'office_hour': None,
        'akbis': None
    })

# Sort: Management first (Müdür, Müdür Yrd), then alphabetical by name
def sort_key(p):
    if p['role'] == 'Müdür':
        return (0, p['name'])
    elif p['role'] == 'Müdür Yardımcısı':
        return (1, p['name'])
    elif 'Misafir' in p['title']:
        return (3, p['name'])
    else:
        return (2, p['name'])

personnel_rows.sort(key=sort_key)

# Append rows to worksheet
for idx, p in enumerate(personnel_rows, 1):
    ws.append([
        idx,
        p['title'],
        p['name'],
        p['lang'],
        p['role'],
        p['duty_place'],
        p['email'],
        p['phone'],
        p['office_hour'],
        p['akbis']
    ])

# Styling
header_fill = PatternFill(start_color='1F4E79', end_color='1F4E79', fill_type='solid')
header_font = Font(name='Calibri', size=11, bold=True, color='FFFFFF')
regular_font = Font(name='Calibri', size=10)
bold_font = Font(name='Calibri', size=10, bold=True)
center_align = Alignment(horizontal='center', vertical='center')
left_align = Alignment(horizontal='left', vertical='center')
thin_border = Border(
    left=Side(style='thin', color='E0E0E0'),
    right=Side(style='thin', color='E0E0E0'),
    top=Side(style='thin', color='E0E0E0'),
    bottom=Side(style='thin', color='E0E0E0')
)

external_fill = PatternFill(start_color='FFF2CC', end_color='FFF2CC', fill_type='solid') # soft yellow for external assignment

for col_idx in range(1, ws.max_column + 1):
    cell = ws.cell(row=1, column=col_idx)
    cell.fill = header_fill
    cell.font = header_font
    cell.alignment = center_align

for r in range(2, ws.max_row + 1):
    is_external = "YDYO" not in str(ws.cell(row=r, column=6).value or "") and "Yabancı Diller Yüksekokulu" != str(ws.cell(row=r, column=6).value or "")
    for c in range(1, ws.max_column + 1):
        cell = ws.cell(row=r, column=c)
        cell.font = regular_font
        cell.border = thin_border
        
        # Highlight external assignments subtly
        if is_external and c == 6:
            cell.fill = external_fill
            cell.font = bold_font

        if c in [1, 2, 4, 8]:
            cell.alignment = center_align
        else:
            cell.alignment = left_align

# Auto column widths
for col in ws.columns:
    max_len = max(len(str(cell.value or '')) for cell in col)
    col_letter = get_column_letter(col[0].column)
    ws.column_dimensions[col_letter].width = max(max_len + 4, 12)

wb.save('docs/okul_bilgi.xlsx')
print(f"okul_bilgi.xlsx dosyasındaki Akademik Personel sayfası toplam {len(personnel_rows)} kişiyle başarıyla güncellendi!")
