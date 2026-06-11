@echo off
chcp 65001 >nul
title 云舍村后端服务
cd /d "%~dp0"

echo ==========================================
echo   云舍村后端服务
echo ==========================================
echo.

:: 检查并杀掉占用 3000 端口的旧进程
echo [1/2] 检查端口 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000 " ^| findstr "LISTENING"') do (
    echo 发现旧进程 PID: %%a，正在关闭...
    taskkill /PID %%a /F >nul 2>&1
    timeout /t 1 /nobreak >nul
)

echo [2/2] 启动服务...
echo.
echo 访问地址：http://localhost:3000
echo 管理账号：admin / admin123456
echo.
echo 关闭此窗口即停止服务
echo ==========================================
echo.

node server.js

echo.
echo 服务已停止，按任意键关闭...
pause >nul
