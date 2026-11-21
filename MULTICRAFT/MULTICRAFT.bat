@echo off
cd /d "%~dp0"
set "URL=file:///%~dp0multicraft.html"
start "" msedge --app="%URL%" --window-size=1280,720 --disable-frame-rate-limit --disable-gpu-vsync && exit
start "" chrome --app="%URL%" --window-size=1280,720 --disable-frame-rate-limit --disable-gpu-vsync && exit
echo Не найден Edge или Chrome.
pause
