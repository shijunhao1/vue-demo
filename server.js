import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 模拟AI回复的函数
function generateAIResponse(userMessage) {
  const responses = {
    '你好': '您好！很高兴见到您。有什么我可以帮助您的吗？',
    '你是谁': '我是一个AI智能助手，专门为您提供各种问题的解答和帮助。',
    '天气': '抱歉，我目前还无法查询实时天气信息。您可以访问天气预报网站获取准确信息。',
    '再见': '再见！祝您有美好的一天！如有需要，随时欢迎回来。',
  };

  // 检查是否有预设回复
  for (const [key, value] of Object.entries(responses)) {
    if (userMessage.includes(key)) {
      return value;
    }
  }

  // 通用回复模板
  const genericResponses = [
    `关于"${userMessage}"这个问题，我理解您的关注。让我为您详细解答...`,
    `这是一个很好的问题！关于${userMessage}，我可以告诉您...`,
    `感谢您的提问。针对${userMessage}，我的建议是...`,
    `我明白您想了解${userMessage}。让我从几个方面来说明...`,
  ];

  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

// Chat API endpoint
app.post('/api/chat', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: '消息不能为空' });
  }

  console.log('收到用户消息:', message);

  // 模拟处理延迟，使体验更真实
  setTimeout(() => {
    const reply = generateAIResponse(message);
    console.log('AI回复:', reply);
    
    res.json({
      reply,
      timestamp: Date.now()
    });
  }, 500 + Math.random() * 1000); // 0.5-1.5秒的随机延迟
});

// 健康检查endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});
