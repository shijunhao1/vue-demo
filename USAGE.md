# AI 智能问答系统使用指南

## 概述

这是一个基于 Vue 3 和 Node.js 的现代化AI问答系统，提供流畅的用户体验和优雅的界面设计。

## 快速开始

### 1. 安装依赖

首次使用时，需要安装项目依赖：

```bash
npm install
```

### 2. 启动服务

需要同时启动前端和后端服务。

#### 启动后端服务器

在第一个终端窗口中：

```bash
npm run server
```

你会看到以下输出：

```
🚀 Server is running on http://localhost:3000
📡 API endpoint: http://localhost:3000/api/chat
💚 Health check: http://localhost:3000/api/health
```

#### 启动前端开发服务器

在第二个终端窗口中：

```bash
npm run dev
```

你会看到以下输出：

```
VITE v7.1.3  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 3. 访问应用

在浏览器中打开 `http://localhost:5173`

## 功能说明

### 主要功能

1. **实时对话**: 输入问题后按 Enter 或点击发送按钮即可发送
2. **智能回复**: AI助手会根据你的问题给出相应的回复
3. **消息历史**: 所有对话历史都会保留在当前会话中
4. **加载状态**: 发送消息时会显示加载动画
5. **时间戳**: 每条消息都带有发送时间

### 预设回复

后端服务器提供了一些预设的智能回复：

- **"你好"** → "您好！很高兴见到您。有什么我可以帮助您的吗？"
- **"你是谁"** → "我是一个AI智能助手，专门为您提供各种问题的解答和帮助。"
- **"天气"** → "抱歉，我目前还无法查询实时天气信息。您可以访问天气预报网站获取准确信息。"
- **"再见"** → "再见！祝您有美好的一天！如有需要，随时欢迎回来。"

对于其他问题，AI会生成通用的回复模板。

## 技术架构

### 前端技术栈

- **Vue 3**: 使用 Composition API
- **Vite**: 快速的开发服务器和构建工具
- **Axios**: HTTP 客户端，用于与后端通信
- **CSS3**: 现代化的样式和动画效果

### 后端技术栈

- **Node.js**: JavaScript 运行时
- **Express**: Web 应用框架
- **CORS**: 跨域资源共享中间件

### 项目结构

```
vue-demo/
├── src/
│   ├── components/
│   │   ├── Message.vue       # 消息组件
│   │   └── ChatBox.vue       # 聊天框组件
│   ├── App.vue               # 主应用组件
│   ├── main.js               # 入口文件
│   └── assets/               # 静态资源
├── server.js                 # Node.js 后端服务器
├── package.json              # 项目配置
├── README.md                 # 项目说明
└── USAGE.md                  # 使用指南（本文件）
```

## API 接口文档

### POST /api/chat

发送消息到AI助手

**请求地址**: `http://localhost:3000/api/chat`

**请求方法**: POST

**请求头**:
```
Content-Type: application/json
```

**请求体**:
```json
{
  "message": "你好"
}
```

**成功响应**:
```json
{
  "reply": "您好！很高兴见到您。有什么我可以帮助您的吗？",
  "timestamp": 1234567890123
}
```

**错误响应** (400):
```json
{
  "error": "消息不能为空"
}
```

### GET /api/health

健康检查接口

**请求地址**: `http://localhost:3000/api/health`

**请求方法**: GET

**成功响应**:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## 自定义开发

### 修改 AI 回复逻辑

编辑 `server.js` 文件中的 `generateAIResponse` 函数：

```javascript
function generateAIResponse(userMessage) {
  // 添加你自己的回复逻辑
  const responses = {
    '你好': '您好！很高兴见到您。',
    // 添加更多预设回复...
  };
  
  // 你的自定义逻辑
  
  return reply;
}
```

### 修改界面样式

1. **消息样式**: 编辑 `src/components/Message.vue` 的 `<style>` 部分
2. **聊天框样式**: 编辑 `src/components/ChatBox.vue` 的 `<style>` 部分
3. **全局样式**: 编辑 `src/App.vue` 的 `<style>` 部分

### 添加新功能

1. 在 `src/components/ChatBox.vue` 中添加新的功能逻辑
2. 在 `server.js` 中添加新的 API 端点
3. 确保前后端的数据格式保持一致

## 常见问题

### Q: 发送消息后没有响应？

A: 请确保后端服务器正在运行。检查终端中是否有 `Server is running on http://localhost:3000` 的输出。

### Q: 前端无法连接后端？

A: 确保：
1. 后端服务器在 3000 端口运行
2. 前端在 5173 端口运行
3. 没有防火墙阻止本地连接

### Q: 如何部署到生产环境？

A: 
1. 构建前端：`npm run build`
2. 将 `dist` 目录部署到静态文件服务器
3. 部署 `server.js` 到 Node.js 服务器
4. 修改前端 API 地址为生产环境地址

## 开发建议

1. **代码规范**: 使用 ESLint 保持代码风格一致
2. **Git 提交**: 使用清晰的提交信息
3. **测试**: 在修改功能后进行完整测试
4. **文档**: 更新相关文档说明新增功能

## 许可证

MIT License

## 支持

如有问题，请在 GitHub 仓库中提交 Issue。
