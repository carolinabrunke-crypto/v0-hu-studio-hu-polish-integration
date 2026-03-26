@echo off
echo ============================================
echo   HuStudio - Presentacion
echo   Iniciando servidor de desarrollo...
echo ============================================
echo.
echo Esperando a que el servidor este listo...
echo El navegador se abrira automaticamente
echo.
echo Para detener el servidor, presiona Ctrl+C en esta ventana
echo.

start /B cmd /c "timeout /t 8 /nobreak >nul && start http://localhost:3000"

npm run dev
