# AI 智能问答系统

一个现代化的AI问答页面，使用 Vue 3 + Node.js 构建。

## 功能特性

- 💬 实时聊天界面
- 🤖 AI 智能回复
- 📱 响应式设计
- ✨ 流畅的动画效果
- 🎨 现代化UI设计

## 技术栈

### 前端
- Vue 3 (Composition API)
- Vite
- Axios
- CSS3 动画

### 后端
- Node.js
- Express
- CORS

## 项目设置

### 安装依赖

```sh
npm install
```

### 开发环境运行

#### 方式一：使用启动脚本（推荐）

**Linux/Mac:**
```sh
./start.sh
```

**Windows:**
```sh
start.bat
```

#### 方式二：手动启动

需要同时启动前端和后端服务：

1. 启动后端服务器：
```sh
npm run server
```

2. 在新终端中启动前端开发服务器：
```sh
npm run dev
```

前端将运行在 `http://localhost:5173`，后端API运行在 `http://localhost:3000`。

### 生产环境构建

```sh
npm run build
```

## 项目结构

```
vue-demo/
├── src/
│   ├── components/
│   │   ├── Message.vue      # 消息组件
│   │   └── ChatBox.vue      # 聊天框组件
│   ├── App.vue              # 主应用组件
│   └── main.js              # 入口文件
├── server.js                # Node.js 后端服务器
├── package.json
└── README.md
```

## API 接口

### POST /api/chat

发送消息到AI助手

**请求体：**
```json
{
  "message": "你好"
}
```

**响应：**
```json
{
  "reply": "您好！很高兴见到您。有什么我可以帮助您的吗？",
  "timestamp": 1234567890
}
```

### GET /api/health

健康检查接口

**响应：**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## 使用说明

1. 启动后端和前端服务
2. 在浏览器中打开 `http://localhost:5173`
3. 在输入框中输入问题
4. 按 Enter 或点击发送按钮发送消息
5. AI助手会自动回复您的问题

## 自定义

### 修改AI回复逻辑

编辑 `server.js` 中的 `generateAIResponse` 函数来自定义AI的回复逻辑。

### 修改样式

编辑 `src/components/Message.vue` 和 `src/components/ChatBox.vue` 中的 `<style>` 部分来自定义界面样式。

## 推荐的 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## 许可证

MIT
