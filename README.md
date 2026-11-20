# 🏛️ ADÜ YDYO Portal

**Aydın Adnan Menderes Üniversitesi Yabancı Diller Yüksekokulu (ADÜ YDYO)** bünyesindeki akademik birimlerin kurumsal Google Drive belgelerini depolamak, yürütülen faaliyetleri özetlemek ve öğretim elemanlarına faydalı araçlar sunmak amacıyla geliştirilmiş modern, mobil uyumlu akademik portal.

---

## 🚀 Öne Çıkan Özellikler

### 1. 5 Akademik Birim Mimarisi (Pilot: CPD Birimi)
* **CPD - Sürekli Mesleki Gelişim Birimi (Canlı Pilot):**
  * **Google Drive Belge Deposu:** Hiyerarşik klasör yapısı (`01_Etkinlikler_ve_Egitimler`, `02_Raporlar_ve_Faaliyet_Ozetleri`, `03_Komisyon_ve_Kararlar`, `04_Materyaller_ve_Rehberler`), arama, etiket filtreleme, doğrudan önizleme ve indirme.
  * **Yapılan İşler & Faaliyetler (A+C Formatı):** Hem yaklaşan atölye/çalıştaylar hem de tamamlanan işlerin zengin kartlar halinde özeti, katılımcı sayıları ve iliştirilmiş Drive belgeleri.
  * **CPD Birim Sorumlusu Girişi:** Yetkili hocalar için yeni faaliyet ekleme, özet yazma ve Drive linki tanımlama formu.
* Diğer 4 Birim (Formasyon, Akreditasyon, Uluslararası İlişkiler, BAP) modüler yapıda planlanmış olup şablon olarak genişletilebilir.

### 2. Faydalı Araçlar Modülü
* 📄 **Form & Şablonlar:** Dilekçeler, sınav mazeret tutanakları, ders izlencesi (syllabus) ve antetli kağıt şablonları arşivi.
* 📅 **Akademik Takvim:** 2025-2026 Güz/Bahar dönemi, filtreli sınav haftaları ve not giriş son günleri.
* 🧮 **Not & Harf Notu Hesaplama:** Vize, final, büt ve ödev oranlarına göre ADÜ bağıl harf notu baremi (AA - FF) ve "Hedef not için finalden kaç almalıyım?" simülatörü.
* 🔗 **Ödev Takip Programı:** Fakülte öğretim elemanı tarafından geliştirilen bağımsız ödev sistemine akıllı geçiş kartı.

### 3. Kimlik Doğrulama & Yetkilendirme
* Yalnızca `@adu.edu.tr` uzantılı kurumsal e-postaları kabul eder.
* **Şifresiz İlk Kayıt Akışı:** E-postaya gönderilen 6 haneli doğrulama kodu ile başlar, kullanıcı kendi şifresini belirler.
* **Hızlı Rol Değiştirici:** Demo ve testler için tek tıkla *Öğretim Elemanı*, *CPD Birim Sorumlusu* veya *Sistem Yöneticisi* rolüne geçiş yapılabilir.

### 4. Mobil ve Masaüstü Uyumlu (Responsive & Mobile-First)
* **Masaüstünde:** Kurumsal sol kenar çubuğu (Sidebar), istatistik panosu ve yetkili yönetim formları.
* **Mobilde:** Cepten belgelere, takvime ve araçlara tek başparmakla erişim sağlayan alt menü (Bottom Navigation).

---

## 🛠️ Kurulum ve Yerel Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için:

```bash
# 1. Proje dizinine geçin
cd c:\anti-gravity\okul-portal

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresine giderek portalı kullanabilirsiniz.

---

## 📦 GitHub'a Yükleme ve Canlıya Alma

### 1. GitHub Deposu Oluşturma ve Kodları Yükleme
```bash
git init
git add .
git commit -m "feat: ADU Akademik Portal ilk surum (CPD Modulu ve Faydali Araclar)"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/okul-portal.git
git push -u origin main
```

### 2. GitHub Pages ile Ücretsiz Yayınlama (İsteğe Bağlı)
Projeyi derleyip GitHub Pages üzerinden anında canlıya almak için:
```bash
npm run build
```
Oluşan `dist` klasörünü GitHub Pages veya Vercel / Netlify üzerine tek tıkla bağlayarak canlı yayına açabilirsiniz.

---

## 📁 Google Drive Klasör Mimarisi
Portal ile eşleşen Ortak Drive (Shared Drive) yapısı:
```text
📁 [ADÜ] Portal Belge Deposu
├── 📁 00_Genel_Formlar_ve_Sablonlar/
├── 📁 01_CPD_Surekli_Mesleki_Gelisim/
│   ├── 📁 01_Etkinlikler_ve_Egitimler/
│   ├── 📁 02_Raporlar_ve_Faaliyet_Ozetleri/
│   ├── 📁 03_Komisyon_ve_Kararlar/
│   └── 📁 04_Materyaller_ve_Rehberler/
├── 📁 02_Akademik_Birim_2/
├── 📁 03_Akademik_Birim_3/
├── 📁 04_Akademik_Birim_4/
└── 📁 05_Akademik_Birim_5/
```
