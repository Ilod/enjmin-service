@echo off
powershell -executionpolicy remotesigned -File %~dp0/update_welcome_text.ps1
pause