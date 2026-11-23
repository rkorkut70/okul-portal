import type { AcademicUnit, DriveDocument, ActivityItem, TemplateDocument, CalendarEvent } from '../types';

export const ACADEMIC_UNITS: AcademicUnit[] = [
  {
    id: 'cpd',
    name: 'Sürekli Mesleki Gelişim Birimi (CPD)',
    shortName: 'CPD Birimi',
    code: 'CPD',
    description: 'Hizmet içi mesleki gelişim çalıştayları, oryantasyon programları, akran sınıf gözlemleri ve eğitim sertifikasyonları.',
    icon: 'GraduationCap',
    status: 'active',
    managerName: 'Öğr. Gör. Pınar UĞUR',
    managerEmail: 'pinar.ugur@adu.edu.tr',
    documentCount: 1,
    activityCount: 4
  },
  {
    id: 'testing',
    name: 'Sınav Birimi (Testing)',
    shortName: 'Sınav Birimi',
    code: 'Testing',
    description: 'YDYS yeterlik, ara sınav, mazeret ve muafiyet sınavlarının hazırlanması, sınav takvimi ve ölçme-değerlendirme yönetimi.',
    icon: 'ShieldCheck',
    status: 'planning',
    managerName: 'Öğr. Gör. Göksel TURAN',
    managerEmail: 'goksel.turan@adu.edu.tr',
    documentCount: 0,
    activityCount: 0
  },
  {
    id: 'material',
    name: 'Materyal Seçme ve Geliştirme Birimi',
    shortName: 'Materyal Birimi',
    code: 'Materyal',
    description: 'Ders kitaplarının analizi ve seçimi, 4 dil becerisine dayalı özgün çalışma kâğıtları ve kurumsal Drive ders arşivi.',
    icon: 'BookOpen',
    status: 'planning',
    managerName: 'Öğr. Gör. Dilek ATEŞ',
    managerEmail: 'dilekcelik@adu.edu.tr',
    documentCount: 0,
    activityCount: 0
  },
  {
    id: 'program',
    name: 'Program Geliştirme Birimi',
    shortName: 'Program Birimi',
    code: 'Program',
    description: 'CEFR standartlarına dayalı seviye müfredatları, ana ders ve yazma izlenceleri (syllabus) ve haftalık konu dağılımı.',
    icon: 'Layers',
    status: 'planning',
    managerName: 'Öğr. Gör. Hayri ARGUNAT',
    managerEmail: 'hayriargunat@adu.edu.tr',
    documentCount: 0,
    activityCount: 0
  },
  {
    id: 'kab',
    name: 'Kalite ve Akreditasyon Birimi (KAB)',
    shortName: 'Kalite & Akreditasyon',
    code: 'KAB',
    description: 'Kalite güvence çerçeveleri, kurumsal iç değerlendirme raporları ve ulusal/uluslararası akreditasyon süreçleri.',
    icon: 'Award',
    status: 'planning',
    managerName: 'Öğr. Gör. Bilge Sevim SOYKUT',
    managerEmail: 'bilge.soykut@adu.edu.tr',
    documentCount: 0,
    activityCount: 0
  }
];

export const CPD_DRIVE_DOCUMENTS: DriveDocument[] = [
  {
    id: 'doc-cpd-ws-plan',
    title: '2026–2027 Akademik Yılı Hizmet İçi Eğitim ve Workshop Programı',
    folderId: 'f-cpd-plans',
    folderName: 'Yıllık Çalışma Planları',
    unitId: 'cpd',
    fileType: 'pdf',
    size: '185 KB',
    updatedAt: 'Kasım 2026',
    driveUrl: 'docs/2026-27 Akademik Yılı Workshop Programı.pdf',
    tags: ['Workshop', 'Hizmet İçi Eğitim', 'İhtiyaç Analizi', '2026-2027', 'Uygulamalı Atölye'],
    isPinned: true
  }
];

export const CPD_ACTIVITIES: ActivityItem[] = [
  {
    id: 'cpd-ws-1',
    unitId: 'cpd',
    title: 'From Passive Screens to Active Minds: Designing Interactive Language Tasks with AI, H5P, and Canva',
    date: '11 Aralık 2026, Cuma (13:30 - 15:30)',
    category: 'Eğitim & Atölye',
    summary: 'Yapay zekâ ve etkileşimli dijital araçlarla (AI, H5P, Canva) öğrenci merkezli materyal tasarımı. 2026–2027 İhtiyaç Analizi Anketi verilerine (%48,4 dijital materyal, %45,2 yapay zekâ) dayalı 1. öncelikli uygulamalı atölye.',
    targetAudience: 'Tüm Yabancı Dil Öğretim Elemanları (İngilizce, Almanca, Fransızca)',
    status: 'upcoming',
    organizer: 'Sürekli Mesleki Gelişim Birimi (CPD) & Yayınevi İş Birliği',
    location: 'YDYO Seminer / Toplantı Salonu (Uygulamalı 2 Seans • 2x45 dk)',
    driveDocTitle: '2026-27 Akademik Yılı Workshop Programı.pdf',
    driveDocUrl: 'docs/2026-27 Akademik Yılı Workshop Programı.pdf'
  },
  {
    id: 'cpd-ws-2',
    unitId: 'cpd',
    title: 'Smart & Instant Feedback: Automated Feedback Tools for Writing & Speaking',
    date: '26 Şubat 2027, Cuma (13:30 - 15:30)',
    category: 'Eğitim & Atölye',
    summary: 'Yapay zekâ destekli otomatik geri bildirim araçları ile yazma (Brisk Teaching, Cambridge Write & Improve) ve konuşma (ELSA Speech Analyzer, Speakable, Yoodli, ChatGPT/Gemini Voice) becerilerinde anında kişiselleştirilmiş dönüt uygulamaları.',
    targetAudience: 'Tüm Yabancı Dil Öğretim Elemanları (İngilizce, Almanca, Fransızca)',
    status: 'upcoming',
    organizer: 'Sürekli Mesleki Gelişim Birimi (CPD) & Yayınevi İş Birliği',
    location: 'YDYO Seminer / Toplantı Salonu (Uygulamalı 2 Seans • 2x45 dk)',
    driveDocTitle: '2026-27 Akademik Yılı Workshop Programı.pdf',
    driveDocUrl: 'docs/2026-27 Akademik Yılı Workshop Programı.pdf'
  },
  {
    id: 'cpd-ws-3',
    unitId: 'cpd',
    title: 'Activating the Quiet Classroom: Task-Based Learning (TBL) & Dynamic Pair/Group Rotations',
    date: '26 Mart 2027, Cuma (13:30 - 15:30)',
    category: 'Eğitim & Atölye',
    summary: 'Çekingen öğrencileri aktifleştirme, görev temelli öğrenme (TBL) ve dinamik grup/eşli çalışma kurgusu. İhtiyaç analizi (%41,9 aktif öğrenme, %35,5 TBL) ve eşli ders gözlemi raporlarına dayalı 3. öncelikli atölye.',
    targetAudience: 'Tüm Yabancı Dil Öğretim Elemanları (İngilizce, Almanca, Fransızca)',
    status: 'upcoming',
    organizer: 'Sürekli Mesleki Gelişim Birimi (CPD) & Yayınevi İş Birliği',
    location: 'YDYO Seminer / Toplantı Salonu (Uygulamalı 2 Seans • 2x45 dk)',
    driveDocTitle: '2026-27 Akademik Yılı Workshop Programı.pdf',
    driveDocUrl: 'docs/2026-27 Akademik Yılı Workshop Programı.pdf'
  },
  {
    id: 'cpd-ws-4',
    unitId: 'cpd',
    title: 'Crystal-Clear Setups & Smart Feedback: Mastering ICQs, CCQs, and Peer Correction Without Killing Fluency',
    date: '07 Mayıs 2027, Cuma (13:30 - 15:30)',
    category: 'Eğitim & Atölye',
    summary: 'Yönerge netliği (ICQ/CCQ), kontrol listeleri ile süreç odaklı akran geri bildirimi ve gecikmeli tahta dönütü ile akıcılığı bozmadan hata düzeltme teknikleri. Ders gözlem raporlarındaki pedagojik ihtiyaçlara yönelik 4. öncelikli atölye.',
    targetAudience: 'Tüm Yabancı Dil Öğretim Elemanları (İngilizce, Almanca, Fransızca)',
    status: 'upcoming',
    organizer: 'Sürekli Mesleki Gelişim Birimi (CPD) & Yayınevi İş Birliği',
    location: 'YDYO Seminer / Toplantı Salonu (Uygulamalı 2 Seans • 2x45 dk)',
    driveDocTitle: '2026-27 Akademik Yılı Workshop Programı.pdf',
    driveDocUrl: 'docs/2026-27 Akademik Yılı Workshop Programı.pdf'
  }
];

export const TEMPLATE_DOCUMENTS: TemplateDocument[] = [];

export const ACADEMIC_CALENDAR_EVENTS: CalendarEvent[] = [];

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
