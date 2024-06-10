@echo off
start /B node app.js
timeout /t 5 /nobreak >nul
start "" "http://localhost:3000"