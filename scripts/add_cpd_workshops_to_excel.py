import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

wb = openpyxl.load_workbook('docs/okul_bilgi.xlsx')

sheet_name = 'CPD Workshop Programı'
if sheet_name in wb.sheetnames:
    ws = wb[sheet_name]
    ws.delete_rows(1, ws.max_row + 20)
else:
    ws = wb.create_sheet(title=sheet_name)

headers = [
    'Öncelik',
    'Tarih ve Saat',
    'Workshop İngilizce Başlığı',
    'Türkçe Konu Başlığı',
    'Eğitim Dili & Format',
    'Odak & Araçlar',
    'Veri Gerekçesi (İhtiyaç Analizi & Gözlem Bulguları)'
]
ws.append(headers)

workshops = [
    [
        '1. ÖNCELİK',
        '11 Aralık 2026 Cuma | 13.30–15.30 (2 x 45 dk)',
        'From Passive Screens to Active Minds: Designing Interactive Language Tasks with AI, H5P, and Canva',
        'Yapay Zekâ ve Etkileşimli Dijital Araçlarla Öğrenci Merkezli Materyal Tasarımı',
        'Türkçe (Uygulamalı / Hands-On)',
        'Yapay Zekâ Araçları, H5P, Canva, Etkileşimli İçerik Platformları',
        "2026–2027 Akademik Personel İhtiyaç Analizi Anketi'nde öğretim elemanlarının en yüksek oranda talep ettiği ilk iki alan olan 'Dijital materyal hazırlama' (%48,4) ve 'Yabancı dil öğretiminde yapay zekâ kullanımı' (%45,2) başlıklarına doğrudan yanıt verir. Öğretim elemanlarının ders içinde doğrudan kullanabilecekleri etkileşimli materyalleri kendi başlarına üretebilmelerini hedefler."
    ],
    [
        '2. ÖNCELİK',
        '26 Şubat 2027 Cuma | 13.30–15.30 (2 x 45 dk)',
        'Smart & Instant Feedback: Comparative Hands-On Practice with Automated Feedback Tools for Writing (Brisk Teaching, Cambridge Write & Improve) and Speaking (ELSA Speech Analyzer, Speakable, Yoodli, ChatGPT/Gemini Voice)',
        'Yapay Zekâ Destekli Otomatik Geri Bildirim Araçları (Yazma ve Konuşma Becerileri)',
        'Türkçe (Uygulamalı / Hands-On)',
        'Yazma: Brisk Teaching, Cambridge Write & Improve | Konuşma: ELSA Speech Analyzer, Speakable, Yoodli, ChatGPT/Gemini Voice',
        "İhtiyaç analizi anketindeki 'Yapay zekâ destekli ders planlama ve otomatik geri bildirim araçları' (%32,3), 'Yazma becerisi öğretim teknikleri' (%32,3) ve 'Konuşma becerisi öğretim teknikleri' (%25,8) taleplerini karşılar. Yazma ve konuşma becerilerinde öğrencilere anında, kişiselleştirilmiş dönüt verirken öğretim elemanlarının geri bildirim iş yükünü hafifleten uygulamalı bir karşılaştırma sunar."
    ],
    [
        '3. ÖNCELİK',
        '26 Mart 2027 Cuma | 13.30–15.30 (2 x 45 dk)',
        'Activating the Quiet Classroom: Task-Based Learning (TBL) and Dynamic Pair/Group Rotations for Reticent Learners',
        'Çekingen Öğrencileri Aktifleştirme ve Dinamik Grup/Eşli Çalışma Kurgusu',
        'Türkçe (Uygulamalı / Hands-On)',
        'Görev Temelli Öğrenme (TBL), Dinamik Grup/Eşli Rotasyon Teknikleri, Rastgele Seçim Araçları',
        "İhtiyaç analizindeki 'Aktif öğrenme teknikleri' (%41,9) ve 'Görev/etkinlik temelli dil öğretimi – TBL' (%35,5) talepleriyle birlikte; Planlı, Habersiz ve Eşli Ders Gözlemi raporlarında öne çıkan pasif/çekingen öğrencileri derse katma, grup/eşli çalışma rotasyonlarını yapılandırma ve metodolojik çeşitliliği artırma bulgularını hedefler."
    ],
    [
        '4. ÖNCELİK',
        '7 Mayıs 2027 Cuma | 13.30–15.30 (2 x 45 dk)',
        'Crystal-Clear Setups & Smart Feedback: Mastering ICQs, CCQs, and Peer Correction Without Killing Fluency',
        'Yönerge Netliği (ICQ/CCQ) ve Süreç Odaklı Hata Düzeltme / Akran Geri Bildirimi',
        'Türkçe (Uygulamalı / Hands-On)',
        'ICQ & CCQ Yapılandırma, Akran Geri Bildirimi (Peer Feedback) Kontrol Listeleri, Gecikmeli Tahta Dönütü',
        "Üç farklı ders gözlem raporunda da (Planlı, Habersiz ve Eşli Ders Gözlemleri) geliştirilmesi gereken pedagojik alanlar olarak öne çıkan yönerge netliği, ICQ/CCQ kullanımı ve öğretmen merkezli anlık müdahale yerine akıcılığı bozmadan akran geri bildirimi / gecikmeli hata düzeltme uygulama ihtiyacını karşılar."
    ]
]

for row in workshops:
    ws.append(row)

# Styling
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

for col_idx in range(1, ws.max_column + 1):
    cell = ws.cell(row=1, column=col_idx)
    cell.fill = header_fill
    cell.font = header_font
    cell.alignment = center_align

for r in range(2, ws.max_row + 1):
    for c in range(1, ws.max_column + 1):
        cell = ws.cell(row=r, column=c)
        cell.font = regular_font
        cell.border = thin_border
        if c == 1:
            cell.alignment = center_align
            cell.font = bold_font
        elif c in [2, 5]:
            cell.alignment = center_align
        else:
            cell.alignment = left_align

ws.column_dimensions['A'].width = 14
ws.column_dimensions['B'].width = 24
ws.column_dimensions['C'].width = 36
ws.column_dimensions['D'].width = 32
ws.column_dimensions['E'].width = 22
ws.column_dimensions['F'].width = 36
ws.column_dimensions['G'].width = 50

wb.save('docs/okul_bilgi.xlsx')
print("okul_bilgi.xlsx dosyasına CPD Workshop Programı başarıyla eklendi!")
