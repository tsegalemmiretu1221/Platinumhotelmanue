@echo off
title Hotel Menu - Dev Server
cd /d "%~dp0"
echo ========================================
echo   PLATINUM HOTEL Menu Server Starting...
echo   URL: http://localhost:5173
echo ========================================
call npm.cmd run dev
pause
