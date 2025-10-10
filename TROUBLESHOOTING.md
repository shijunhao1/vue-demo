# 故障排除指南

本文档提供了常见问题的解决方案。

## 常见问题

### 1. 依赖安装问题

#### 问题：`npm install` 失败

**可能原因：**
- 网络连接问题
- npm 版本过旧
- node_modules 损坏

**解决方案：**
```bash
# 清理缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

如果还是失败，尝试使用 cnpm：
```bash
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install
```

### 2. 后端服务问题

#### 问题：后端服务无法启动

**检查步骤：**

1. 确认端口 3000 未被占用：
```bash
# Linux/Mac
lsof -i :3000

# Windows
netstat -ano | findstr :3000
```

2. 如果端口被占用，杀死占用进程或修改端口：
```bash
# 在 server.js 中修改端口
const PORT = 3001;  // 改为其他端口
```

3. 检查依赖是否正确安装：
```bash
npm list express cors
```

#### 问题：后端服务启动但无响应

**解决方案：**

1. 检查后端日志：
```bash
cat backend.log
```

2. 测试健康检查接口：
```bash
curl http://localhost:3000/api/health
```

3. 如果返回错误，检查 server.js 语法是否正确

### 3. 前端服务问题

#### 问题：前端无法启动

**检查步骤：**

1. 确认端口 5173 未被占用：
```bash
# Linux/Mac
lsof -i :5173

# Windows  
netstat -ano | findstr :5173
```

2. 清理并重新构建：
```bash
rm -rf node_modules/.vite
npm run dev
```

#### 问题：页面白屏

**解决方案：**

1. 打开浏览器开发者工具（F12）
2. 查看控制台（Console）错误信息
3. 常见错误及解决方案：

   - **Cannot find module**: 依赖未安装，运行 `npm install`
   - **Failed to fetch**: 后端服务未启动或地址错误
   - **CORS error**: 后端 CORS 配置问题

### 4. 网络连接问题

#### 问题：前端无法连接后端

**诊断步骤：**

1. 确认后端服务正在运行：
```bash
curl http://localhost:3000/api/health
```

2. 检查前端配置中的 API 地址：
   - 打开 `src/components/ChatBox.vue`
   - 确认 axios.post 的 URL 是 `http://localhost:3000/api/chat`

3. 检查浏览器是否阻止了请求：
   - 打开开发者工具 → Network 标签
   - 发送消息并查看请求状态

#### 问题：CORS 错误

**解决方案：**

确认 `server.js` 中已正确配置 CORS：
```javascript
import cors from 'cors';
app.use(cors());
```

如果问题仍然存在，尝试指定具体的源：
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### 5. 界面显示问题

#### 问题：样式显示不正常

**解决方案：**

1. 清除浏览器缓存（Ctrl+F5 强制刷新）
2. 确认 CSS 文件正确加载：
   - 开发者工具 → Network → 查看 CSS 文件状态
3. 检查浏览器兼容性（推荐使用 Chrome、Firefox、Edge 最新版本）

#### 问题：消息不显示或显示异常

**检查步骤：**

1. 打开浏览器控制台查看错误
2. 确认组件正确导入：
```javascript
import Message from './Message.vue';
```

3. 检查数据格式是否正确：
```javascript
{
  id: Number,
  role: 'user' | 'assistant',
  content: String,
  timestamp: Number
}
```

### 6. 性能问题

#### 问题：页面卡顿或响应慢

**优化建议：**

1. 限制消息历史数量：
```javascript
// 在 ChatBox.vue 中添加
const MAX_MESSAGES = 100;
if (messages.value.length > MAX_MESSAGES) {
  messages.value.shift(); // 删除最早的消息
}
```

2. 优化滚动性能：
```javascript
// 使用节流函数
import { debounce } from 'lodash';
const scrollToBottom = debounce(() => {
  // 滚动逻辑
}, 100);
```

### 7. 部署问题

#### 问题：生产环境构建失败

**解决方案：**

1. 检查 Node.js 版本：
```bash
node --version  # 应该 >= 20.19.0
```

2. 清理并重新构建：
```bash
rm -rf dist node_modules
npm install
npm run build
```

3. 检查构建输出错误信息

#### 问题：部署后无法连接后端

**解决方案：**

1. 修改 API 地址为生产环境地址：
```javascript
// 在 ChatBox.vue 中
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com'
  : 'http://localhost:3000';

axios.post(`${API_URL}/api/chat`, { message: question });
```

2. 确保后端 CORS 配置允许生产环境域名

## 获取帮助

如果以上方法都无法解决您的问题：

1. 查看完整的错误日志
2. 在 GitHub 仓库中提交 Issue
3. 提供以下信息：
   - 操作系统和版本
   - Node.js 和 npm 版本
   - 详细的错误信息
   - 复现步骤

## 调试技巧

### 启用详细日志

在开发环境中启用详细日志：

**前端：**
```javascript
// 在 ChatBox.vue 中添加
console.log('Sending message:', message);
console.log('Response:', response.data);
```

**后端：**
```javascript
// 在 server.js 中已有日志
console.log('收到用户消息:', message);
console.log('AI回复:', reply);
```

### 使用浏览器开发者工具

1. **Console（控制台）**: 查看 JavaScript 错误和日志
2. **Network（网络）**: 查看 API 请求和响应
3. **Elements（元素）**: 检查 DOM 结构和样式
4. **Vue DevTools**: 查看 Vue 组件状态（需要安装浏览器扩展）

## 性能监控

使用浏览器性能分析工具：
1. 打开开发者工具 → Performance
2. 点击录制
3. 执行操作
4. 停止录制并分析结果

## 常用命令参考

```bash
# 查看 npm 版本
npm --version

# 查看 node 版本
node --version

# 查看已安装的包
npm list --depth=0

# 检查过期的包
npm outdated

# 清理 npm 缓存
npm cache clean --force

# 重新安装所有依赖
rm -rf node_modules package-lock.json && npm install
```

## 联系支持

- GitHub Issues: [提交问题](https://github.com/shijunhao1/vue-demo/issues)
- 文档：查看 [README.md](README.md) 和 [USAGE.md](USAGE.md)
