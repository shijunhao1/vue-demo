#!/bin/bash

# AI 智能问答系统启动脚本
# 此脚本会同时启动前端和后端服务

echo "🚀 正在启动 AI 智能问答系统..."
echo ""

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行，正在安装依赖..."
    npm install
    echo ""
fi

# 启动后端服务器（后台运行）
echo "🔧 启动后端服务器..."
npm run server > backend.log 2>&1 &
BACKEND_PID=$!
echo "   后端 PID: $BACKEND_PID"

# 等待后端启动
sleep 2

# 检查后端是否正常启动
if curl -s http://localhost:3000/api/health > /dev/null; then
    echo "✅ 后端服务器启动成功"
else
    echo "❌ 后端服务器启动失败，请检查 backend.log"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎨 启动前端开发服务器..."
echo ""

# 启动前端（前台运行）
npm run dev

# 清理：当前端停止时，也停止后端
echo ""
echo "🛑 正在停止服务..."
kill $BACKEND_PID 2>/dev/null
echo "✅ 所有服务已停止"
