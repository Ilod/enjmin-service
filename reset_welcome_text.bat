@echo off
powershell -Command "& Invoke-WebRequest -Uri http://localhost:3000/text/v1/welcome -Method POST -Body 'Welcome to Moche!' -Header @{'Content-Type'='text/plain'}"
pause