import type { AcademicUnit, DriveDocument, ActivityItem, TemplateDocument, CalendarEvent } from '../types';

export const ACADEMIC_UNITS: AcademicUnit[] = [
  {
    id: 'cpd',
    name: 'Sürekli Mesleki Gelişim Birimi (CPD)',
    shortName: 'CPD Birimi',
    code: 'CPD-01',
    description: 'Öğretim elemanlarımızın mesleki, pedagojik ve dijital yetkinliklerini sürekli geliştirmeye yönelik eğitim ve akreditasyon merkezi.',
    icon: 'GraduationCap',
    status: 'active',
    managerName: 'Doç. Dr. Ahmet Yılmaz',
    managerEmail: 'ahmet.yilmaz@adu.edu.tr',
    documentCount: 24,
    activityCount: 16
  },
  {
    id: 'fpe',
    name: 'Eğitici Eğitimi ve Pedagojik Gelişim Birimi',
    shortName: 'Pedagojik Gelişim',
    code: 'FPE-02',
    description: 'Yeni atanan ve kıdemli öğretim elemanlarına yönelik modern öğrenme-öğretme teknikleri koordinasyonu.',
    icon: 'BookOpenCheck',
    status: 'planning',
    documentCount: 0,
    activityCount: 0
  },
  {
    id: 'mea',
    name: 'Ölçme, Değerlendirme ve Program Akreditasyonu',
    shortName: 'Akreditasyon & Ölçme',
    code: 'MEA-03',
    description: 'Bologna süreci, program çıktıları ve ulusal/uluslararası akreditasyon kalite süreçleri yönetimi.',
    icon: 'Award',
    status: 'planning',
    documentCount: 0,
    activityCount: 0
  },
  {
    id: 'iro',
    name: 'Uluslararasılaşma ve Değişim Programları Birimi',
    shortName: 'Uluslararası İlişkiler',
    code: 'IRO-04',
    description: 'Erasmus+, Mevlana ve uluslararası akademik işbirlikleri koordinasyonu.',
    icon: 'Globe',
    status: 'planning',
    documentCount: 0,
    activityCount: 0
  },
  {
    id: 'bap',
    name: 'Bilimsel Araştırma ve Proje Koordinasyon Birimi',
    shortName: 'Proje & Araştırma',
    code: 'BAP-05',
    description: 'TÜBİTAK, BAP, AB Horizon ve sanayi işbirliği projelerinin idari ve teknik desteği.',
    icon: 'Microscope',
    status: 'planning',
    documentCount: 0,
    activityCount: 0
  }
];

export const CPD_DRIVE_DOCUMENTS: DriveDocument[] = [
  // 01_Etkinlikler_ve_Egitimler
  {
    id: 'doc-1',
    title: '2025-Güz Öğretim Teknolojileri Atölyesi Sunumları.pdf',
    folderId: 'fld-1',
    folderName: '01_Etkinlikler_ve_Egitimler / 2025-2026',
    unitId: 'cpd',
    fileType: 'pdf',
    size: '14.2 MB',
    updatedAt: '12 Ekim 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_cpd_etkinlik_2025',
    description: 'Eğitimde yapay zeka araçları ve hibrit ders tasarım atölyesi sunum slaytları.',
    tags: ['Eğitim', 'Yapay Zeka', 'Sunum'],
    isPinned: true
  },
  {
    id: 'doc-2',
    title: 'Ölçme-Değerlendirmede Rubrik Kullanımı Rehberi.pdf',
    folderId: 'fld-1',
    folderName: '01_Etkinlikler_ve_Egitimler / 2025-2026',
    unitId: 'cpd',
    fileType: 'pdf',
    size: '4.8 MB',
    updatedAt: '28 Eylül 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_cpd_rubrik',
    description: 'Ders içi performans ve proje değerlendirmelerinde analitik rubrik hazırlama kılavuzu.',
    tags: ['Rubrik', 'Ölçme', 'Rehber']
  },
  {
    id: 'doc-3',
    title: 'Eğitici Eğitimi Programı Katılımcı Listesi ve Yoklama Tutanakları.xlsx',
    folderId: 'fld-1',
    folderName: '01_Etkinlikler_ve_Egitimler / 2025-2026',
    unitId: 'cpd',
    fileType: 'xls',
    size: '420 KB',
    updatedAt: '15 Ekim 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_cpd_katilimci',
    description: 'Güz dönemi 40 saatlik pedagojik gelişim sertifika programına katılan hocalarımızın listesi.',
    tags: ['Yoklama', 'Sertifika', 'Rapor']
  },
  // 02_Raporlar_ve_Faaliyet_Ozetleri
  {
    id: 'doc-4',
    title: '2024-2025 CPD Yıllık Faaliyet ve Özdeğerlendirme Raporu.pdf',
    folderId: 'fld-2',
    folderName: '02_Raporlar_ve_Faaliyet_Ozetleri',
    unitId: 'cpd',
    fileType: 'pdf',
    size: '8.6 MB',
    updatedAt: '10 Temmuz 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_cpd_rapor_2025',
    description: 'YÖKAK ve Rektörlük kurumsal akreditasyon kriterlerine uygun yıllık CPD raporu.',
    tags: ['YÖKAK', 'Akreditasyon', 'Yıllık Rapor'],
    isPinned: true
  },
  {
    id: 'doc-5',
    title: 'Öğretim Elemanları Mesleki Gelişim İhtiyaç Analizi Anketi Sonuçları.pdf',
    folderId: 'fld-2',
    folderName: '02_Raporlar_ve_Faaliyet_Ozetleri',
    unitId: 'cpd',
    fileType: 'pdf',
    size: '3.1 MB',
    updatedAt: '20 Ağustos 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_cpd_anket',
    description: 'Üniversitemiz genelinde 420 öğretim üyesinin katıldığı anket analizi ve öncelikli eğitim başlıkları.',
    tags: ['Anket', 'İhtiyaç Analizi', 'İstatistik']
  },
  // 03_Komisyon_ve_Kararlar
  {
    id: 'doc-6',
    title: 'ADÜ Sürekli Mesleki Gelişim Birimi Çalışma Usul ve Esasları Yönergesi.pdf',
    folderId: 'fld-3',
    folderName: '03_Komisyon_ve_Kararlar',
    unitId: 'cpd',
    fileType: 'pdf',
    size: '1.2 MB',
    updatedAt: '14 Ocak 2024',
    driveUrl: 'https://drive.google.com/drive/folders/example_cpd_yonerge',
    description: 'Senato tarafından onaylanmış resmi CPD birim kuruluş ve işleyiş yönergesi.',
    tags: ['Yönerge', 'Senato', 'Resmi']
  },
  {
    id: 'doc-7',
    title: '2025 Yılı CPD Yürütme Kurulu Toplantı Kararları ve Tutanakları.pdf',
    folderId: 'fld-3',
    folderName: '03_Komisyon_ve_Kararlar',
    unitId: 'cpd',
    fileType: 'pdf',
    size: '2.5 MB',
    updatedAt: '05 Eylül 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_cpd_kararlar',
    description: '2025-2026 eğitim-öğretim yılı planlama toplantısı kararları.',
    tags: ['Tutanak', 'Kurul', 'Karar']
  },
  // 04_Materyaller_ve_Rehberler
  {
    id: 'doc-8',
    title: 'Ders İzlencesi (Syllabus) Hazırlama ve Çıktı Eşleştirme Kılavuzu.docx',
    folderId: 'fld-4',
    folderName: '04_Materyaller_ve_Rehberler',
    unitId: 'cpd',
    fileType: 'doc',
    size: '950 KB',
    updatedAt: '01 Eylül 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_cpd_syllabus_guide',
    description: 'Bologna uyumlu ders izlencesi oluştururken dikkat edilecek ilkeler ve şablon örnekleri.',
    tags: ['Kılavuz', 'Syllabus', 'Bologna']
  },
  {
    id: 'doc-9',
    title: 'Etkileşimli Ders Sunum Şablonu (16-9 Format).ppt',
    folderId: 'fld-4',
    folderName: '04_Materyaller_ve_Rehberler',
    unitId: 'cpd',
    fileType: 'ppt',
    size: '18.4 MB',
    updatedAt: '18 Eylül 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_cpd_ppt_template',
    description: 'ADÜ kurumsal renklerine uygun, görsel destekli PowerPoint ders sunum şablonu.',
    tags: ['Şablon', 'Sunum', 'Tasarım']
  }
];

export const CPD_ACTIVITIES: ActivityItem[] = [
  // Yaklaşanlar (Upcoming)
  {
    id: 'act-1',
    unitId: 'cpd',
    title: 'Yükseköğretimde Üretken Yapay Zeka ile Ders Tasarımı Çalıştayı',
    date: '28 Kasım 2025, 14:00 - 17:00',
    category: 'Eğitim & Atölye',
    summary: 'ChatGPT, Gemini ve Claude araçlarının ders müfredatı, sınav soruları ve ödev değerlendirmede etik ve etkin kullanımı üzerine uygulamalı atölye çalışması.',
    targetAudience: 'Tüm Akademik Personel',
    participantCount: 85,
    status: 'upcoming',
    driveDocUrl: 'https://drive.google.com/drive/folders/example_ai_workshop',
    driveDocTitle: 'Çalıştay İzleği ve Ön Hazırlık Rehberi.pdf',
    organizer: 'CPD Birimi & Bilgi İşlem Daire Başkanlığı',
    location: 'Merkez Kütüphane Konferans Salonu / Hibrit'
  },
  {
    id: 'act-2',
    unitId: 'cpd',
    title: 'Ölçme ve Değerlendirmede Çoktan Seçmeli Madde Yazım Eğitimi',
    date: '12 Aralık 2025, 10:00 - 12:30',
    category: 'Eğitim & Atölye',
    summary: 'Üst düzey bilişsel basamakları (analiz, sentez, değerlendirme) ölçen geçerli ve güvenilir soru yazma teknikleri.',
    targetAudience: 'Öğretim Üyeleri ve Görevlileri',
    status: 'upcoming',
    organizer: 'CPD Birimi & Eğitim Fakültesi',
    location: 'Rektörlük A Salonu'
  },
  // Tamamlananlar (Completed)
  {
    id: 'act-3',
    unitId: 'cpd',
    title: '2025-2026 Güz Dönemi Yeni Atanan Araştırma Görevlileri Oryantasyonu',
    date: '15-17 Ekim 2025',
    category: 'Eğitim & Atölye',
    summary: 'Üniversitemize yeni katılan 64 araştırma görevlisine yönelik 3 günlük mevzuat, akademik etik, uzaktan eğitim sistemleri ve pedagojik temel ilkeler programı başarıyla tamamlandı.',
    targetAudience: 'Yeni Atanan Araştırma Görevlileri',
    participantCount: 64,
    status: 'completed',
    driveDocUrl: 'https://drive.google.com/drive/folders/example_oryantasyon_arsivi',
    driveDocTitle: 'Oryantasyon Program Raporu ve Fotoğraf Albümü.pdf',
    organizer: 'CPD Koordinatörlüğü',
    location: 'Atatürk Kongre Merkezi'
  },
  {
    id: 'act-4',
    unitId: 'cpd',
    title: 'Akreditasyon Sürecinde Program Öğrenme Çıktıları ve Ölçme Çalıştayı',
    date: '02 Ekim 2025',
    category: 'Akreditasyon',
    summary: 'MÜDEK ve FEDEK akreditasyonuna hazırlanan bölümler için ders kazanımlarının program çıktılarıyla eşleştirilmesi ve dolaylı ölçüm matrislerinin güncellenmesi sağlandı.',
    targetAudience: 'Bölüm Başkanları ve Akreditasyon Komisyonları',
    participantCount: 52,
    status: 'completed',
    driveDocUrl: 'https://drive.google.com/drive/folders/example_akreditasyon_rapor',
    driveDocTitle: 'Akreditasyon Çıktı Eşleştirme Tutanakları.pdf',
    organizer: 'CPD & Kalite Koordinatörlüğü',
    location: 'Senato Toplantı Salonu'
  },
  {
    id: 'act-5',
    unitId: 'cpd',
    title: 'TÜBİTAK 1001 Proje Yazma ve İtiraz Süreçleri Semineri',
    date: '18 Eylül 2025',
    category: 'Seminer & Konferans',
    summary: 'TÜBİTAK panelist deneyimine sahip kıdemli öğretim üyeleri panel raporlarının analizi, bütçeleme ve yöntem kısmının yazımına dair kritik ipuçlarını paylaştı.',
    targetAudience: 'Tüm Öğretim Elemanları',
    participantCount: 110,
    status: 'completed',
    driveDocUrl: 'https://drive.google.com/drive/folders/example_tubitak_seminer',
    driveDocTitle: 'TÜBİTAK 1001 Başarı İpuçları Sunumu.pdf',
    organizer: 'CPD & BAP Koordinatörlüğü',
    location: 'Online (Zoom)'
  },
  {
    id: 'act-6',
    unitId: 'cpd',
    title: '2024-2025 Yıllık Eğitici Eğitimi Sertifika Dağıtım Töreni',
    date: '15 Haziran 2025',
    category: 'Toplantı & Karar',
    summary: 'Yıl boyunca CPD modüllerini başarıyla tamamlayan 128 öğretim üyemize sertifikaları Rektörlük katılımıyla takdim edildi.',
    targetAudience: 'Sertifika Alan Öğretim Elemanları',
    participantCount: 128,
    status: 'completed',
    organizer: 'CPD Koordinatörlüğü',
    location: 'Rektörlük Protokol Salonu'
  }
];

export const TEMPLATE_DOCUMENTS: TemplateDocument[] = [
  {
    id: 'tpl-1',
    title: 'Akademik Görevlendirme ve Kongre İzin Talep Dilekçesi',
    category: 'Dilekçe & İzin',
    format: 'DOCX',
    size: '64 KB',
    updatedAt: '01 Eylül 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_forms',
    description: 'Yurtiçi/yurtdışı bilimsel etkinlik katılımı ve yolluk/yevmiye talepleri için güncel resmi dilekçe.'
  },
  {
    id: 'tpl-2',
    title: 'Mazeret ve Telafi Sınavı Onay Formu',
    category: 'Ders & Sınav',
    format: 'DOCX',
    size: '48 KB',
    updatedAt: '10 Eylül 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_forms',
    description: 'Mazereti kabul edilen öğrenciler için ders sorumlusu onaylı sınav tarih bildirim tutanağı.'
  },
  {
    id: 'tpl-3',
    title: 'ADÜ Resmi Antetli Yazışma ve Rapor Şablonu (Yeni Logo)',
    category: 'Kurumsal Kimlik',
    format: 'DOCX',
    size: '120 KB',
    updatedAt: '15 Ocak 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_forms',
    description: 'Senato kararıyla yenilenen kurumsal logo ve yazı font standartlarına uygun resmi yazı şablonu.'
  },
  {
    id: 'tpl-4',
    title: 'Bologna Uyumlu Ders İzlencesi (Syllabus) Şablonu',
    category: 'Ders & Sınav',
    format: 'DOCX',
    size: '85 KB',
    updatedAt: '05 Eylül 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_forms',
    description: 'AKTS iş yükü hesabı, haftalık konu dağılımı ve ölçme kriterleri tablosunu içeren ders kılavuzu.'
  },
  {
    id: 'tpl-5',
    title: 'Sınav Not İtiraz İnceleme ve Maddi Hata Tutanağı',
    category: 'Ders & Sınav',
    format: 'DOCX',
    size: '52 KB',
    updatedAt: '20 Ekim 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_forms',
    description: 'Öğrenci itirazlarında bölüm komisyonunca doldurulan 3 kişilik inceleme komisyon tutanağı.'
  },
  {
    id: 'tpl-6',
    title: 'Bölüm Akademik Kurul Toplantı Karar Tutanağı Şablonu',
    category: 'Komisyon & Tutanak',
    format: 'DOCX',
    size: '56 KB',
    updatedAt: '12 Ağustos 2025',
    driveUrl: 'https://drive.google.com/drive/folders/example_forms',
    description: 'Bölüm ve anabilim dalı kurul kararlarının yazılması için resmi şablon.'
  }
];

export const ACADEMIC_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal-1',
    title: 'Güz Dönemi Ders Kayıtları ve Danışman Onayları',
    startDate: '15 Eylül 2025',
    endDate: '19 Eylül 2025',
    category: 'Kayıt & Harç',
    term: '2025-2026 Güz',
    isImportant: true
  },
  {
    id: 'cal-2',
    title: 'Güz Dönemi Derslerinin Başlaması',
    startDate: '22 Eylül 2025',
    category: 'Ders Dönemi',
    term: '2025-2026 Güz',
    isImportant: true
  },
  {
    id: 'cal-3',
    title: 'Ekle-Bırak ve Mazeretli Ders Kayıtları',
    startDate: '29 Eylül 2025',
    endDate: '03 Ekim 2025',
    category: 'Kayıt & Harç',
    term: '2025-2026 Güz'
  },
  {
    id: 'cal-4',
    title: 'Cumhuriyet Bayramı (Resmi Tatil)',
    startDate: '29 Ekim 2025',
    category: 'Resmi Tatil',
    term: '2025-2026 Güz'
  },
  {
    id: 'cal-5',
    title: 'Güz Dönemi Ara Sınavları (Vizeler)',
    startDate: '10 Kasım 2025',
    endDate: '21 Kasım 2025',
    category: 'Sınavlar',
    term: '2025-2026 Güz',
    isImportant: true
  },
  {
    id: 'cal-6',
    title: 'Ara Sınav Notlarının OBS Sistemine Son Giriş Tarihi',
    startDate: '01 Aralık 2025',
    category: 'Sınavlar',
    term: '2025-2026 Güz',
    isImportant: true
  },
  {
    id: 'cal-7',
    title: 'Güz Dönemi Derslerinin Sona Ermesi',
    startDate: '02 Ocak 2026',
    category: 'Ders Dönemi',
    term: '2025-2026 Güz'
  },
  {
    id: 'cal-8',
    title: 'Yarıyıl Sonu Genel Sınavları (Finaller)',
    startDate: '05 Ocak 2026',
    endDate: '16 Ocak 2026',
    category: 'Sınavlar',
    term: '2025-2026 Güz',
    isImportant: true
  },
  {
    id: 'cal-9',
    title: 'Bütünleme Sınavları',
    startDate: '26 Ocak 2026',
    endDate: '31 Ocak 2026',
    category: 'Sınavlar',
    term: '2025-2026 Güz',
    isImportant: true
  },
  {
    id: 'cal-10',
    title: 'Bahar Dönemi Ders Kayıtları',
    startDate: '09 Şubat 2026',
    endDate: '13 Şubat 2026',
    category: 'Kayıt & Harç',
    term: '2025-2026 Bahar',
    isImportant: true
  },
  {
    id: 'cal-11',
    title: 'Bahar Dönemi Derslerinin Başlaması',
    startDate: '16 Şubat 2026',
    category: 'Ders Dönemi',
    term: '2025-2026 Bahar'
  }
];

export const GRADE_SCALE_STANDARD = [
  { letter: 'AA', gpa: 4.00, minScore: 90, status: 'Mükemmel (Geçti)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { letter: 'BA', gpa: 3.50, minScore: 85, status: 'Çok İyi (Geçti)', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { letter: 'BB', gpa: 3.00, minScore: 80, status: 'İyi (Geçti)', color: 'text-blue-700 bg-blue-50 border-blue-200' },
  { letter: 'CB', gpa: 2.50, minScore: 75, status: 'Orta-İyi (Geçti)', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { letter: 'CC', gpa: 2.00, minScore: 65, status: 'Orta (Geçti)', color: 'text-cyan-700 bg-cyan-50 border-cyan-200' },
  { letter: 'DC', gpa: 1.50, minScore: 58, status: 'Şartlı Başarılı', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  { letter: 'DD', gpa: 1.00, minScore: 50, status: 'Şartlı Başarılı', color: 'text-orange-700 bg-orange-50 border-orange-200' },
  { letter: 'FD', gpa: 0.50, minScore: 40, status: 'Başarısız (Kaldı)', color: 'text-rose-700 bg-rose-50 border-rose-200' },
  { letter: 'FF', gpa: 0.00, minScore: 0, status: 'Başarısız (Kaldı)', color: 'text-red-700 bg-red-50 border-red-200' },
];
