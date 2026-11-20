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
    managerName: 'Öğr. Gör. Rıdvan Korkut',
    managerEmail: 'rkorkut@adu.edu.tr',
    documentCount: 0,
    activityCount: 0
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

export const CPD_DRIVE_DOCUMENTS: DriveDocument[] = [];

export const CPD_ACTIVITIES: ActivityItem[] = [];

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
