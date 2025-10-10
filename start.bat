@echo off
chcp 65001 >nul
title AI 智能问答系统

echo 🚀 正在启动 AI 智能问答系统...
echo.

REM 检查 node_modules 是否存在
if not exist "node_modules" (
    echo 📦 首次运行，正在安装依赖...
    call npm install
    echo.
)

echo 🔧 启动后端服务器...
start /B npm run server > backend.log 2>&1

REM 等待后端启动
timeout /t 3 /nobreak >nul

echo ✅ 后端服务器已启动
echo.

echo 🎨 启动前端开发服务器...
echo.
echo 👉 访问 http://localhost:5173 使用应用
echo 👉 按 Ctrl+C 停止所有服务
echo.

REM 启动前端
call npm run dev

echo.
echo 🛑 正在停止服务...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq npm run server" 2>nul
echo ✅ 所有服务已停止
pause
