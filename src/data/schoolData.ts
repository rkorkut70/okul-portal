// Bu dosya docs/okul_bilgi.xlsx dosyasından scripts/sync_school_data.py ile otomatik üretilmiştir.
// Manuel düzenleme yapmayınız.

export interface AcademicStaff {
  id: number;
  name: string;
  language: string;
  role: string | null;
  email: string | null;
  phone: string | null;
  officeHour: string | null;
}

export interface AdministrativeStaff {
  id: number;
  name: string;
  role: string;
  email: string | null;
  phone: string | null;
}

export interface AcademicUnitInfo {
  academicYear: string;
  name: string;
  code: string;
  head: string;
  members: string[];
  driveUrl: string | null;
}

export interface ClassroomInfo {
  name: string;
  code: string;
  capacity: number;
}

export interface BranchAdvisorInfo {
  language: string;
  obisCode: string;
  branch: string;
  track: string;
  advisor: string;
}

export interface BoardMemberInfo {
  id: number;
  name: string;
  role: string;
  duty: string;
}

export interface UsefulLinkInfo {
  id: number;
  title: string;
  category: string;
  url: string;
  description: string;
}

export const ACADEMIC_STAFF: AcademicStaff[] = [
  {
    "id": 1,
    "name": "Prof. Dr. Bertan AKYOL",
    "language": "İngilizce",
    "role": "Müdür",
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 2,
    "name": "Öğr. Gör. Rıdvan KORKUT",
    "language": "İngilizce",
    "role": "Müdür Yardımcısı",
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 3,
    "name": "Öğr. Gör. Dr. Hasan Ulvi EVREN",
    "language": "İngilizce",
    "role": "Müdür Yardımcısı",
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 4,
    "name": "Öğr. Gör. Beyhan SEZER",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 5,
    "name": "Öğr. Gör. M. Niyazi YAĞMUR",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 6,
    "name": "Öğr. Gör. İrem GÜL OKŞAR",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 7,
    "name": "Öğr. Gör. Dr. Canay KARCI AKTAŞ",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 8,
    "name": "Öğr. Gör. Mehmet Burak OKŞAR",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 9,
    "name": "Öğr. Gör. Pınar UĞUR",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 10,
    "name": "Öğr. Gör. Dr. Emre DİNÇER",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 11,
    "name": "Öğr. Gör. Esma ACUN",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 12,
    "name": "Öğr. Gör. Dr. Sibel ARABACI",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 13,
    "name": "Öğr. Gör. Lütfi SARAÇ",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 14,
    "name": "Öğr. Gör. Hatice KURT",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 15,
    "name": "Öğr. Gör. Hayri ARGUNAT",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 16,
    "name": "Öğr. Gör. Saim ÖZKAN",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 17,
    "name": "Öğr. Gör. Sevim EVREN",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 18,
    "name": "Öğr. Gör. Fethiye EFENDİ KIR",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 19,
    "name": "Öğr. Gör. Cansın ÇALIŞKAN",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 20,
    "name": "Öğr. Gör. Gülsün POYRAZ SOFRACI",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 21,
    "name": "Öğr. Gör. Soner SOFRACI",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 22,
    "name": "Öğr. Gör. Dilek ATEŞ",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 23,
    "name": "Öğr. Gör. Özlem DİLAVER",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 24,
    "name": "Öğr. Gör. Göksel TURAN",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 25,
    "name": "Öğr. Gör. Bilge Sevim SOYKUT",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 26,
    "name": "Öğr. Gör. Özlem MADAK",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 27,
    "name": "Öğr. Gör. Murat MADAK",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 28,
    "name": "Öğr. Gör. Ersin SAMUR",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 29,
    "name": "Öğr. Gör. Ercan YILMAZ",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 30,
    "name": "Öğr. Gör. Yasir YAREN",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 31,
    "name": "Öğr. Gör. Dr. Mehmet BİRGÜN",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 32,
    "name": "Öğr. Gör. Sibel KATIRCI",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 33,
    "name": "Öğr. Gör. Buket ŞAHİN",
    "language": "Fransızca",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 34,
    "name": "Öğr. Gör. Seher ÖZDEMİR YAVUZ",
    "language": "Fransızca",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 35,
    "name": "Öğr. Gör. Dr. Sibel YILDIZ",
    "language": "İngilizce",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 36,
    "name": "Öğr. Gör. Gül TECİMER",
    "language": "Fransızca",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 37,
    "name": "Öğr. Gör. Ulviye KARACA",
    "language": "Fransızca",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 38,
    "name": "Öğr. Gör. Buse ARASILER",
    "language": "Almanca",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 39,
    "name": "Öğr. Gör. Dr. Fatma BAŞKAYA",
    "language": "Almanca",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 40,
    "name": "Misafir.Öğr.Elm. Pelin GÜRLER",
    "language": "Almanca",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  },
  {
    "id": 41,
    "name": "Misafir.Öğr.Elm. Beyzasu KÜÇÜKDANACI",
    "language": "Almanca",
    "role": null,
    "email": null,
    "phone": null,
    "officeHour": null
  }
];

export const ADMINISTRATIVE_STAFF: AdministrativeStaff[] = [
  {
    "id": 1,
    "name": "Recep KARASULU",
    "role": "Yüksekokul Sekreteri",
    "email": null,
    "phone": null
  },
  {
    "id": 2,
    "name": "Şenay KANYILMAZ",
    "role": "Yazı İşleri",
    "email": null,
    "phone": null
  },
  {
    "id": 3,
    "name": "Suat TÜRKOĞLU",
    "role": "Taşınır Kayıt Kontrol Yetkilisi",
    "email": null,
    "phone": null
  },
  {
    "id": 4,
    "name": "Derya AKBULUT GÖRGÜLÜ",
    "role": "İdari Mali İşler",
    "email": null,
    "phone": null
  },
  {
    "id": 5,
    "name": "Emrah YAVUZ",
    "role": "Öğrenci İşleri",
    "email": null,
    "phone": null
  },
  {
    "id": 6,
    "name": "Elvan BEKER",
    "role": "Yardımcı Personel",
    "email": null,
    "phone": null
  },
  {
    "id": 7,
    "name": "Esra BARBA",
    "role": "Yardımcı Personel",
    "email": null,
    "phone": null
  }
];

export const ACADEMIC_UNITS_DATA: AcademicUnitInfo[] = [
  {
    "academicYear": "2026-2027",
    "name": "SINAV BİRİMİ",
    "code": "Testing",
    "head": "Öğr. Gör. Göksel TURAN",
    "members": [
      "Öğr. Gör. Cansın ÇALIŞKAN",
      "Öğr. Gör. Özlem DİLAVER",
      "Öğr. Gör. Ersin SAMUR",
      "Öğr. Gör. Soner SOFRACI",
      "Öğr. Gör. Murat MADAK",
      "Öğr. Gör. Gül TECİMER",
      "Öğr. Gör. Ulviye KARACA"
    ],
    "driveUrl": null
  },
  {
    "academicYear": "2026-2027",
    "name": "MATERYAL SEÇME ve GELİŞTİRME BİRİMİ",
    "code": "Materyal",
    "head": "Öğr. Gör. Dilek ATEŞ",
    "members": [
      "Öğr. Gör. Beyhan SEZER",
      "Öğr. Gör. Burak OKŞAR",
      "Öğr. Gör. Sevim EVREN",
      "Öğr. Gör. Esma ACUN",
      "Öğr. Gör. Gülsün POYRAZ SOFRACI",
      "Öğr. Gör. Buket ŞAHİN"
    ],
    "driveUrl": null
  },
  {
    "academicYear": "2026-2027",
    "name": "PROGRAM GELİŞTİRME BİRİMİ",
    "code": "Program",
    "head": "Öğr. Gör. Hayri ARGUNAT",
    "members": [
      "Öğr. Gör. Dr. Canay KARCI AKTAŞ",
      "Öğr. Gör. Saim ÖZKAN",
      "Öğr. Gör. M. Niyazi YAĞMUR",
      "Öğr. Gör. Yasir YAREN",
      "Öğr. Gör. Lütfi SARAÇ"
    ],
    "driveUrl": null
  },
  {
    "academicYear": "2026-2027",
    "name": "SÜREKLİ MESLEKİ GELİŞİM BİRİMİ",
    "code": "CPD",
    "head": "Öğr. Gör. Pınar UĞUR",
    "members": [
      "Öğr. Gör. Hatice KURT",
      "Öğr. Gör. Fethiye EFENDİ KIR",
      "Öğr. Gör. Dr. Emre DİNÇER",
      "Öğr. Gör. İrem Gül OKŞAR",
      "Öğr. Gör. Ercan YILMAZ",
      "Öğr. Gör. Dr. Mehmet BİRGÜN",
      "Öğr. Gör. Buse ARASILER"
    ],
    "driveUrl": null
  },
  {
    "academicYear": "2026-2027",
    "name": "KALİTE VE AKREDİTASYON BİRİMİ",
    "code": "KAB",
    "head": "Öğr. Gör. Bilge Sevim SOYKUT",
    "members": [
      "Öğr. Gör. Sibel ARABACI",
      "Öğr. Gör. Lütfi SARAÇ",
      "Öğr. Gör. Özlem MADAK",
      "Öğr. Gör. Dr. Sibel YILDIZ",
      "Öğr. Gör. Seher ÖZDEMİR"
    ],
    "driveUrl": null
  }
];

export const CLASSROOMS: ClassroomInfo[] = [
  {
    "name": "Derslik 1",
    "code": "D-1",
    "capacity": 30
  },
  {
    "name": "Derslik 2",
    "code": "D-2",
    "capacity": 30
  },
  {
    "name": "Derslik 3",
    "code": "D-3",
    "capacity": 30
  },
  {
    "name": "Derslik 4",
    "code": "D-4",
    "capacity": 30
  },
  {
    "name": "Derslik 5",
    "code": "D-5",
    "capacity": 30
  },
  {
    "name": "Derslik 6",
    "code": "D-6",
    "capacity": 30
  },
  {
    "name": "Derslik 7",
    "code": "D-7",
    "capacity": 30
  },
  {
    "name": "Derslik 8",
    "code": "D-8",
    "capacity": 30
  },
  {
    "name": "Derslik 9",
    "code": "D-9",
    "capacity": 30
  },
  {
    "name": "Derslik 10",
    "code": "D-10",
    "capacity": 30
  },
  {
    "name": "Derslik 11",
    "code": "D-11",
    "capacity": 30
  },
  {
    "name": "Derslik 12",
    "code": "D-12",
    "capacity": 30
  },
  {
    "name": "Derslik 13",
    "code": "D-13",
    "capacity": 30
  },
  {
    "name": "Derslik 14",
    "code": "D-14",
    "capacity": 30
  },
  {
    "name": "Derslik 15",
    "code": "D-15",
    "capacity": 30
  },
  {
    "name": "Derslik 16",
    "code": "D-16",
    "capacity": 30
  },
  {
    "name": "Derslik 17",
    "code": "D-17",
    "capacity": 30
  },
  {
    "name": "Seminer Salonu",
    "code": "SS",
    "capacity": 25
  },
  {
    "name": "Toplantı Salonu",
    "code": "TS",
    "capacity": 25
  },
  {
    "name": "Derslik 18",
    "code": "D-18",
    "capacity": 30
  }
];

export const BRANCH_ADVISORS: BranchAdvisorInfo[] = [
  {
    "language": "İngilizce",
    "obisCode": "AA02",
    "branch": "İHS-101",
    "track": "(4B Üst kur)",
    "advisor": "Öğr. Gör. Dr. Canay KARCI AKTAŞ"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA03",
    "branch": "İHS-102",
    "track": "(4B Üst kur)",
    "advisor": "Öğr. Gör. Sibel KATIRCI"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA04",
    "branch": "İHS-103",
    "track": "(4B Üst kur)",
    "advisor": "Öğr. Gör. Yasir YAREN"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA05",
    "branch": "İHS-104",
    "track": "(4B Üst kur)",
    "advisor": "Öğr. Gör. Sevim EVREN"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA06",
    "branch": "İHS-105",
    "track": "(4B Üst kur)",
    "advisor": "Öğr. Gör. Esma ACUN"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA07",
    "branch": "İHS-106",
    "track": "(4B Üst kur)",
    "advisor": "Öğr. Gör. Fethiye EFENDİ KIR"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA08",
    "branch": "İHS-107",
    "track": "(4B Üst kur)",
    "advisor": "Öğr. Gör. Özlem MADAK"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA09",
    "branch": "İHS-108",
    "track": "(4B Üst kur)",
    "advisor": "Öğr. Gör. Lütfi SARAÇ"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA10",
    "branch": "İHS-109",
    "track": "(4B Üst kur)",
    "advisor": "Öğr. Gör. M. Burak OKŞAR"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA11",
    "branch": "İHS-110",
    "track": "(4B Üst kur)",
    "advisor": "Öğr. Gör. Ercan YILMAZ"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA12",
    "branch": "İHS-111",
    "track": "(4B Üst kur)",
    "advisor": "Öğr. Gör. İrem Gül OKŞAR"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA13",
    "branch": "İHS-112",
    "track": "(4A Alt kur)",
    "advisor": "Öğr. Gör. Hatice KURT"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA14",
    "branch": "İHS-113",
    "track": "(4A Alt kur)",
    "advisor": "Öğr. Gör. Gülsün POYRAZ SOFRACI"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA15",
    "branch": "İHS-114",
    "track": "(4A Alt kur)",
    "advisor": "Öğr. Gör. Saim ÖZKAN"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA16",
    "branch": "İHS-115",
    "track": "(4A Alt kur)",
    "advisor": "Öğr. Gör. M. Niyazi YAĞMUR"
  },
  {
    "language": "İngilizce",
    "obisCode": "AA17",
    "branch": "İHS-116",
    "track": "(4A Alt kur)",
    "advisor": "Öğr. Gör. Beyhan SEZER"
  },
  {
    "language": "Fransızca",
    "obisCode": "AA02",
    "branch": "FHS-101",
    "track": "(4B Üst kur)",
    "advisor": "Öğr. Gör. Dr. Sibel YILDIZ"
  },
  {
    "language": "Fransızca",
    "obisCode": "AA03",
    "branch": "FHS-102",
    "track": "(4A Alt kur)",
    "advisor": "Öğr. Gör. Buket ŞAHİN"
  },
  {
    "language": "Fransızca",
    "obisCode": "AA04",
    "branch": "FHS-103",
    "track": "(4A Alt kur)",
    "advisor": "Öğr. Gör. Gül TECİMER"
  },
  {
    "language": "Almanca",
    "obisCode": "AA02",
    "branch": "AHS-101",
    "track": "(4A Alt kur)",
    "advisor": "Öğr. Gör. Ulviye KARACA"
  },
  {
    "language": "Almanca",
    "obisCode": "AA03",
    "branch": "AHS-102",
    "track": "(4A Alt kur)",
    "advisor": "Öğr. Gör. Buse ARASILER"
  },
  {
    "language": "Almanca",
    "obisCode": "AA04",
    "branch": "AHS-103",
    "track": "(4A Alt kur)",
    "advisor": "Öğr. Gör. Dr. Fatma BAŞKAYA"
  }
];

export const MANAGEMENT_BOARD: BoardMemberInfo[] = [
  {
    "id": 1,
    "name": "Prof. Dr. Bertan AKYOL",
    "role": "Başkan",
    "duty": "Yüksekokul Müdürü"
  },
  {
    "id": 2,
    "name": "Öğr. Gör. Rıdvan KORKUT",
    "role": "Üye",
    "duty": "Müdür Yardımcısı"
  },
  {
    "id": 3,
    "name": "Öğr. Gör. Dr. Hasan Ulvi EVREN",
    "role": "Üye",
    "duty": "Müdür Yardımcısı"
  },
  {
    "id": 4,
    "name": "Recep KARASULU",
    "role": "Raportör",
    "duty": "Yüksekokul Sekreteri"
  }
];

export const SCHOOL_BOARD: BoardMemberInfo[] = [
  {
    "id": 1,
    "name": "Prof. Dr. Bertan AKYOL",
    "role": "Başkan",
    "duty": "Yüksekokul Müdürü"
  },
  {
    "id": 2,
    "name": "Öğr. Gör. Rıdvan KORKUT",
    "role": "Üye",
    "duty": "Müdür Yardımcısı"
  },
  {
    "id": 3,
    "name": "Öğr. Gör. Dr. Hasan Ulvi EVREN",
    "role": "Üye",
    "duty": "Müdür Yardımcısı"
  },
  {
    "id": 4,
    "name": "Recep KARASULU",
    "role": "Raportör",
    "duty": "Yüksekokul Sekreteri"
  }
];

export const USEFUL_LINKS: UsefulLinkInfo[] = [
  {
    "id": 1,
    "title": "OBİS - Öğrenci Bilgi Sistemi",
    "category": "Öğrenci & Akademik",
    "url": "https://obis.adu.edu.tr/",
    "description": "Öğrenci not, devamsızlık ve ders kayıt sistemi"
  },
  {
    "id": 2,
    "title": "EBYS - Elektronik Belge Yönetim Sistemi",
    "category": "İdari & Akademik",
    "url": "https://ebys.adu.edu.tr/",
    "description": "Resmi yazışma ve evrak takip sistemi"
  },
  {
    "id": 3,
    "title": "ADÜ Akademik Takvim",
    "category": "Genel",
    "url": "https://idari.adu.edu.tr/db/ogrenciisleri/tr/page-810",
    "description": "Ön lisans ve lisans eğitim-öğretim takvimi"
  },
  {
    "id": 4,
    "title": "ADÜ Kurumsal E-Posta (Webmail)",
    "category": "İletişim",
    "url": "https://posta.adu.edu.tr/",
    "description": "Personel kurumsal e-posta arayüzü"
  },
  {
    "id": 5,
    "title": "ADÜ YDYO Web Sitesi",
    "category": "Kurumsal",
    "url": "https://akademik.adu.edu.tr/ydyo/",
    "description": "Yabancı Diller Yüksekokulu resmi web sayfası"
  },
  {
    "id": 6,
    "title": "ADÜ Personel Bilgi Sistemi",
    "category": "İdari & Akademik",
    "url": "https://personel.adu.edu.tr/",
    "description": "Personel özlük, izin ve kimlik bilgileri"
  },
  {
    "id": 7,
    "title": "ADÜ Kütüphane Veritabanları",
    "category": "Akademik & Araştırma",
    "url": "https://kutuphane.adu.edu.tr/",
    "description": "Katalog tarama, e-kitap ve akademik veritabanları"
  },
  {
    "id": 8,
    "title": "ADÜ SKS Yemekhane Menüsü",
    "category": "Kampüs Yaşamı",
    "url": "https://sks.adu.edu.tr/",
    "description": "Günlük ve aylık yemek listesi"
  },
  {
    "id": 9,
    "title": "ADÜ Uzaktan Eğitim Merkezi (ADUZEM)",
    "category": "Eğitim",
    "url": "https://aduzem.adu.edu.tr/",
    "description": "Çevrim içi ders ve sınav portalı"
  },
  {
    "id": 10,
    "title": "YÖKSİS - YÖK Bilgi Sistemi",
    "category": "Akademik",
    "url": "https://yoksis.yok.gov.tr/",
    "description": "YÖK akademik özgeçmiş ve yayın yönetim sistemi"
  },
  {
    "id": 11,
    "title": "ÖSYM Görevli & Sınav İşlemleri",
    "category": "Sınav",
    "url": "https://gis.osym.gov.tr/",
    "description": "ÖSYM sınav görevlendirme ve sonuç sistemi"
  }
];
