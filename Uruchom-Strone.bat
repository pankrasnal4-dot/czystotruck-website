@echo off
title CzystoTruck - Serwer Lokalny
echo ==========================================================
echo    CZYSTOTRUCK - WYWOZ MEBLI I OPROZNIANIE MIESZKAN
echo ==========================================================
echo.
echo 1. Uruchamianie serwera pod adresem: http://localhost:3000
echo 2. Otwieranie przegladarki...
echo.
start http://localhost:3000
cmd /c npm run dev
pause
