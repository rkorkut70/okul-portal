import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import docx

# 1. Read yonetim.docx
doc_y = docx.Document('docs/yönetim.docx')

# Tablo 1: Yüksekokul Kurulu
table_yok = doc_y.tables[1]
yok_rows = []
for row in table_yok.rows[1:]:
    vals = [c.text.strip() for c in row.cells]
    yok_rows.append(vals)

# Tablo 2: Yüksekokul Yönetim Kurulu
table_yk = doc_y.tables[2]
yk_rows = []
for row in table_yk.rows[1:]:
    vals = [c.text.strip() for c in row.cells]
    yk_rows.append(vals)

print(f"Yönetim Kurulu üye sayısı: {len(yk_rows)}")
print(f"Yüksekokul Kurulu üye sayısı: {len(yok_rows)}")

# Load workbook
wb = openpyxl.load_workbook('docs/okul_bilgi.xlsx')

# Styling helpers
header_fill = PatternFill(start_color='1F4E79', end_color='1F4E79', fill_type='solid')
header_font = Font(name='Calibri', size=11, bold=True, color='FFFFFF')
regular_font = Font(name='Calibri', size=10)
bold_font = Font(name='Calibri', size=10, bold=True)
center_align = Alignment(horizontal='center', vertical='center')
left_align = Alignment(horizontal='left', vertical='center', wrap_text=True)
thin_border = Border(
    left=Side(style='thin', color='D9D9D9'),
    right=Side(style='thin', color='D9D9D9'),
    top=Side(style='thin', color='D9D9D9'),
    bottom=Side(style='thin', color='D9D9D9')
)

# 2. Update Yönetim Kurulu sheet
ws_yk = wb['Yönetim Kurulu']
ws_yk.delete_rows(1, ws_yk.max_row + 10)
ws_yk.append(['S.No', 'Unvanı ve Adı Soyadı', 'Kuruldaki Görevi', 'Göreve Başlama Tarihi'])

for idx, r in enumerate(yk_rows, 1):
    ws_yk.append([idx, r[0], r[1], r[2]])

# 3. Update Yüksekokul Kurulu sheet
ws_yok = wb['Yüksekokul Kurulu']
ws_yok.delete_rows(1, ws_yok.max_row + 10)
ws_yok.append(['S.No', 'Unvanı ve Adı Soyadı', 'Kuruldaki Görevi', 'Göreve Başlama Tarihi'])

for idx, r in enumerate(yok_rows, 1):
    ws_yok.append([idx, r[0], r[1], r[2]])

for ws_curr in [ws_yk, ws_yok]:
    for col_idx in range(1, ws_curr.max_column + 1):
        cell = ws_curr.cell(row=1, column=col_idx)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = center_align

    for r in range(2, ws_curr.max_row + 1):
        for c in range(1, ws_curr.max_column + 1):
            cell = ws_curr.cell(row=r, column=c)
            cell.font = regular_font
            cell.border = thin_border
            if c in [1, 3, 4]:
                cell.alignment = center_align
            else:
                cell.alignment = left_align

    for col in ws_curr.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws_curr.column_dimensions[col_letter].width = max(max_len + 4, 14)

# 4. Birim Görev Tanımları Sheet
unit_duties = [
    {
        "code": "Testing",
        "name": "SINAV BİRİMİ",
        "head": "Öğr. Gör. Göksel TURAN",
        "mission": "Öğrencilerin lisans eğitimine başlamak için gerekli yabancı dil yeterliliklerini ölçmek ve ileri seviye bilişsel yeteneklerini değerlendiren ölçme araçları oluşturmak.",
        "vision": "Dil ölçme ve değerlendirme alanında ulusal ve uluslararası standartlarda yenilikçi, güvenilir ve adil uygulamalarla öncü bir merkez olmak.",
        "summary": "1. Hazırlık YDYS, Yaz Okulu Sonu YDYS, Erasmus YDYS, Lisansüstü YDYS, Quiz, Ara Sınav, Final ve Mazeret sınavlarını hazırlamak, organize etmek ve değerlendirme ölçütlerini yönetmek.\n2. Soru tipleri taslakları, değerlendirme rubrikleri ve bilgilendirme metinlerini yayımlamak.\n3. Sınav takvimini Program ve Materyal birimleriyle koordineli belirlemek; gözetmenlik ve değerlendirme görevlendirmelerini yürütmek.\n4. Sınav evraklarının baskı/çoğaltma güvenliğini sağlamak, sınav itiraz dilekçelerini inceleyip karara bağlamak.",
        "note": "Tam ve detaylı bilgi YDYO Kalite El Kitabı Bölüm 7'de yer almaktadır."
    },
    {
        "code": "Materyal",
        "name": "MATERYAL SEÇME ve GELİŞTİRME BİRİMİ",
        "head": "Öğr. Gör. Dilek ATEŞ",
        "mission": "Eğitim programındaki amaçlara, içeriğe ve öğrenci seviyelerine uygun ders kaynaklarının, materyallerinin seçilmesini, düzenlenmesini ve erişilebilir olmasını sağlamak.",
        "vision": "Öğrenci ve öğretim elemanlarının ihtiyaçlarına en uygun ders kitaplarını/ek materyalleri seçmek, özgün çalışma kâğıtları geliştirmek ve dönem boyunca materyalleri güncel tutmak.",
        "summary": "1. Her akademik yıl müfredatı için ders kitaplarının analiz ve seçim sürecini koordine etmek.\n2. Dört beceriye dayalı özgün çalışma kâğıtları, ses dosyaları ve ELT ek paketleri derlemek ve geliştirmek.\n3. Ders materyallerini, çalışma kâğıtlarını ve cevap anahtarlarını kurumsal Drive (O-Drive) üzerinde erişilebilir kılmak.\n4. Materyal verimliliği anketleri düzenleyerek geri bildirim toplamak ve materyal havuzunu güncellemek.",
        "note": "Tam ve detaylı bilgi YDYO Kalite El Kitabı Bölüm 7'de yer almaktadır."
    },
    {
        "code": "Program",
        "name": "PROGRAM GELİŞTİRME BİRİMİ",
        "head": "Öğr. Gör. Hayri ARGUNAT",
        "mission": "CEFR ve uluslararası standartlara dayalı, öğrencilerin dil ihtiyaçlarına uygun yüksek kaliteli eğitim programlarını yenilikçi yöntemlerle tasarlamak ve geliştirmek.",
        "vision": "Öğrencilerin yabancı dil engelini ortadan kaldıran, seviyelere göre en kusursuz ve dengeli müfredatı hazırlamak.",
        "summary": "1. Hazırlık sınıflarının seviyelere göre ana ders ve yazma (Main Course & Writing) ders izlencelerini (syllabus) ve haftalık konu dağılımını (pacing) hazırlamak.\n2. Sınav ve Materyal birimleriyle koordineli çalışarak sınav haftalarında ders yoğunluğunu dengelemek; Writing Portfolio konularını ve takvimini belirlemek.\n3. Müfredatın planlandığı gibi takip edilmesini sağlamak için sınıf dosyalarını kontrol etmek ve şube danışmanlarıyla iletişimde olmak.\n4. Müfredattaki iyileştirme alanlarını belirlemek için geri bildirim toplamak ve revizyonları uygulamak.",
        "note": "Tam ve detaylı bilgi YDYO Kalite El Kitabı Bölüm 7'de yer almaktadır."
    },
    {
        "code": "CPD",
        "name": "SÜREKLİ MESLEKİ GELİŞİM BİRİMİ",
        "head": "Öğr. Gör. Pınar UĞUR",
        "mission": "İhtiyaç analizleri, kurum öncelikleri, sınıf içi öz ve akran gözlemlerine dayalı olarak kolektif ve bireysel mesleki gelişim faaliyetlerini teşvik etmek ve organize etmek.",
        "vision": "CEFR ilkelerine dayalı, YDYO'lar arasında en kapsayıcı, destekleyici ve iş birliğine dayalı hizmet içi eğitim ve gelişim süreçlerini sunmak.",
        "summary": "1. Öğrenciler ve öğretim elemanları için Oryantasyon Programlarını hazırlamak ve koordine etmek (TR/EN).\n2. Öğrenci El Kitabı ve Öğretim Elemanı El Kitabı'nı hazırlamak ve güncel tutmak (TR/EN).\n3. Hizmet içi gelişim ihtiyaç analizi anketlerini uygulamak; çalıştaylar, seminerler ve atölyeler organize etmek.\n4. Öz değerlendirme, akran sınıf gözlemi (peer observation) ve idari gözlem faaliyetlerini planlamak ve yürütmek.\n5. Ulusal/uluslararası TESOL konferans, çalıştay ve gelişim kaynaklarını duyurmak ve kayıtlarını arşivlemek.",
        "note": "Tam ve detaylı bilgi YDYO Kalite El Kitabı Bölüm 7'de yer almaktadır."
    },
    {
        "code": "KAB",
        "name": "KALİTE VE AKREDİTASYON BİRİMİ",
        "head": "Öğr. Gör. Bilge Sevim SOYKUT",
        "mission": "YDYO'nun etkili bir dil öğretim ve öğrenim ortamına yönelik yüksek kalite standartlarına ulaşmasını ve bu standartları sürdürmesini desteklemek.",
        "vision": "Dil öğretiminde mükemmeliyet merkezi olarak tanınmak; yenilikçi, sürdürülebilir ve uluslararası standartlarda akredite bir dil eğitimi anlayışını yerleştirmek.",
        "summary": "1. YDYO bünyesindeki tüm akademik ve idari birimler için kalite güvence çerçeveleri ve iş akışları oluşturmak.\n2. Yüksekokulun ulusal ve uluslararası akreditasyon alma süreçlerini koordine etmek ve rehberlik sağlamak.\n3. Ders gözlemleri, veri analizi, kayıt tutma ve kurumsal iç değerlendirme raporlama prosedürlerini koordine etmek.\n4. YÖKAK usul ve esaslarına uygun olarak yıllık iç değerlendirme raporunu hazırlayıp Yüksekokul Kurulu'na sunmak ve kamuoyuyla paylaşmak.\n5. Değerlendirme sonuçlarına göre gerekli iyileştirme ve revizyonların ilgili birimlerce uygulanmasını takip etmek.",
        "note": "Tam ve detaylı bilgi YDYO Kalite El Kitabı Bölüm 7'de yer almaktadır."
    }
]

# Create or replace 'Birim Görev Tanımları' sheet
sheet_name = 'Birim Görev Tanımları'
if sheet_name in wb.sheetnames:
    ws_duties = wb[sheet_name]
    ws_duties.delete_rows(1, ws_duties.max_row + 10)
else:
    ws_duties = wb.create_sheet(title=sheet_name)

duty_headers = ['Birim Kodu', 'Akademik Birim', 'Birim Sorumlusu', 'Misyon', 'Vizyon', 'Özet Görev ve Sorumluluklar', 'Kaynak Belge / Bilgi Notu']
ws_duties.append(duty_headers)

for item in unit_duties:
    ws_duties.append([
        item['code'],
        item['name'],
        item['head'],
        item['mission'],
        item['vision'],
        item['summary'],
        item['note']
    ])

# Style 'Birim Görev Tanımları'
for col_idx in range(1, ws_duties.max_column + 1):
    cell = ws_duties.cell(row=1, column=col_idx)
    cell.fill = header_fill
    cell.font = header_font
    cell.alignment = center_align

for r in range(2, ws_duties.max_row + 1):
    for c in range(1, ws_duties.max_column + 1):
        cell = ws_duties.cell(row=r, column=c)
        cell.font = regular_font
        cell.border = thin_border
        if c == 1:
            cell.alignment = center_align
            cell.font = bold_font
        elif c in [2, 3]:
            cell.alignment = left_align
            cell.font = bold_font
        else:
            cell.alignment = left_align

ws_duties.column_dimensions['A'].width = 14
ws_duties.column_dimensions['B'].width = 32
ws_duties.column_dimensions['C'].width = 28
ws_duties.column_dimensions['D'].width = 38
ws_duties.column_dimensions['E'].width = 38
ws_duties.column_dimensions['F'].width = 65
ws_duties.column_dimensions['G'].width = 40

wb.save('docs/okul_bilgi.xlsx')
print("docs/okul_bilgi.xlsx başarıyla güncellendi!")
