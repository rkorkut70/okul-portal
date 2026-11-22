import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import json
import re

with open('scripts/phone_directory.json', 'r', encoding='utf-8') as f:
    phone_data = json.load(f)

# Helper to normalize turkish names
def normalize(text):
    text = text.upper()
    tr_map = {'İ': 'I', 'I': 'I', 'Ş': 'S', 'Ğ': 'G', 'Ü': 'U', 'Ö': 'O', 'Ç': 'C'}
    for k, v in tr_map.items():
        text = text.replace(k, v)
    return ' '.join(re.sub(r'[^A-Z0-9]', ' ', text).split())

# Create phone lookup by normalized name
phone_by_name = {}
email_by_name = {}

for p in phone_data:
    name = p['name']
    if not name:
        continue
    norm = normalize(name)
    # If already exists, combine dahili (e.g. 4602 / 4603 or 4631 / 4649)
    if norm in phone_by_name:
        if p['dahili'] not in phone_by_name[norm]:
            phone_by_name[norm] = f"{phone_by_name[norm]} / {p['dahili']}"
    else:
        phone_by_name[norm] = p['dahili']
    
    if p['email']:
        email_by_name[norm] = p['email']

print("Telefon eşleştirme sözlüğü hazırlandı:", len(phone_by_name))

wb = openpyxl.load_workbook('docs/okul_bilgi.xlsx')

# Styling
header_fill = PatternFill(start_color='1F4E79', end_color='1F4E79', fill_type='solid')
header_font = Font(name='Calibri', size=11, bold=True, color='FFFFFF')
regular_font = Font(name='Calibri', size=10)
bold_font = Font(name='Calibri', size=10, bold=True)
center_align = Alignment(horizontal='center', vertical='center')
left_align = Alignment(horizontal='left', vertical='center')
thin_border = Border(
    left=Side(style='thin', color='D9D9D9'),
    right=Side(style='thin', color='D9D9D9'),
    top=Side(style='thin', color='D9D9D9'),
    bottom=Side(style='thin', color='D9D9D9')
)

# 1. Update Akademik Personel dahili-tel
# Columns: ['S.No', 'Unvan', 'Ad Soyad', 'Dil', 'İdari Görev', 'Görev Yeri / Dış Görevlendirme', 'e-mail', 'dahili-tel', 'ofis-hour', 'AKBİS Profili']
ws_ap = wb['Akademik Personel']
matched_ap = 0
for r in range(2, ws_ap.max_row + 1):
    name_val = str(ws_ap.cell(row=r, column=3).value or '')
    norm_name = normalize(name_val)
    
    # Try exact match or partial match
    found_dahili = None
    for k, v in phone_by_name.items():
        if k in norm_name or norm_name in k:
            found_dahili = v
            break
            
    if found_dahili:
        ws_ap.cell(row=r, column=8, value=found_dahili)
        matched_ap += 1

print(f"Akademik Personel eşleşen dahili telefon: {matched_ap}/{ws_ap.max_row - 1}")

# 2. Update İdari Personel
# Columns: ['S.No', 'Ad Soyad', 'Görev', 'e-mail', 'dahili-tel']
ws_ip = wb['İdari Personel']
matched_ip = 0
for r in range(2, ws_ip.max_row + 1):
    name_val = str(ws_ip.cell(row=r, column=2).value or '')
    norm_name = normalize(name_val)
    
    found_dahili = None
    found_email = None
    for k, v in phone_by_name.items():
        if k in norm_name or norm_name in k:
            found_dahili = v
            found_email = email_by_name.get(k)
            break
            
    if found_dahili:
        ws_ip.cell(row=r, column=5, value=found_dahili)
        matched_ip += 1
    if found_email:
        ws_ip.cell(row=r, column=4, value=found_email)

print(f"İdari Personel eşleşen dahili telefon: {matched_ip}/{ws_ip.max_row - 1}")

# 3. Create or Update 'Telefon Rehberi' sheet
sheet_name = 'Telefon Rehberi'
if sheet_name in wb.sheetnames:
    ws_tr = wb[sheet_name]
    ws_tr.delete_rows(1, ws_tr.max_row + 20)
else:
    ws_tr = wb.create_sheet(title=sheet_name)

tr_headers = ['S.No', 'Adı Soyadı / Birim', 'Görevi / Açıklama', 'Dahili No', 'Harici Telefon', 'Kurumsal E-Posta']
ws_tr.append(tr_headers)

for idx, p in enumerate(phone_data, 1):
    ws_tr.append([
        idx,
        p['name'],
        p['role'],
        p['dahili'],
        p['full_tel'],
        p['email'] or '-'
    ])

# Style 'Telefon Rehberi' sheet
for col_idx in range(1, ws_tr.max_column + 1):
    cell = ws_tr.cell(row=1, column=col_idx)
    cell.fill = header_fill
    cell.font = header_font
    cell.alignment = center_align

for r in range(2, ws_tr.max_row + 1):
    for c in range(1, ws_tr.max_column + 1):
        cell = ws_tr.cell(row=r, column=c)
        cell.font = regular_font
        cell.border = thin_border
        if c in [1, 4]:
            cell.alignment = center_align
            if c == 4:
                cell.font = bold_font
        else:
            cell.alignment = left_align

for col in ws_tr.columns:
    max_len = max(len(str(cell.value or '')) for cell in col)
    col_letter = get_column_letter(col[0].column)
    ws_tr.column_dimensions[col_letter].width = max(max_len + 4, 14)

wb.save('docs/okul_bilgi.xlsx')
print("okul_bilgi.xlsx dosyasındaki dahili telefonlar başarıyla işlendi!")
