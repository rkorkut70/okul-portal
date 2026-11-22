// Bu dosya docs/okul_bilgi.xlsx dosyasından scripts/sync_school_data.py ile otomatik üretilmiştir.
// Manuel düzenleme yapmayınız.

export interface AcademicStaff {
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
  startDate: string;
}

export interface UnitDutyInfo {
  code: string;
  name: string;
  head: string;
  mission: string;
  vision: string;
  summary: string;
  note: string;
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
    "title": "Prof. Dr.",
    "name": "Bertan AKYOL",
    "language": "İngilizce",
    "role": "Müdür",
    "dutyPlace": "Yabancı Diller Yüksekokulu",
    "email": "bertan.akyol@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-0565"
  },
  {
    "id": 2,
    "title": "Öğr. Gör. Dr.",
    "name": "Hasan Ulvi Evren",
    "language": "İngilizce",
    "role": "Müdür Yardımcısı",
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "hasan.evren@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1567"
  },
  {
    "id": 3,
    "title": "Öğr. Gör.",
    "name": "Rıdvan Korkut",
    "language": "İngilizce",
    "role": "Müdür Yardımcısı",
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "ridvan.korkut@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1350"
  },
  {
    "id": 4,
    "title": "Öğr. Gör. Dr.",
    "name": "Barış ÇAVUŞ",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "Eğitim Fakültesi",
    "email": null,
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/"
  },
  {
    "id": 5,
    "title": "Öğr. Gör.",
    "name": "Beyhan Sezer",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "bsezer@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-0015"
  },
  {
    "id": 6,
    "title": "Öğr. Gör.",
    "name": "Bilge Sevim Soykut",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "bilge.soykut@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2197"
  },
  {
    "id": 7,
    "title": "Öğr. Gör.",
    "name": "Buket Şahin",
    "language": "Fransızca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "bsahin@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-0139"
  },
  {
    "id": 8,
    "title": "Öğr. Gör.",
    "name": "Buse Arasıler",
    "language": "Almanca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "busecosar@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1712"
  },
  {
    "id": 9,
    "title": "Öğr. Gör. Dr.",
    "name": "Büşra Hafçı Yorulmaz",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "Turizm Fakültesi - İngilizce",
    "email": "busrahafci@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2393"
  },
  {
    "id": 10,
    "title": "Öğr. Gör. Dr.",
    "name": "Canay Karcı Aktaş",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "ckarci@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1368"
  },
  {
    "id": 11,
    "title": "Öğr. Gör.",
    "name": "Cansın Çalışkan",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "cansin.caliskan@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1798"
  },
  {
    "id": 12,
    "title": "Öğr. Gör.",
    "name": "Dilek Ateş",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "dilekcelik@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1917"
  },
  {
    "id": 13,
    "title": "Öğr. Gör. Dr.",
    "name": "Emre Dinçer",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "Dış İlişkiler Ofisi - İngilizce",
    "email": "edincer@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1475"
  },
  {
    "id": 14,
    "title": "Öğr. Gör.",
    "name": "Ercan Yılmaz",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "ercan.yilmaz@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2379"
  },
  {
    "id": 15,
    "title": "Öğr. Gör.",
    "name": "Ersin Samur",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "ersin.samur@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2245"
  },
  {
    "id": 16,
    "title": "Öğr. Gör.",
    "name": "Esma Acun",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "eacun@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1494"
  },
  {
    "id": 17,
    "title": "Öğr. Gör.",
    "name": "Esra Erenoğlu Aksoy",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "eaksoy@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-4091"
  },
  {
    "id": 18,
    "title": "Öğr. Gör. Dr.",
    "name": "Fatma Başkaya",
    "language": "Almanca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "fatma.baskaya@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-4104"
  },
  {
    "id": 19,
    "title": "Öğr. Gör.",
    "name": "Fethiye Efendi Kır",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "fethiye.efendi@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1713"
  },
  {
    "id": 20,
    "title": "Öğr. Gör.",
    "name": "Fisun Karaburun",
    "language": "Almanca",
    "role": null,
    "dutyPlace": "Turizm Fakültesi - Almanca",
    "email": "fcengel@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-0642"
  },
  {
    "id": 21,
    "title": "Öğr. Gör.",
    "name": "Göksel Turan",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "goksel.turan@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2060"
  },
  {
    "id": 22,
    "title": "Öğr. Gör.",
    "name": "Gül Tecimer",
    "language": "Fransızca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "gultecimer@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1915"
  },
  {
    "id": 23,
    "title": "Öğr. Gör.",
    "name": "Gülsün Poyraz Sofracı",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "gulsun.poyraz@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1805"
  },
  {
    "id": 24,
    "title": "Öğr. Gör.",
    "name": "Hatice Kurt",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "hatice.kurt@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1520"
  },
  {
    "id": 25,
    "title": "Öğr. Gör.",
    "name": "Hayri Argunat",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "hayriargunat@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1709"
  },
  {
    "id": 26,
    "title": "Öğr. Gör.",
    "name": "Lütfi Saraç",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "lsarac@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1515"
  },
  {
    "id": 27,
    "title": "Öğr. Gör. Dr.",
    "name": "Mehmet Birgün",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "mehmet.birgun@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-3831"
  },
  {
    "id": 28,
    "title": "Öğr. Gör.",
    "name": "Mehmet Burak Okşar",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "Didim MYO - İngilizce",
    "email": "burak.oksar@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1411"
  },
  {
    "id": 29,
    "title": "Öğr. Gör.",
    "name": "Mehmet Niyazi Yağmur",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "mnyagmur@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-0103"
  },
  {
    "id": 30,
    "title": "Öğr. Gör.",
    "name": "Mine Gergün",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "Söke MYO - İngilizce",
    "email": "mbozdag@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1505"
  },
  {
    "id": 31,
    "title": "Öğr. Gör.",
    "name": "Murat Madak",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "murat.madak@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2218"
  },
  {
    "id": 32,
    "title": "Öğr. Gör.",
    "name": "Nursel Özen",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "Davutlar MYO - İngilizce",
    "email": "nozen@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-0027"
  },
  {
    "id": 33,
    "title": "Öğr. Gör.",
    "name": "Pınar Uğur",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "pinar.ugur@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1470"
  },
  {
    "id": 34,
    "title": "Öğr. Gör.",
    "name": "Saim Özkan",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "saim.ozkan@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1710"
  },
  {
    "id": 35,
    "title": "Öğr. Gör.",
    "name": "Seher Özdemir Yavuz",
    "language": "Fransızca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "seher.ozdemir@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1821"
  },
  {
    "id": 36,
    "title": "Öğr. Gör.",
    "name": "Sevim Evren",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "sevim.top@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1711"
  },
  {
    "id": 37,
    "title": "Öğr. Gör.",
    "name": "Sibel Arabacı",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "sibel.karasulu@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1496"
  },
  {
    "id": 38,
    "title": "Öğr. Gör.",
    "name": "Sibel Katırcı",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "s.katirci@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-4094"
  },
  {
    "id": 39,
    "title": "Öğr. Gör. Dr.",
    "name": "Sibel Yıldız",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "sibelkozan@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1914"
  },
  {
    "id": 40,
    "title": "Öğr. Gör.",
    "name": "Soner Sofracı",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "sonersofraci@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1912"
  },
  {
    "id": 41,
    "title": "Öğr. Gör.",
    "name": "Ulviye Karaca",
    "language": "Fransızca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "ulviye.berak@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-3148"
  },
  {
    "id": 42,
    "title": "Öğr. Gör.",
    "name": "Yasir Yaren",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "yasir.yaren@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2411"
  },
  {
    "id": 43,
    "title": "Öğr. Gör.",
    "name": "Çimen Atay",
    "language": "Almanca",
    "role": null,
    "dutyPlace": "Turizm Fakültesi - Almanca",
    "email": "cimen.sarikaya@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2925"
  },
  {
    "id": 44,
    "title": "Öğr. Gör. Dr.",
    "name": "Özgür Esen",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "Fen Edebiyat Fakültesi - İngilizce",
    "email": "ozgur.esen@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1799"
  },
  {
    "id": 45,
    "title": "Öğr. Gör.",
    "name": "Özlem Dilaver",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "ozlem.dilaver@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2059"
  },
  {
    "id": 46,
    "title": "Öğr. Gör.",
    "name": "Özlem Madak",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "ozlem.madak@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2217"
  },
  {
    "id": 47,
    "title": "Öğr. Gör.",
    "name": "İrem Gül Okşar",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "Didim MYO - İngilizce",
    "email": "igoksar@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1353"
  },
  {
    "id": 48,
    "title": "Öğr. Gör.",
    "name": "Şebnem Günaydın",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "Turizm Fakültesi - İngilizce",
    "email": "sgunaydin@adu.edu.tr",
    "phone": null,
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1171"
  },
  {
    "id": 49,
    "title": "Misafir Öğr. Elm.",
    "name": "Beyzasu KÜÇÜKDANACI",
    "language": "Almanca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": null,
    "phone": null,
    "officeHour": null,
    "akbisUrl": null
  },
  {
    "id": 50,
    "title": "Misafir Öğr. Elm.",
    "name": "Pelin GÜRLER",
    "language": "Almanca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": null,
    "phone": null,
    "officeHour": null,
    "akbisUrl": null
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
    "name": "Prof.Dr.Bertan AKYOL",
    "role": "Müdür",
    "startDate": "26/04/2023"
  },
  {
    "id": 2,
    "name": "Doç.Dr.Bilgen KIRAL",
    "role": "Öğretim Üyesi",
    "startDate": "13/12/2024"
  },
  {
    "id": 3,
    "name": "Dr.Öğretim Üyesi Faruk KALAY",
    "role": "Öğretim Üyesi",
    "startDate": "22/05/2023"
  },
  {
    "id": 4,
    "name": "Dr.Öğretim Üyesi Tahir YILMAZ",
    "role": "Öğretim Üyesi",
    "startDate": "22/05/2023"
  },
  {
    "id": 5,
    "name": "Dr.Öğretim Üyesi Barış ÇAVUŞ",
    "role": "Öğretim Üyesi",
    "startDate": "22/05/2026"
  },
  {
    "id": 6,
    "name": "Öğr.Gör.Rıdvan KORKUT",
    "role": "Öğretim Elemanı",
    "startDate": "26/04/2023"
  },
  {
    "id": 7,
    "name": "Öğr.Gör.Dr.Hasan Ulvi EVREN",
    "role": "Öğretim Elemanı",
    "startDate": "26/04/2023"
  },
  {
    "id": 8,
    "name": "Recep KARASULU",
    "role": "Raportör",
    "startDate": "29/04/2010"
  }
];

export const SCHOOL_BOARD: BoardMemberInfo[] = [
  {
    "id": 1,
    "name": "Prof.Dr.Bertan AKYOL",
    "role": "Müdür",
    "startDate": "26/04/2023"
  },
  {
    "id": 2,
    "name": "Öğr.Gör.Rıdvan KORKUT",
    "role": "Öğretim Elemanı",
    "startDate": "26/04/2023"
  },
  {
    "id": 3,
    "name": "Öğr.Gör.Dr. Hasan Ulvi EVREN",
    "role": "Öğretim Elemanı",
    "startDate": "26/04/2023"
  },
  {
    "id": 4,
    "name": "Öğr.Gör.Ulviye KARACA",
    "role": "Öğretim Elemanı",
    "startDate": "03/01/2020"
  },
  {
    "id": 5,
    "name": "Öğr.Gör.Gül TECİMER",
    "role": "Öğretim Elemanı",
    "startDate": "05/10/2023"
  },
  {
    "id": 6,
    "name": "Öğr.Gör.Göksel TURAN",
    "role": "Öğretim Elemanı",
    "startDate": "05/10/2023"
  },
  {
    "id": 7,
    "name": "Öğr.Gör.Hayri ARGUNAT",
    "role": "Öğretim Elemanı",
    "startDate": "24/01/2024"
  },
  {
    "id": 8,
    "name": "Öğr.Gör.Dile ATEŞ",
    "role": "Öğretim Elemanı",
    "startDate": "10/06/2024"
  },
  {
    "id": 9,
    "name": "Öğr.Gör.Pınar UĞUR",
    "role": "Öğretim Elemanı",
    "startDate": "26/06/2024"
  },
  {
    "id": 10,
    "name": "Öğr.Gör.Bilge Sevim SOYKUT",
    "role": "Öğretim Elemanı",
    "startDate": "12/09/2024"
  },
  {
    "id": 11,
    "name": "Recep KARASULU",
    "role": "Raportör",
    "startDate": "29/04/2010"
  }
];

export const UNIT_DUTIES: UnitDutyInfo[] = [
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
