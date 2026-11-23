@echo off
chcp 65001 >nul
title OKUL PORTAL VERI SENKRONIZASYONU
cls
echo ========================================================
echo   OKUL PORTAL - EXCEL VERI SENKRONIZASYONU
echo ========================================================
echo.

:: 1. Python ile Excel okunuyor
echo 1. Excel dosyasindaki degisiklikler okunuyor...
py scripts/sync_school_data.py
if %ERRORLEVEL% NEQ 0 (
    python scripts/sync_school_data.py
)
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [HATA] Python senkronizasyonu calistirilamadi!
    echo Lutfen acik ise Excel dosyasini kaydedip kapatin.
    pause
    exit /b 1
)

echo.
echo 2. Degisiklikler kontrol ediliyor...
git add docs/okul_bilgi.xlsx src/data/schoolData.ts

:: Degisiklik var mi kontrol et
git diff --cached --quiet
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   [BILGI] HER SEY GUNCEL!
    echo   Excel dosyanizdaki degisiklikler zaten daha once portala
    echo   aktarilmis ve GitHub'a gonderilmis durumdadir.
    echo.
    echo   Canli siteyi kontrol etmek icin:
    echo   https://rkorkut70.github.io/okul-portal/
    echo ========================================================
    echo.
    pause
    exit /b 0
)

echo.
echo 3. Yeni degisiklikler GitHub'a yukleniyor (Git commit & push)...
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
    echo [UYARI] Git yuklemesinde bir sorun olustu.
    echo Lutfen internet baglantinizi kontrol edip tekrar deneyin.
)

echo.
pause
