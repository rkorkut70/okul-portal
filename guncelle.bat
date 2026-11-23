@echo off
chcp 65001 >nul
echo ========================================================
echo   OKUL PORTAL - EXCEL VERI SENKRONIZASYONU
echo ========================================================
echo.
echo 1. Excel dosyasindaki degisiklikler okunuyor...
py scripts/sync_school_data.py
if %ERRORLEVEL% NEQ 0 (
    python scripts/sync_school_data.py
)
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [HATA] Python senkronizasyonu calistirilamadi!
    echo Lutfen Excel dosyasinin acik olup olmadigini kontrol edip kapatin.
    pause
    exit /b 1
)

echo.
echo 2. Degisiklikler GitHub'a yukleniyor (Git commit & push)...
git add docs/okul_bilgi.xlsx src/data/schoolData.ts
git commit -m "chore: Excel verileri portala senkronize edildi"
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   BASARILI!
    echo   Excel verileri portala aktarildi ve GitHub'a gonderildi.
    echo   Canli site (1-2 dakika icinde otomatik guncellenecektir):
    echo   https://rkorkut70.github.io/okul-portal/
    echo ========================================================
) else (
    echo.
    echo [UYARI] Git push sirasinda bir sorun olustu. Internet baglantinizi kontrol ediniz.
)

echo.
pause
