// Bu dosya docs/okul_bilgi.xlsx dosyasından scripts/sync_school_data.py ile otomatik üretilmiştir.
// Manuel düzenleme yapmayınız.

import type { ActivityItem } from '../types';

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

export interface PhoneDirectoryItem {
  id: number;
  name: string;
  role: string;
  extension: string;
  externalPhone: string;
  email: string | null;
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
    "phone": "4603",
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
    "phone": "4604",
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
    "phone": "4605",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1350"
  },
  {
    "id": 4,
    "title": "Öğr. Gör.",
    "name": "Beyhan Sezer",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "bsezer@adu.edu.tr",
    "phone": "4624",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-0015"
  },
  {
    "id": 5,
    "title": "Öğr. Gör.",
    "name": "Bilge Sevim Soykut",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "bilge.soykut@adu.edu.tr",
    "phone": "4641",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2197"
  },
  {
    "id": 6,
    "title": "Öğr. Gör.",
    "name": "Buket Şahin",
    "language": "Fransızca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "bsahin@adu.edu.tr",
    "phone": "4616",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-0139"
  },
  {
    "id": 7,
    "title": "Öğr. Gör.",
    "name": "Buse Arasıler",
    "language": "Almanca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "busecosar@adu.edu.tr",
    "phone": "4650",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1712"
  },
  {
    "id": 8,
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
    "id": 9,
    "title": "Öğr. Gör. Dr.",
    "name": "Canay Karcı Aktaş",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "ckarci@adu.edu.tr",
    "phone": "4625",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1368"
  },
  {
    "id": 10,
    "title": "Öğr. Gör.",
    "name": "Cansın Çalışkan",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "cansin.caliskan@adu.edu.tr",
    "phone": "4647",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1798"
  },
  {
    "id": 11,
    "title": "Öğr. Gör.",
    "name": "Dilek Ateş",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "dilekcelik@adu.edu.tr",
    "phone": "4647",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1917"
  },
  {
    "id": 12,
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
    "id": 13,
    "title": "Öğr. Gör.",
    "name": "Ercan Yılmaz",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "ercan.yilmaz@adu.edu.tr",
    "phone": "4641",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2379"
  },
  {
    "id": 14,
    "title": "Öğr. Gör.",
    "name": "Ersin Samur",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "ersin.samur@adu.edu.tr",
    "phone": "4625",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2245"
  },
  {
    "id": 15,
    "title": "Öğr. Gör.",
    "name": "Esma Acun",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "eacun@adu.edu.tr",
    "phone": "4647",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1494"
  },
  {
    "id": 16,
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
    "id": 17,
    "title": "Öğr. Gör. Dr.",
    "name": "Fatma Başkaya",
    "language": "Almanca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "fatma.baskaya@adu.edu.tr",
    "phone": "4650",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-4104"
  },
  {
    "id": 18,
    "title": "Öğr. Gör.",
    "name": "Fethiye Efendi Kır",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "fethiye.efendi@adu.edu.tr",
    "phone": "4645",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1713"
  },
  {
    "id": 19,
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
    "id": 20,
    "title": "Öğr. Gör.",
    "name": "Göksel Turan",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "goksel.turan@adu.edu.tr",
    "phone": "4639",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2060"
  },
  {
    "id": 21,
    "title": "Öğr. Gör.",
    "name": "Gül Tecimer",
    "language": "Fransızca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "gultecimer@adu.edu.tr",
    "phone": "4616",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1915"
  },
  {
    "id": 22,
    "title": "Öğr. Gör.",
    "name": "Gülsün Poyraz Sofracı",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "gulsun.poyraz@adu.edu.tr",
    "phone": "4645",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1805"
  },
  {
    "id": 23,
    "title": "Öğr. Gör.",
    "name": "Hatice Kurt",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "hatice.kurt@adu.edu.tr",
    "phone": "4641",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1520"
  },
  {
    "id": 24,
    "title": "Öğr. Gör.",
    "name": "Hayri Argunat",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "hayriargunat@adu.edu.tr",
    "phone": "4638",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1709"
  },
  {
    "id": 25,
    "title": "Öğr. Gör.",
    "name": "Lütfi Saraç",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "lsarac@adu.edu.tr",
    "phone": "4628",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1515"
  },
  {
    "id": 26,
    "title": "Öğr. Gör. Dr.",
    "name": "Mehmet Birgün",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "mehmet.birgun@adu.edu.tr",
    "phone": "4631",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-3831"
  },
  {
    "id": 27,
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
    "id": 28,
    "title": "Öğr. Gör.",
    "name": "Mehmet Niyazi Yağmur",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "mnyagmur@adu.edu.tr",
    "phone": "4625",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-0103"
  },
  {
    "id": 29,
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
    "id": 30,
    "title": "Öğr. Gör.",
    "name": "Murat Madak",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "murat.madak@adu.edu.tr",
    "phone": "4627",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2218"
  },
  {
    "id": 31,
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
    "id": 32,
    "title": "Öğr. Gör.",
    "name": "Pınar Uğur",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "pinar.ugur@adu.edu.tr",
    "phone": "4638",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1470"
  },
  {
    "id": 33,
    "title": "Öğr. Gör.",
    "name": "Saim Özkan",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "saim.ozkan@adu.edu.tr",
    "phone": "4624",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1710"
  },
  {
    "id": 34,
    "title": "Öğr. Gör.",
    "name": "Seher Özdemir Yavuz",
    "language": "Fransızca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "seher.ozdemir@adu.edu.tr",
    "phone": "4616",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1821"
  },
  {
    "id": 35,
    "title": "Öğr. Gör.",
    "name": "Sevim Evren",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "sevim.top@adu.edu.tr",
    "phone": "4645",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1711"
  },
  {
    "id": 36,
    "title": "Öğr. Gör.",
    "name": "Sibel Arabacı",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "sibel.karasulu@adu.edu.tr",
    "phone": "4628",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1496"
  },
  {
    "id": 37,
    "title": "Öğr. Gör.",
    "name": "Sibel Katırcı",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "s.katirci@adu.edu.tr",
    "phone": "4624",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-4094"
  },
  {
    "id": 38,
    "title": "Öğr. Gör. Dr.",
    "name": "Sibel Yıldız",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "sibelkozan@adu.edu.tr",
    "phone": "4616",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1914"
  },
  {
    "id": 39,
    "title": "Öğr. Gör.",
    "name": "Soner Sofracı",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "sonersofraci@adu.edu.tr",
    "phone": "4639",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-1912"
  },
  {
    "id": 40,
    "title": "Öğr. Gör.",
    "name": "Ulviye Karaca",
    "language": "Almanca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "ulviye.berak@adu.edu.tr",
    "phone": "4650",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-3148"
  },
  {
    "id": 41,
    "title": "Öğr. Gör.",
    "name": "Yasir Yaren",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "yasir.yaren@adu.edu.tr",
    "phone": "4631",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2411"
  },
  {
    "id": 42,
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
    "id": 43,
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
    "id": 44,
    "title": "Öğr. Gör.",
    "name": "Özlem Dilaver",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "ozlem.dilaver@adu.edu.tr",
    "phone": "4647",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2059"
  },
  {
    "id": 45,
    "title": "Öğr. Gör.",
    "name": "Özlem Madak",
    "language": "İngilizce",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": "ozlem.madak@adu.edu.tr",
    "phone": "4631 / 4649",
    "officeHour": null,
    "akbisUrl": "https://akbis.adu.edu.tr/personel_detay.asp?sno=A-2217"
  },
  {
    "id": 46,
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
    "id": 47,
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
    "id": 48,
    "title": "Misafir Öğr. Elm.",
    "name": "Beyzasu KÜÇÜKDANACI",
    "language": "Fransızca",
    "role": null,
    "dutyPlace": "YDYO (Yabancı Diller Yüksekokulu)",
    "email": null,
    "phone": null,
    "officeHour": null,
    "akbisUrl": null
  },
  {
    "id": 49,
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
    "email": "rkarasulu@adu.edu.tr",
    "phone": "4606"
  },
  {
    "id": 2,
    "name": "Şenay KANYILMAZ",
    "role": "Yazı İşleri",
    "email": "skanyilmaz@adu.edu.tr",
    "phone": "4608"
  },
  {
    "id": 3,
    "name": "Suat TÜRKOĞLU",
    "role": "Taşınır Kayıt Kontrol Yetkilisi",
    "email": "sturkoglu@adu.edu.tr",
    "phone": "4621"
  },
  {
    "id": 4,
    "name": "Derya AKBULUT GÖRGÜLÜ",
    "role": "İdari Mali İşler",
    "email": "dgorgulu@adu.edu.tr",
    "phone": "4607"
  },
  {
    "id": 5,
    "name": "Emrah YAVUZ",
    "role": "Öğrenci İşleri",
    "email": "eyavuz@adu.edu.tr",
    "phone": "4611"
  },
  {
    "id": 6,
    "name": "Elvan BEKER",
    "role": "Yardımcı Personel",
    "email": "elveda.beker@adu.edu.tr",
    "phone": "4600"
  },
  {
    "id": 7,
    "name": "Esra BARBA",
    "role": "Yardımcı Personel",
    "email": "esra.barba@adu.edu.tr",
    "phone": "4600"
  }
];

export const ACADEMIC_UNITS_DATA: AcademicUnitInfo[] = [
  {
    "academicYear": "2026-2027",
    "name": "SINAV BİRİMİ",
    "code": "SB",
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
    "code": "MB",
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
    "code": "PB",
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
    "code": "SB",
    "name": "SINAV BİRİMİ",
    "head": "Öğr. Gör. Göksel TURAN",
    "mission": "Öğrencilerin lisans eğitimine başlamak için gerekli yabancı dil yeterliliklerini ölçmek ve ileri seviye bilişsel yeteneklerini değerlendiren ölçme araçları oluşturmak.",
    "vision": "Dil ölçme ve değerlendirme alanında ulusal ve uluslararası standartlarda yenilikçi, güvenilir ve adil uygulamalarla öncü bir merkez olmak.",
    "summary": "1. Hazırlık YDYS, Yaz Okulu Sonu YDYS, Erasmus YDYS, Lisansüstü YDYS, Quiz, Ara Sınav, Final ve Mazeret sınavlarını hazırlamak, organize etmek ve değerlendirme ölçütlerini yönetmek.\n2. Soru tipleri taslakları, değerlendirme rubrikleri ve bilgilendirme metinlerini yayımlamak.\n3. Sınav takvimini Program ve Materyal birimleriyle koordineli belirlemek; gözetmenlik ve değerlendirme görevlendirmelerini yürütmek.\n4. Sınav evraklarının baskı/çoğaltma güvenliğini sağlamak, sınav itiraz dilekçelerini inceleyip karara bağlamak.",
    "note": "Tam ve detaylı bilgi YDYO Kalite El Kitabı Bölüm 7'de yer almaktadır."
  },
  {
    "code": "MB",
    "name": "MATERYAL SEÇME ve GELİŞTİRME BİRİMİ",
    "head": "Öğr. Gör. Dilek ATEŞ",
    "mission": "Eğitim programındaki amaçlara, içeriğe ve öğrenci seviyelerine uygun ders kaynaklarının, materyallerinin seçilmesini, düzenlenmesini ve erişilebilir olmasını sağlamak.",
    "vision": "Öğrenci ve öğretim elemanlarının ihtiyaçlarına en uygun ders kitaplarını/ek materyalleri seçmek, özgün çalışma kâğıtları geliştirmek ve dönem boyunca materyalleri güncel tutmak.",
    "summary": "1. Her akademik yıl müfredatı için ders kitaplarının analiz ve seçim sürecini koordine etmek.\n2. Dört beceriye dayalı özgün çalışma kâğıtları, ses dosyaları ve ELT ek paketleri derlemek ve geliştirmek.\n3. Ders materyallerini, çalışma kâğıtlarını ve cevap anahtarlarını kurumsal Drive (O-Drive) üzerinde erişilebilir kılmak.\n4. Materyal verimliliği anketleri düzenleyerek geri bildirim toplamak ve materyal havuzunu güncellemek.",
    "note": "Tam ve detaylı bilgi YDYO Kalite El Kitabı Bölüm 7'de yer almaktadır."
  },
  {
    "code": "PB",
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
    "url": "https://www.adu.edu.tr/tr/eposta",
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
    "url": "https://perbis.adu.edu.tr/",
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
    "url": "https://www.adu.edu.tr/tr/yemek-listesi",
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

export const PHONE_DIRECTORY: PhoneDirectoryItem[] = [
  {
    "id": 1,
    "name": "ESRA BARBA",
    "role": "DESTEK HİZMETLERİ",
    "extension": "4600",
    "externalPhone": "0 256 220 4600",
    "email": "esra.barba@adu.edu.tr"
  },
  {
    "id": 2,
    "name": "ELVAN BEKER",
    "role": "DESTEK HİZMETLERİ",
    "extension": "4600",
    "externalPhone": "0 256 220 4600",
    "email": "elveda.beker@adu.edu.tr"
  },
  {
    "id": 3,
    "name": "BERTAN AKYOL",
    "role": "MÜDÜR",
    "extension": "4602",
    "externalPhone": "0 256 220 4602",
    "email": "bertan.akyol@adu.edu.tr"
  },
  {
    "id": 4,
    "name": "BERTAN AKYOL",
    "role": "MÜDÜR (IP)",
    "extension": "4603",
    "externalPhone": "0 256 220 4603",
    "email": "bertan.akyol@adu.edu.tr"
  },
  {
    "id": 5,
    "name": "HASAN ULVİ EVREN",
    "role": "MÜDÜR YARDIMCISI",
    "extension": "4604",
    "externalPhone": "0 256 220 4604",
    "email": "hasan.evren@adu.edu.tr"
  },
  {
    "id": 6,
    "name": "RIDVAN KORKUT",
    "role": "MÜDÜR YARDIMCISI",
    "extension": "4605",
    "externalPhone": "0 256 220 4605",
    "email": "ridvan.korkut@adu.edu.tr"
  },
  {
    "id": 7,
    "name": "RECEP KARASULU",
    "role": "YÜKSEKOKUL SEKRETERİ",
    "extension": "4606",
    "externalPhone": "0 256 220 4606",
    "email": "rkarasulu@adu.edu.tr"
  },
  {
    "id": 8,
    "name": "DERYA AKBULUT GÖRGÜLÜ",
    "role": "İDARİ MALİ İŞLER BİRİMİ",
    "extension": "4607",
    "externalPhone": "0 256 220 4607",
    "email": "dgorgulu@adu.edu.tr"
  },
  {
    "id": 9,
    "name": "ŞENAY KANYILMAZ",
    "role": "YAZI İŞLERİ BİRİMİ",
    "extension": "4608",
    "externalPhone": "0 256 220 4608",
    "email": "skanyilmaz@adu.edu.tr"
  },
  {
    "id": 10,
    "name": "EMRAH YAVUZ",
    "role": "ÖĞRENCİ İŞLERİ",
    "extension": "4611",
    "externalPhone": "0 256 220 4611",
    "email": "eyavuz@adu.edu.tr"
  },
  {
    "id": 11,
    "name": "ÖĞRENCİ İŞLERİ SANTRAL",
    "role": "0256-2140682-02562140683",
    "extension": "4611",
    "externalPhone": "0 256 220 4611",
    "email": null
  },
  {
    "id": 12,
    "name": "46110 256 220 4611",
    "role": "GÜVENLİK",
    "extension": "4614",
    "externalPhone": "0 256 220 4614",
    "email": null
  },
  {
    "id": 13,
    "name": "46140 256 220 4614",
    "role": "TOPLANTI SALONU",
    "extension": "4615",
    "externalPhone": "0 256 220 4615",
    "email": null
  },
  {
    "id": 14,
    "name": "SİBEL YILDIZ",
    "role": "FRANSIZCA ÖĞRETİM GÖREVLİSİ",
    "extension": "4616",
    "externalPhone": "0 256 220 4616",
    "email": "sibelkozan@adu.edu.tr"
  },
  {
    "id": 15,
    "name": "BUKET ŞAHİN",
    "role": "FRANSIZCA ÖĞRETİM GÖREVLİSİ",
    "extension": "4616",
    "externalPhone": "0 256 220 4616",
    "email": "bsahin@adu.edu.tr"
  },
  {
    "id": 16,
    "name": "SEHER ÖZDEMİR YAVUZ",
    "role": "FRANSIZCA ÖĞRETİM GÖREVLİSİ",
    "extension": "4616",
    "externalPhone": "0 256 220 4616",
    "email": "seher.ozdemir@adu.edu.tr"
  },
  {
    "id": 17,
    "name": "GÜL TECİMER",
    "role": "FRANSIZCA ÖĞRETİM GÖREVLİSİ",
    "extension": "4616",
    "externalPhone": "0 256 220 4616",
    "email": "gultecimer@adu.edu.tr"
  },
  {
    "id": 18,
    "name": "46160 256 220 4616",
    "role": "FRANSIZCA ÖĞRETİM GÖREVLİSİ",
    "extension": "4616",
    "externalPhone": "0 256 220 4616",
    "email": null
  },
  {
    "id": 19,
    "name": "SUAT TÜRKOĞLU",
    "role": "AYNİYAT BİRİMİ",
    "extension": "4621",
    "externalPhone": "0 256 220 4621",
    "email": "sturkoglu@adu.edu.tr"
  },
  {
    "id": 20,
    "name": "BEYHAN SEZER",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4624",
    "externalPhone": "0 256 220 4624",
    "email": "bsezer@adu.edu.tr"
  },
  {
    "id": 21,
    "name": "SAİM ÖZKAN",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4624",
    "externalPhone": "0 256 220 4624",
    "email": "saim.ozkan@adu.edu.tr"
  },
  {
    "id": 22,
    "name": "MEHMET NİYAZİ YAĞMUR",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4625",
    "externalPhone": "0 256 220 4625",
    "email": "mnyagmur@adu.edu.tr"
  },
  {
    "id": 23,
    "name": "CANAY KARCI AKTAŞ",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4625",
    "externalPhone": "0 256 220 4625",
    "email": "ckarci@adu.edu.tr"
  },
  {
    "id": 24,
    "name": "ERSİN SAMUR",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4625",
    "externalPhone": "0 256 220 4625",
    "email": "ersin.samur@adu.edu.tr"
  },
  {
    "id": 25,
    "name": "46250 256 220 4625",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4627",
    "externalPhone": "0 256 220 4627",
    "email": null
  },
  {
    "id": 26,
    "name": "MURAT MADAK",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4627",
    "externalPhone": "0 256 220 4627",
    "email": "murat.madak@adu.edu.tr"
  },
  {
    "id": 27,
    "name": "LÜTFİ SARAÇ",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4628",
    "externalPhone": "0 256 220 4628",
    "email": "lsarac@adu.edu.tr"
  },
  {
    "id": 28,
    "name": "YASİR YAREN",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4631",
    "externalPhone": "0 256 220 4631",
    "email": "yasir.yaren@adu.edu.tr"
  },
  {
    "id": 29,
    "name": "ESMA ACUN",
    "role": "İNGİLİZCE ÖĞR. GÖR.",
    "extension": "4631",
    "externalPhone": "0 256 220 4631",
    "email": "eacun@adu.edu.tr"
  },
  {
    "id": 30,
    "name": "ÖZLEM MADAK",
    "role": "İNGİLİZCE ÖĞR. GÖR.",
    "extension": "4631",
    "externalPhone": "0 256 220 4631",
    "email": "ozlem.madak@adu.edu.tr"
  },
  {
    "id": 31,
    "name": "PINAR UĞUR",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4638",
    "externalPhone": "0 256 220 4638",
    "email": "pinar.ugur@adu.edu.tr"
  },
  {
    "id": 32,
    "name": "HAYRİ ARGUNAT",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4638",
    "externalPhone": "0 256 220 4638",
    "email": "hayriargunat@adu.edu.tr"
  },
  {
    "id": 33,
    "name": "GÖKSEL TURAN",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4639",
    "externalPhone": "0 256 220 4639",
    "email": "goksel.turan@adu.edu.tr"
  },
  {
    "id": 34,
    "name": "HATİCE KURT",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4641",
    "externalPhone": "0 256 220 4641",
    "email": "hatice.kurt@adu.edu.tr"
  },
  {
    "id": 35,
    "name": "SİBEL ARABACI",
    "role": "İNGİLİZCE ÖĞR. GÖR.",
    "extension": "4641",
    "externalPhone": "0 256 220 4641",
    "email": "sibel.karasulu@adu.edu.tr"
  },
  {
    "id": 36,
    "name": "ERCAN YILMAZ",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4641",
    "externalPhone": "0 256 220 4641",
    "email": "ercan.yilmaz@adu.edu.tr"
  },
  {
    "id": 37,
    "name": "GÜLSÜN POYRAZ SOFRACI",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4645",
    "externalPhone": "0 256 220 4645",
    "email": "gulsun.poyraz@adu.edu.tr"
  },
  {
    "id": 38,
    "name": "FETHİYE EFENDİ KIR",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4645",
    "externalPhone": "0 256 220 4645",
    "email": "fethiye.efendi@adu.edu.tr"
  },
  {
    "id": 39,
    "name": "SEVİM EVREN",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4645",
    "externalPhone": "0 256 220 4645",
    "email": "sevim.top@adu.edu.tr"
  },
  {
    "id": 40,
    "name": "CANSIN ÇALIŞKAN",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4647",
    "externalPhone": "0 256 220 4647",
    "email": "cansin.caliskan@adu.edu.tr"
  },
  {
    "id": 41,
    "name": "DİLEK ATEŞ",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4647",
    "externalPhone": "0 256 220 4647",
    "email": "dilekcelik@adu.edu.tr"
  },
  {
    "id": 42,
    "name": "ÖZLEM DİLAVER",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4647",
    "externalPhone": "0 256 220 4647",
    "email": "ozlem.dilaver@adu.edu.tr"
  },
  {
    "id": 43,
    "name": "ESMA ACUN",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4649",
    "externalPhone": "0 256 220 4649",
    "email": "eacun@adu.edu.tr"
  },
  {
    "id": 44,
    "name": "SİBEL ARABACI",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4649",
    "externalPhone": "0 256 220 4649",
    "email": "sibel.karasulu@adu.edu.tr"
  },
  {
    "id": 45,
    "name": "ÖZLEM MADAK",
    "role": "İNGİLİZCE ÖĞRETİM GÖREVLİSİ",
    "extension": "4649",
    "externalPhone": "0 256 220 4649",
    "email": "ozlem.madak@adu.edu.tr"
  },
  {
    "id": 46,
    "name": "ULVİYE KARACA",
    "role": "ALMANCA BÖLÜMÜ",
    "extension": "4650",
    "externalPhone": "0 256 220 4650",
    "email": "ulviye.berak@adu.edu.tr"
  }
];

export const CPD_ACTIVITIES_DATA: ActivityItem[] = [
  {
    "id": "cpd-2026-2027-1",
    "unitId": "cpd",
    "academicYear": "2026-2027",
    "title": "Crystal-Clear Setups & Smart Feedback: Mastering ICQs, CCQs, and Peer Correction Without Killing Fluency",
    "date": "07 Mayıs 2027, Cuma (13:30 - 15:30)",
    "sortDate": "2027-05-07",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Yönerge netliği (ICQ/CCQ), kontrol listeleri ile süreç odaklı akran geri bildirimi ve akıcılığı bozmadan hata düzeltme teknikleri.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "upcoming",
    "organizer": "CPD Birimi & Yayınevi İş Birliği",
    "trainers": "CPD Birimi & Yayınevi İş Birliği",
    "location": "YDYO Seminer Salonu",
    "driveDocTitle": "2026-27 Akademik Yılı Workshop Programı.pdf",
    "driveDocUrl": "docs/2026-27 Akademik Yılı Workshop Programı.pdf",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2026-27",
      "2026-2027_Planli-Workshop-Programi"
    ]
  },
  {
    "id": "cpd-2026-2027-2",
    "unitId": "cpd",
    "academicYear": "2026-2027",
    "title": "Activating the Quiet Classroom: Task-Based Learning (TBL) & Dynamic Pair/Group Rotations",
    "date": "26 Mart 2027, Cuma (13:30 - 15:30)",
    "sortDate": "2027-03-26",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Çekingen öğrencileri aktifleştirme, görev temelli öğrenme (TBL) ve dinamik grup/eşli çalışma kurgusu.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "upcoming",
    "organizer": "CPD Birimi & Yayınevi İş Birliği",
    "trainers": "CPD Birimi & Yayınevi İş Birliği",
    "location": "YDYO Seminer Salonu",
    "driveDocTitle": "2026-27 Akademik Yılı Workshop Programı.pdf",
    "driveDocUrl": "docs/2026-27 Akademik Yılı Workshop Programı.pdf",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2026-27",
      "2026-2027_Planli-Workshop-Programi"
    ]
  },
  {
    "id": "cpd-2026-2027-3",
    "unitId": "cpd",
    "academicYear": "2026-2027",
    "title": "Smart & Instant Feedback: Automated Feedback Tools for Writing & Speaking",
    "date": "26 Şubat 2027, Cuma (13:30 - 15:30)",
    "sortDate": "2027-02-26",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Yapay zekâ destekli otomatik geri bildirim araçları ile yazma ve konuşma becerilerinde anında kişiselleştirilmiş dönüt uygulamaları.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "upcoming",
    "organizer": "CPD Birimi & Yayınevi İş Birliği",
    "trainers": "CPD Birimi & Yayınevi İş Birliği",
    "location": "YDYO Seminer Salonu",
    "driveDocTitle": "2026-27 Akademik Yılı Workshop Programı.pdf",
    "driveDocUrl": "docs/2026-27 Akademik Yılı Workshop Programı.pdf",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2026-27",
      "2026-2027_Planli-Workshop-Programi"
    ]
  },
  {
    "id": "cpd-2026-2027-4",
    "unitId": "cpd",
    "academicYear": "2026-2027",
    "title": "From Passive Screens to Active Minds: Designing Interactive Language Tasks with AI, H5P, and Canva",
    "date": "11 Aralık 2026, Cuma (13:30 - 15:30)",
    "sortDate": "2026-12-11",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Yapay zekâ ve etkileşimli dijital araçlarla (AI, H5P, Canva) öğrenci merkezli materyal tasarımı.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "upcoming",
    "organizer": "CPD Birimi & Yayınevi İş Birliği",
    "trainers": "CPD Birimi & Yayınevi İş Birliği",
    "location": "YDYO Seminer Salonu",
    "driveDocTitle": "2026-27 Akademik Yılı Workshop Programı.pdf",
    "driveDocUrl": "docs/2026-27 Akademik Yılı Workshop Programı.pdf",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2026-27",
      "2026-2027_Planli-Workshop-Programi"
    ]
  },
  {
    "id": "cpd-2026-2027-5",
    "unitId": "cpd",
    "academicYear": "2026-2027",
    "title": "Madde Analizi: Sınavdan Kanıta – Bir Kez Kullanılan Sınavlarda Madde Analizi ve MUSE ile Uygulama",
    "date": "6 Kasım 2026",
    "sortDate": "2026-11-06",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Güçlük indeksi (p), ayırt edicilik indeksi (D) ve nokta çift serili korelasyon (r_pb) kavramları ile MUSE üzerinden madde analizi uygulaması.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "Öğr. Gör. Dr. Mehmet Abi (MSKÜ YDYO)",
    "trainers": "Öğr. Gör. Dr. Mehmet Abi (MSKÜ YDYO)",
    "location": "YDYO Üst Kat Seminer Salonu",
    "driveDocTitle": "Madde Analizi Kurumsal Etkinlik Raporu (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2026-27",
      "2026-11-06_Madde-Analizi-Sinavdan-Kanita-MUSE"
    ]
  },
  {
    "id": "cpd-2026-2027-6",
    "unitId": "cpd",
    "academicYear": "2026-2027",
    "title": "Kalite Güvencesi Ders Gözlemi ve Birimsel Veri Toplama Hizalama Eğitimi",
    "date": "19 Ekim 2026 (19:30 - 21:00)",
    "sortDate": "2026-10-19",
    "category": "Hizmet İçi Eğitim",
    "scope": "Kurum İçi",
    "summary": "Kalite güvencesi ders gözlemi süreçleri ve birimsel veri toplama standartlarının hizalanmasına yönelik 1,5 saatlik çevrimiçi eğitim.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "Kübra Cengiz",
    "trainers": "Kübra Cengiz",
    "location": "Çevrimiçi (Online)",
    "driveDocTitle": "Kurumsal Eğitim Raporu (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2026-27",
      "2026-10-19_Kalite-Guvencesi-Ders-Gozlemi-ve-Veri-Toplama"
    ]
  },
  {
    "id": "cpd-2025-2026-7",
    "unitId": "cpd",
    "academicYear": "2025-2026",
    "title": "MSKÜ YDYO — Language and Fun Day",
    "date": "9 Haziran 2026",
    "sortDate": "2026-06-09",
    "category": "Konferans / Sempozyum",
    "scope": "Kurum Dışı",
    "summary": "Muğla Sıtkı Koçman Üniversitesi YDYO ev sahipliğinde düzenlenen Language and Fun Day etkinliğine kurum dışı katılım.",
    "targetAudience": "Öğr. Gör. Dilek Ateş, Öğr. Gör. M. Burak Okşar, Öğr. Gör. Rıdvan Korkut, Öğr. Gör. Bilge Sevim Soykut, Öğr. Gör. Hatice Kurt, Öğr. Gör. Hayri Argunat, Öğr. Gör. İrem Gül Okşar",
    "status": "completed",
    "organizer": "MSKÜ YDYO",
    "trainers": "MSKÜ YDYO",
    "participantCount": 7,
    "participants": "Öğr. Gör. Dilek Ateş, Öğr. Gör. M. Burak Okşar, Öğr. Gör. Rıdvan Korkut, Öğr. Gör. Bilge Sevim Soykut, Öğr. Gör. Hatice Kurt, Öğr. Gör. Hayri Argunat, Öğr. Gör. İrem Gül Okşar",
    "location": "Muğla Sıtkı Koçman Üniversitesi YDYO",
    "driveDocTitle": "Bireysel Katılım Raporları (7 kişi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2025-26",
      "2026-06-09_MSKU-YDYO-Language-and-Fun-Day"
    ]
  },
  {
    "id": "cpd-2025-2026-8",
    "unitId": "cpd",
    "academicYear": "2025-2026",
    "title": "18. Türkiye YDYO Yöneticiler Toplantısı",
    "date": "7–8 Mayıs 2026",
    "sortDate": "2026-05-07",
    "category": "Toplantı",
    "scope": "Kurum Dışı",
    "summary": "18. Türkiye Yabancı Diller Yüksekokulları Yöneticiler Toplantısı katılımı ve değerlendirme raporları.",
    "targetAudience": "Öğr. Gör. Dr. Hasan Ulvi Evren, Öğr. Gör. Rıdvan Korkut",
    "status": "completed",
    "organizer": "Akdeniz Üniversitesi YDYO (Ev Sahibi)",
    "trainers": "Akdeniz Üniversitesi YDYO (Ev Sahibi)",
    "participantCount": 2,
    "participants": "Öğr. Gör. Dr. Hasan Ulvi Evren, Öğr. Gör. Rıdvan Korkut",
    "location": "Akdeniz Üniversitesi / Antalya",
    "driveDocTitle": "Bireysel Katılım Raporları (2 kişi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2025-26",
      "2026-05-01_18-YDYO-Yoneticiler-Toplantisi"
    ]
  },
  {
    "id": "cpd-2025-2026-9",
    "unitId": "cpd",
    "academicYear": "2025-2026",
    "title": "Empowering Teachers for Classroom Impact",
    "date": "24 Nisan 2026",
    "sortDate": "2026-04-24",
    "category": "Seminer",
    "scope": "Kurum Dışı",
    "summary": "Muğla Sıtkı Koçman Üniversitesi YDYO tarafından düzenlenen öğretmen etkinliğini ve sınıf içi etkiyi artırmaya yönelik seminer.",
    "targetAudience": "Öğr. Gör. Bilge Sevim Soykut, Öğr. Gör. Dilek Ateş, Öğr. Gör. Hatice Kurt, Öğr. Gör. Rıdvan Korkut",
    "status": "completed",
    "organizer": "Prof. Dr. Şevki Kömür, Sena Akyol",
    "trainers": "Prof. Dr. Şevki Kömür, Sena Akyol",
    "participantCount": 4,
    "participants": "Öğr. Gör. Bilge Sevim Soykut, Öğr. Gör. Dilek Ateş, Öğr. Gör. Hatice Kurt, Öğr. Gör. Rıdvan Korkut",
    "location": "Muğla Sıtkı Koçman Üniversitesi (AKM)",
    "driveDocTitle": "Bireysel Katılım Raporları (4 kişi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2025-26",
      "2026-04-24_Empowering-Teachers-for-Classroom-Impact-Mugla"
    ]
  },
  {
    "id": "cpd-2025-2026-10",
    "unitId": "cpd",
    "academicYear": "2025-2026",
    "title": "UES UNIFEST 2026 – Future Fluent",
    "date": "17–19 Nisan 2026",
    "sortDate": "2026-04-17",
    "category": "Konferans / Sempozyum",
    "scope": "Kurum Dışı",
    "summary": "UES (Unlimited Educational Services) tarafından Antalya’da düzenlenen Future Fluent eğitim konferansı katılımı.",
    "targetAudience": "Öğr. Gör. Dr. Hasan Ulvi Evren, Öğr. Gör. Rıdvan Korkut",
    "status": "completed",
    "organizer": "Dr. Lou McLaughlin, Jamie Keddie (UES)",
    "trainers": "Dr. Lou McLaughlin, Jamie Keddie (UES)",
    "participantCount": 2,
    "participants": "Öğr. Gör. Dr. Hasan Ulvi Evren, Öğr. Gör. Rıdvan Korkut",
    "location": "Titanic Lara Hotel / Antalya",
    "driveDocTitle": "Bireysel Katılım Raporları (2 kişi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2025-26",
      "2026-05-15_Unifest-2026"
    ]
  },
  {
    "id": "cpd-2025-2026-11",
    "unitId": "cpd",
    "academicYear": "2025-2026",
    "title": "Öğrenci Özerkliği Nasıl Sağlanır? (Learner Autonomy: What, Why and How)",
    "date": "Nisan 2026",
    "sortDate": "2026-04-01",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Ters yüz öğrenme (flipped learning), ders dışı dijital materyaller ve yapay zekâ araçlarıyla öğrenci özerkliği kazandırma atölyesi.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "CPD Birimi",
    "trainers": "CPD Birimi",
    "location": "YDYO Seminer Salonu",
    "driveDocTitle": "Workshop 4 Etkinlik Raporu & Sunum (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2025-26",
      "2026-04-01_Ogrenci-Ozerkligi-Nasil-Saglanir"
    ]
  },
  {
    "id": "cpd-2025-2026-12",
    "unitId": "cpd",
    "academicYear": "2025-2026",
    "title": "Sınıf Yönetimi Sanatı (The Craft of Classroom Management)",
    "date": "27 Şubat 2026",
    "sortDate": "2026-02-27",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Öğrenci öğrenme profilleri ve sınıf içi işbirliğini teşvik eden etkili sınıf yönetimi stratejileri atölyesi.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "CPD Birimi",
    "trainers": "CPD Birimi",
    "location": "YDYO Seminer Salonu",
    "driveDocTitle": "Workshop 3 Etkinlik Raporu, Sunum & Test (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2025-26",
      "2026-02-27_Sinif-Yonetimi-Sanati-Classroom-Management"
    ]
  },
  {
    "id": "cpd-2025-2026-13",
    "unitId": "cpd",
    "academicYear": "2025-2026",
    "title": "Etkili Ders Planlama (Lesson Planning)",
    "date": "26 Aralık 2025",
    "sortDate": "2025-12-26",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Müfredat gerekliliklerini sınıf dinamikleriyle uyumlu hale getirme, hedef belirleme, zaman yönetimi ve ders akışı tasarımı.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "Duygu Özler (Teacher Trainer)",
    "trainers": "Duygu Özler (Teacher Trainer)",
    "location": "YDYO Seminer Salonu",
    "driveDocTitle": "Kurumsal Eğitim Raporu 2 (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2025-26",
      "2025-12-26_Etkili-Ders-Planlama-Lesson-Planning"
    ]
  },
  {
    "id": "cpd-2025-2026-14",
    "unitId": "cpd",
    "academicYear": "2025-2026",
    "title": "Öğrenci Konuşma Süresinin Artırılması (Increasing Student Talking Time)",
    "date": "31 Ekim 2025",
    "sortDate": "2025-10-31",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Bekleme süresi (wait time) ve öğretmen rollerinin dengelenmesi yoluyla sınıf içi öğrenci konuşma süresini artırma uygulamaları.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "CPD Birimi",
    "trainers": "CPD Birimi",
    "location": "YDYO Seminer Salonu",
    "driveDocTitle": "Workshop 1 Raporu, Sunum & Fotoğraflar (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2025-26",
      "2025-10-31_Ogrenci-Konusma-Suresinin-Artirilmasi"
    ]
  },
  {
    "id": "cpd-2025-2026-15",
    "unitId": "cpd",
    "academicYear": "2025-2026",
    "title": "2025–2026 Akademik Yılı Pacing Tablosu Formatına İlişkin Pratik Kullanım Önerileri",
    "date": "10 Ekim 2025",
    "sortDate": "2025-10-10",
    "category": "Hizmet İçi Eğitim",
    "scope": "Kurum İçi",
    "summary": "Yeni pacing formatı, öğrenme/performans temelli eğitim yaklaşımı ve haftalık hedeflerin paylaşımına yönelik kurum içi bilgilendirme oturumu.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "Öğr. Gör. Bilge Sevim Soykut, Öğr. Gör. Dilek Ateş",
    "trainers": "Öğr. Gör. Bilge Sevim Soykut, Öğr. Gör. Dilek Ateş",
    "participants": "Tüm akademik personel",
    "location": "YDYO Seminer Salonu",
    "driveDocTitle": "Kurum İçi Eğitim Raporu (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2025-26",
      "2025-10-10_Yeni-Pacing-Formati-Kullanim-Onerileri"
    ]
  },
  {
    "id": "cpd-2024-2025-16",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "Ders Hedeflerine Uygun Materyal Uyarlama (SARSing for Effective Learning Objectives)",
    "date": "17 Haziran 2025 (13:30 - 15:30)",
    "sortDate": "2025-06-17",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "SMART(A) kriterleri ve Yenilenmiş Bloom Taksonomisi temelinde SARS yöntemiyle materyal uyarlama ve öğrenme hedefleriyle hizalama atölyesi.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "UES & CPD Birimi İş Birliği",
    "trainers": "UES & CPD Birimi İş Birliği",
    "participantCount": 31,
    "location": "YDYO Seminer Salonu",
    "driveDocTitle": "Kurumsal Rapor & 31 Katılım Sertifikası (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2025-06-17_SARSing-for-Effective-Learning-Objectives"
    ]
  },
  {
    "id": "cpd-2024-2025-17",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "Future-ready ELT: Differentiation and sustainability in English, German and French programs",
    "date": "2–3 Mayıs 2025",
    "sortDate": "2025-05-02",
    "category": "Konferans / Sempozyum",
    "scope": "Kurum Dışı",
    "summary": "Farklılaştırılmış öğretim uygulamaları, arabuluculuk (mediation) becerisi ve sürdürülebilir dil eğitimi üzerine Uludağ Üniversitesi’nde düzenlenen sempozyum.",
    "targetAudience": "Öğr. Gör. Özlem Madak",
    "status": "completed",
    "organizer": "Prof. Dr. Ayşegül Amanda Yeşilbursa, Lutka Kotarska, Prof. Dr. Esin Çağlayan",
    "trainers": "Prof. Dr. Ayşegül Amanda Yeşilbursa, Lutka Kotarska, Prof. Dr. Esin Çağlayan",
    "participantCount": 1,
    "participants": "Öğr. Gör. Özlem Madak",
    "location": "Uludağ Üniversitesi Merkez Kampüs / Bursa",
    "driveDocTitle": "Bireysel Katılım Raporu (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2025-05-02_Future-Ready-ELT-Uludag-Uni"
    ]
  },
  {
    "id": "cpd-2024-2025-18",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "Bridging Ideas, Building Solutions (UES Eğitim Hizmetleri)",
    "date": "25–27 Nisan 2025",
    "sortDate": "2025-04-25",
    "category": "Konferans / Sempozyum",
    "scope": "Kurum Dışı",
    "summary": "Yabancı dil öğretiminde yeni yaklaşımlar ve kurumsal çözümler üzerine Antalya’da düzenlenen kurum dışı eğitim konferansı.",
    "targetAudience": "Öğr. Gör. Hasan Ulvi Evren, Öğr. Gör. Rıdvan Korkut",
    "status": "completed",
    "organizer": "UES Eğitim Hizmetleri",
    "trainers": "UES Eğitim Hizmetleri",
    "participantCount": 2,
    "participants": "Öğr. Gör. Hasan Ulvi Evren, Öğr. Gör. Rıdvan Korkut",
    "location": "Belek / Antalya",
    "driveDocTitle": "Bireysel Katılım Raporları (2 kişi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2025-04-25_Bridging-Ideas-Building-Solutions-Antalya"
    ]
  },
  {
    "id": "cpd-2024-2025-19",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "Yapay Zekâ Tabanlı Dil Öğretimi ve Etkinlik Tasarımı Deneyimleri (Sharing Session)",
    "date": "10 Nisan 2025",
    "sortDate": "2025-04-10",
    "category": "Seminer",
    "scope": "Kurum İçi",
    "summary": "Kurum dışı eğitimlere katılan öğretim elemanlarımızın müfredat, sınıf yönetimi, AI liderliği ve etkinlik tasarımı deneyimlerini paylaştığı çevrimiçi oturum.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "Öğr. Gör. Dilek Ateş, Öğr. Gör. Lütfi Saraç, Öğr. Gör. Bilge Sevim Soykut",
    "trainers": "Öğr. Gör. Dilek Ateş, Öğr. Gör. Lütfi Saraç, Öğr. Gör. Bilge Sevim Soykut",
    "location": "Çevrimiçi (Zoom)",
    "driveDocTitle": "Kurumsal Etkinlik Raporu TR/EN (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2025-04-10_AI-Based-Language-Teaching-Sharing-Session"
    ]
  },
  {
    "id": "cpd-2024-2025-20",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "Leadership in the AI Era – Practical & Transformative Tools for Administrative Teams",
    "date": "21–22 Mart 2025",
    "sortDate": "2025-03-21",
    "category": "Seminer",
    "scope": "Kurum Dışı",
    "summary": "İzmir Ekonomi Üniversitesi ve Macmillan iş birliğinde düzenlenen yöneticiler için yapay zekâ araçları eğitimi.",
    "targetAudience": "Öğr. Gör. Bilge Sevim Soykut",
    "status": "completed",
    "organizer": "Koray Tunç (FSMVÜ YDYO Müdürü)",
    "trainers": "Koray Tunç (FSMVÜ YDYO Müdürü)",
    "participantCount": 1,
    "participants": "Öğr. Gör. Bilge Sevim Soykut",
    "location": "İzmir Ekonomi Üniversitesi / İzmir",
    "driveDocTitle": "Katılım Raporu & Sunum (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2025-03-21_Leadership-in-the-AI-Era-Izmir"
    ]
  },
  {
    "id": "cpd-2024-2025-21",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "Sınav Hazırlamada ve Yazma Becerisinin Değerlendirilmesinde Yapay Zekâ Kullanımı (Use of AI for Exam Prep & Writing Assessment)",
    "date": "21 Mart 2025",
    "sortDate": "2025-03-21",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Sınav hazırlama, rubrik oluşturma ve EssayGrader vb. yapay zekâ araçlarıyla paragraf/makale değerlendirme uygulamalı atölyesi.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "Prof. Dr. Ahmet Başal (Yıldız Teknik Üniversitesi)",
    "trainers": "Prof. Dr. Ahmet Başal (Yıldız Teknik Üniversitesi)",
    "participantCount": 31,
    "location": "YDYO Alt Kat Toplantı Salonu",
    "driveDocTitle": "Kurumsal Rapor & 31 Katılım Sertifikası (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2025-03-21_Use-of-AI-for-Exam-Preparation-and-Writing-Assessment"
    ]
  },
  {
    "id": "cpd-2024-2025-22",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "Designing Framework for Language Learning",
    "date": "19–21 Mart 2025",
    "sortDate": "2025-03-19",
    "category": "Seminer",
    "scope": "Kurum Dışı",
    "summary": "Dil öğrenimi için müfredat çerçevesi ve ders planlama stratejileri üzerine İstanbul’da düzenlenen kurum dışı eğitim.",
    "targetAudience": "Öğr. Gör. Lütfi Saraç",
    "status": "completed",
    "organizer": "Gordion Academy – UES",
    "trainers": "Gordion Academy – UES",
    "participantCount": 1,
    "participants": "Öğr. Gör. Lütfi Saraç",
    "location": "İstinye Üniversitesi / İstanbul",
    "driveDocTitle": "Bireysel Katılım Raporu & Sunum (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2025-03-19_Designing-Framework-for-Language-Learning-Istanbul"
    ]
  },
  {
    "id": "cpd-2024-2025-23",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "Looking for Evidence of Learning & Cultivating Connections: Social Emotional Classroom Management",
    "date": "1 Mart 2025",
    "sortDate": "2025-03-01",
    "category": "Seminer",
    "scope": "Kurum Dışı",
    "summary": "Öğrenme kanıtlarının izlenmesi ve sosyal-duygusal sınıf yönetimi üzerine İzmir’de düzenlenen seminer.",
    "targetAudience": "Öğr. Gör. Lütfi Saraç",
    "status": "completed",
    "organizer": "Sürekli Mesleki Gelişim Birimi (CPD)",
    "participantCount": 1,
    "participants": "Öğr. Gör. Lütfi Saraç",
    "location": "İzmir Türk Koleji / İzmir",
    "driveDocTitle": "Bireysel Katılım Raporu (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2025-03-01_Looking-for-Evidence-of-Learning-Izmir"
    ]
  },
  {
    "id": "cpd-2024-2025-24",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "Biçimlendirici Değerlendirme ve Sonuç Odaklı Değerlendirme (Formative & Summative Assessment)",
    "date": "28 Şubat 2025 (13:30 - 16:00)",
    "sortDate": "2025-02-28",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Kaliteli eğitim için biçimlendirici (formative) ve sonuç odaklı (summative) ölçme-değerlendirme yöntemlerinin karşılaştırmalı analizi.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "CPD Birimi",
    "trainers": "CPD Birimi",
    "participantCount": 31,
    "location": "YDYO Seminer Salonu",
    "driveDocTitle": "Kurumsal Rapor & 31 Katılım Sertifikası (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2025-02-28_Formative-and-Summative-Assessment"
    ]
  },
  {
    "id": "cpd-2024-2025-25",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "Syllabus Design in Practice (Oxford University Press)",
    "date": "22 Şubat 2025",
    "sortDate": "2025-02-22",
    "category": "Seminer",
    "scope": "Kurum Dışı",
    "summary": "Yaşar Üniversitesi ev sahipliğinde Oxford University Press tarafından düzenlenen uygulamalı izlence (syllabus) tasarımı eğitimi.",
    "targetAudience": "Öğr. Gör. Bilge Sevim Soykut, Öğr. Gör. Rıdvan Korkut, Öğr. Gör. Lütfi Saraç",
    "status": "completed",
    "organizer": "Oxford University Press",
    "trainers": "Oxford University Press",
    "participantCount": 3,
    "participants": "Öğr. Gör. Bilge Sevim Soykut, Öğr. Gör. Rıdvan Korkut, Öğr. Gör. Lütfi Saraç",
    "location": "Yaşar Üniversitesi / İzmir",
    "driveDocTitle": "Bireysel Katılım Raporları (3 kişi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2025-02-22_Syllabus-Design-in-Practice-Izmir"
    ]
  },
  {
    "id": "cpd-2024-2025-26",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "Ölçme ve Değerlendirmede Madde Analizi (Language Assessment and Item Analysis in Exams)",
    "date": "24 Ocak 2025 (13:30 - 15:30)",
    "sortDate": "2025-01-24",
    "category": "Seminer",
    "scope": "Kurum İçi",
    "summary": "Geçerlik, güvenirlik, kullanışlılık kavramları ve Excel üzerinden sınav madde analizi hesaplama uygulamalı çevrimiçi semineri.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "CPD Birimi",
    "trainers": "CPD Birimi",
    "participantCount": 31,
    "location": "Çevrimiçi (Online)",
    "driveDocTitle": "Kurumsal Rapor & 31 Katılım Sertifikası (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2025-01-24_Dil-Degerlendirme-ve-Madde-Analizi"
    ]
  },
  {
    "id": "cpd-2024-2025-27",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "15. Uluslararası Eğitimde Yeni Yönelimler Kongresi – Eğitimde Yapay Zekâ",
    "date": "13–15 Aralık 2024",
    "sortDate": "2024-12-13",
    "category": "Konferans / Sempozyum",
    "scope": "Kurum Dışı",
    "summary": "Eğitimde yapay zekâ uygulamalarının ele alındığı uluslararası kongre katılımı.",
    "targetAudience": "Öğr. Gör. Lütfi Saraç",
    "status": "completed",
    "organizer": "Aydın Adnan Menderes Üniversitesi",
    "trainers": "Aydın Adnan Menderes Üniversitesi",
    "participantCount": 1,
    "participants": "Öğr. Gör. Lütfi Saraç",
    "location": "ADÜ Eğitim Fakültesi / Aydın",
    "driveDocTitle": "Bireysel Katılım Raporu (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2024-12-13_15-Uluslararasi-Egitimde-Yeni-Yonelimler-Kongresi"
    ]
  },
  {
    "id": "cpd-2024-2025-28",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "Etkili Program Tasarımı (Effective Program Design / CEFR Literacy & Mapping)",
    "date": "6 Aralık 2024",
    "sortDate": "2024-12-06",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "CEFR okuryazarlığı, program haritalama ve etkili program tasarımı üzerine düzenlenen kurum içi hizmet içi eğitim ve 30 sertifikalı atölye.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "Dr. Öğr. Üyesi Esin Çağlayan (İzmir Ekonomi Üniversitesi)",
    "trainers": "Dr. Öğr. Üyesi Esin Çağlayan (İzmir Ekonomi Üniversitesi)",
    "participantCount": 30,
    "location": "YDYO Üst Kat Seminer Salonu",
    "driveDocTitle": "CEFR Literacy and Mapping Seminer Raporu & 30 Sertifika (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2024-12-06_Etkili-Program-Tasarimi-CEFR-Mapping"
    ]
  },
  {
    "id": "cpd-2024-2025-29",
    "unitId": "cpd",
    "academicYear": "2024-2025",
    "title": "3rd Symposium of Schools of Foreign Languages in the Aegean Region",
    "date": "22 Kasım 2024",
    "sortDate": "2024-11-22",
    "category": "Konferans / Sempozyum",
    "scope": "Kurum Dışı",
    "summary": "Ege Bölgesi Yabancı Diller Yüksekokulları 3. Sempozyumu katılımı ve kurumsal paylaşım raporları.",
    "targetAudience": "Öğr. Gör. Cansın Çalışkan, Öğr. Gör. Dilek Ateş, Öğr. Gör. Rıdvan Korkut, Öğr. Gör. Bilge Sevim Soykut, Öğr. Gör. Hatice Kurt, Öğr. Gör. Özlem Dilaver",
    "status": "completed",
    "organizer": "Yaşar Üniversitesi YDYO",
    "trainers": "Yaşar Üniversitesi YDYO",
    "participantCount": 6,
    "participants": "Öğr. Gör. Cansın Çalışkan, Öğr. Gör. Dilek Ateş, Öğr. Gör. Rıdvan Korkut, Öğr. Gör. Bilge Sevim Soykut, Öğr. Gör. Hatice Kurt, Öğr. Gör. Özlem Dilaver",
    "location": "Yaşar Üniversitesi YDYO / İzmir",
    "driveDocTitle": "Bireysel Katılım Raporları (6 kişi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2024-25",
      "2024-11-22_3rd-Aegean-SoFL-Symposium-Yasar-Uni"
    ]
  },
  {
    "id": "cpd-2023-2024-30",
    "unitId": "cpd",
    "academicYear": "2023-2024",
    "title": "Atölye 5: Ders Gözlemi Eğitimi ve Mesleki Öğrenme Toplulukları",
    "date": "11 Haziran 2024",
    "sortDate": "2024-06-11",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Gözlem türleri, Johari Penceresi modeli, gözlem öncesi/sonrası görüşme stratejileri ve mesleki öğrenme toplulukları eğitimi.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "Prof. Dr. Pınar Yengin Sarpkaya",
    "trainers": "Prof. Dr. Pınar Yengin Sarpkaya",
    "location": "ADÜ YDYO Binası",
    "driveDocTitle": "Kurumsal Etkinlik Raporu & Gözlem Materyalleri (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2023-24",
      "2024-06-11_Ders-Gozlemi-ve-Mesleki-Ogrenme-Topluluklari"
    ]
  },
  {
    "id": "cpd-2023-2024-31",
    "unitId": "cpd",
    "academicYear": "2023-2024",
    "title": "Atölye 4: Yabancı Dil Öğretiminde Teknoloji ve Yapay Zekâ Kullanımı",
    "date": "24 Mayıs 2024",
    "sortDate": "2024-05-24",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Yabancı dil öğretiminde teknoloji ve yapay zekâ entegrasyonuna yönelik kurum içi 4. atölye çalışması.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "CPD Birimi",
    "trainers": "CPD Birimi",
    "location": "ADÜ YDYO Binası",
    "driveDocTitle": "Kurumsal Etkinlik Raporu (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2023-24",
      "2024-05-24_Yabanci-Dil-Ogretiminde-Teknoloji-ve-Yapay-Zeka"
    ]
  },
  {
    "id": "cpd-2023-2024-32",
    "unitId": "cpd",
    "academicYear": "2023-2024",
    "title": "FOCI XXV — Choosing Between In-house & Published Materials",
    "date": "17–18 Mayıs 2024",
    "sortDate": "2024-05-17",
    "category": "Konferans / Sempozyum",
    "scope": "Kurum İçi",
    "summary": "Yüksekokulumuzun ev sahipliğinde gerçekleşen 25. Forum on Curricular Issues (FOCI) etkinliği.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "FOCI & Sabancı Üniversitesi YDO",
    "trainers": "FOCI & Sabancı Üniversitesi YDO",
    "participantCount": 40,
    "participants": "ADÜ YDYO Ev Sahipliği (Lütfi Saraç, Özlem Madak ve tüm davetliler)",
    "location": "ADÜ YDYO (Ev Sahibi Kurum)",
    "driveDocTitle": "Program PDF, Davet Mektupları, Katılımcı Listeleri & Fotoğraflar (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2023-24",
      "2024-05-17_FOCI-XXV-ADU-YDYO"
    ]
  },
  {
    "id": "cpd-2023-2024-33",
    "unitId": "cpd",
    "academicYear": "2023-2024",
    "title": "Defining Institutional Effectiveness: Agility & Adaptability",
    "date": "9–12 Mayıs 2024",
    "sortDate": "2024-05-09",
    "category": "Konferans / Sempozyum",
    "scope": "Kurum Dışı",
    "summary": "Macmillan Education ve NILE iş birliğiyle Kuzey Kıbrıs’ta düzenlenen kurumsal etkililik konferansı.",
    "targetAudience": "Öğr. Gör. Hasan Ulvi Evren",
    "status": "completed",
    "organizer": "Macmillan Education & NILE",
    "trainers": "Macmillan Education & NILE",
    "participantCount": 1,
    "participants": "Öğr. Gör. Hasan Ulvi Evren",
    "location": "Arkın İskele Hotel / KKTC",
    "driveDocTitle": "Bireysel Katılım Raporu (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2023-24",
      "2024-05-09_Defining-Institutional-Effectiveness-KKTC"
    ]
  },
  {
    "id": "cpd-2023-2024-34",
    "unitId": "cpd",
    "academicYear": "2023-2024",
    "title": "Atölye 3: Yabancı Dil Öğretiminde Yapay Zekâ Kullanımı",
    "date": "3 Mayıs 2024",
    "sortDate": "2024-05-03",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Komut mühendisliği (prompt engineering), Copilot/ChatGPT canlı uygulamaları ve dil öğretiminde yapay zekâ etiği semineri.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "Emir Aydın (Teacher Trainer – UES)",
    "trainers": "Emir Aydın (Teacher Trainer – UES)",
    "location": "ADÜ YDYO Binası",
    "driveDocTitle": "Kurumsal Etkinlik Raporu & 4 PDF Sunum/Şablon (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2023-24",
      "2024-05-03_Yabanci-Dil-Ogretiminde-Yapay-Zeka-Kullanimi"
    ]
  },
  {
    "id": "cpd-2023-2024-35",
    "unitId": "cpd",
    "academicYear": "2023-2024",
    "title": "Ders Gözlemi Aşamaları ve Süreç Takvimi Bilgilendirme Toplantısı",
    "date": "22 Mart 2024",
    "sortDate": "2024-03-22",
    "category": "Toplantı",
    "scope": "Kurum İçi",
    "summary": "Öz değerlendirme, eşli gözlem, PD birimi gözlemi ve yönetimsel gözlem aşamalarının tanıtıldığı bilgilendirme toplantısı.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "YDYO Yönetimi & CPD Birimi",
    "trainers": "YDYO Yönetimi & CPD Birimi",
    "participants": "Müdür yardımcıları ve tüm öğretim elemanları",
    "location": "YDYO Alt Kat Toplantı Salonu",
    "driveDocTitle": "Kurumsal Toplantı Raporu (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2023-24",
      "2024-03-22_Ders-Gozlemi-Bilgilendirme-Toplantisi"
    ]
  },
  {
    "id": "cpd-2023-2024-36",
    "unitId": "cpd",
    "academicYear": "2023-2024",
    "title": "Sınıfta Yapay Zekâ ve Socrative Kullanımı (Meslektaş Paylaşımı)",
    "date": "6 Mart 2024",
    "sortDate": "2024-03-06",
    "category": "Hizmet İçi Eğitim",
    "scope": "Kurum İçi",
    "summary": "Kurum içi meslektaş eğitimi kapsamında dil öğretiminde yapay zekâ uygulamaları ve Socrative ile canlı değerlendirme oturumu.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "Öğr. Gör. Bilge Sevim Soykut, Öğr. Gör. Ercan Yılmaz (Moderatör: Öğr. Gör. Pınar Uğur)",
    "trainers": "Öğr. Gör. Bilge Sevim Soykut, Öğr. Gör. Ercan Yılmaz (Moderatör: Öğr. Gör. Pınar Uğur)",
    "location": "Çevrimiçi (Online)",
    "driveDocTitle": "Kurumsal Rapor, Video Kayıtları & Görseller (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2023-24",
      "2024-03-06_Sinifta-Yapay-Zeka-ve-Socrative-Kullanimi"
    ]
  },
  {
    "id": "cpd-2023-2024-37",
    "unitId": "cpd",
    "academicYear": "2023-2024",
    "title": "Akran Gözlemi ve Geri Bildirim Sanatı (Peer Observation and the Art of Giving Feedback)",
    "date": "1 Mart 2024",
    "sortDate": "2024-03-01",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Akran gözlemi döngüsü ve yapıcı geri bildirim verme teknikleri üzerine UES & ADÜ YDYO PD Birimi ortak atölyesi.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "Duygu Erdoğan (UES)",
    "trainers": "Duygu Erdoğan (UES)",
    "location": "ADÜ YDYO Binası",
    "driveDocTitle": "Kurumsal Rapor, Sunumlar, Formlar & Örnek Videolar (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2023-24",
      "2024-03-01_Akran-Gozlemi-ve-Geri-Bildirim-Sanati"
    ]
  },
  {
    "id": "cpd-2023-2024-38",
    "unitId": "cpd",
    "academicYear": "2023-2024",
    "title": "(Re)Defining Institutional Effectiveness: AI in the Classroom",
    "date": "23–24 Şubat 2024",
    "sortDate": "2024-02-23",
    "category": "Seminer",
    "scope": "Kurum Dışı",
    "summary": "Büyük dil modelleri (LLM) ile ders planı hazırlama, TPACK oyunu ve yapay zekâ araçları üzerine Ankara’da düzenlenen eğitim.",
    "targetAudience": "Öğr. Gör. Bilge Sevim Soykut",
    "status": "completed",
    "organizer": "Macmillan Education / NILE / Eaquals / UES",
    "trainers": "Macmillan Education / NILE / Eaquals / UES",
    "participantCount": 1,
    "participants": "Öğr. Gör. Bilge Sevim Soykut",
    "location": "Sheraton Hotel / Ankara",
    "driveDocTitle": "Bireysel Katılım Raporu & 6 Eğitim Dokümanı (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2023-24",
      "2024-02-23_AI-in-the-Classroom-Ankara"
    ]
  },
  {
    "id": "cpd-2023-2024-39",
    "unitId": "cpd",
    "academicYear": "2023-2024",
    "title": "Sınıf İçi Öz Yansıtma Teknikleri (Self-Reflection Workshop)",
    "date": "19 Ocak 2024",
    "sortDate": "2024-01-19",
    "category": "Atölye",
    "scope": "Kurum İçi",
    "summary": "Öğretim elemanlarının ders işleyişi sırasında öz-yansıtma ve meslektaş geri bildirimi uygulamaları üzerine uygulamalı atölye.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "Funda Çetin (UES)",
    "trainers": "Funda Çetin (UES)",
    "location": "ADÜ YDYO Binası",
    "driveDocTitle": "Kurumsal Rapor, Sunum, Video & Gözlem Formları (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2023-24",
      "2024-01-19_Sinif-Ici-Oz-Yansitma-Teknikleri"
    ]
  },
  {
    "id": "cpd-2023-2024-40",
    "unitId": "cpd",
    "academicYear": "2023-2024",
    "title": "(Re)Defining Institutional Effectiveness: Testing & Assessment",
    "date": "19–20 Ocak 2024",
    "sortDate": "2024-01-19",
    "category": "Seminer",
    "scope": "Kurum Dışı",
    "summary": "Ölçme-değerlendirme süreçleri ve konuşma (speaking) becerisini ölçme türleri üzerine İstanbul’da düzenlenen eğitim.",
    "targetAudience": "Öğr. Gör. Lütfi Saraç",
    "status": "completed",
    "organizer": "Macmillan Education / NILE / Eaquals / UES",
    "trainers": "Macmillan Education / NILE / Eaquals / UES",
    "participantCount": 1,
    "participants": "Öğr. Gör. Lütfi Saraç",
    "location": "Ataköy Sheraton Hotel / İstanbul",
    "driveDocTitle": "Bireysel Katılım Raporu (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2023-24",
      "2024-01-19_Agility-Adaptability-Testing-Assessment-Istanbul"
    ]
  },
  {
    "id": "cpd-2023-2024-41",
    "unitId": "cpd",
    "academicYear": "2023-2024",
    "title": "FOCI XXIV — Collaboration of Wits and Wires: AI in Curriculum Development",
    "date": "15–16 Aralık 2023",
    "sortDate": "2023-12-15",
    "category": "Konferans / Sempozyum",
    "scope": "Kurum Dışı",
    "summary": "Program geliştirme süreçlerinde yapay zekâ kullanımı üzerine 24. FOCI konferansı katılımı.",
    "targetAudience": "Öğr. Gör. Lütfi Saraç",
    "status": "completed",
    "organizer": "FOCI",
    "trainers": "FOCI",
    "participantCount": 1,
    "participants": "Öğr. Gör. Lütfi Saraç",
    "location": "Fatih Sultan Mehmet Vakıf Üniversitesi / İstanbul",
    "driveDocTitle": "Katılım Raporu, 2 Sunum & Grup Çıktıları (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2023-24",
      "2023-12-15_FOCI-XXIV-AI-in-Curriculum-Design-Istanbul"
    ]
  },
  {
    "id": "cpd-2023-2024-42",
    "unitId": "cpd",
    "academicYear": "2023-2024",
    "title": "Erasmus+ Proje Yazma Eğitimi (1. ve 2. Aşama)",
    "date": "12 Temmuz & 18 Eylül 2023",
    "sortDate": "2023-09-18",
    "category": "Proje Eğitimi",
    "scope": "Kurum İçi",
    "summary": "Öğretim elemanlarına yönelik iki aşamalı Erasmus+ proje yazma eğitimi ve uygulama toplantıları.",
    "targetAudience": "Tüm Öğretim Elemanları",
    "status": "completed",
    "organizer": "ADÜ YDYO & Aydın İl Milli Eğitim Müdürlüğü İş Birliği",
    "trainers": "ADÜ YDYO & Aydın İl Milli Eğitim Müdürlüğü İş Birliği",
    "location": "ADÜ YDYO",
    "driveDocTitle": "Toplantı Tutanakları & Fotoğraflar (Drive Arşivi)",
    "driveDocUrl": "https://drive.google.com/drive/folders/1hsfoiUlaptt2ivMSr1vgISB2-XByh2ll",
    "driveFolderPath": [
      "01_CPD_Surekli_Mesleki_Gelisim",
      "01_Etkinlikler_ve_Egitimler",
      "2023-24",
      "2023-07-12_ve_09-18_Erasmus-Proje-Yazma-Egitimi"
    ]
  }
];
