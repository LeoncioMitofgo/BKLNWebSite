@echo off
echo Arrancando Analizador de Ventas...
cd /d "%~dp0backend"
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
