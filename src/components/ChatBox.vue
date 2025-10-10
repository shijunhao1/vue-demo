<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>AI 智能助手</h2>
      <p>有什么可以帮助您的吗？</p>
    </div>
    
    <div class="chat-messages" ref="messagesContainer">
      <Message
        v-for="msg in messages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
        :timestamp="msg.timestamp"
      />
      
      <div v-if="isLoading" class="loading-indicator">
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    
    <div class="chat-input-container">
      <textarea
        v-model="inputText"
        @keydown.enter.prevent="handleSend"
        placeholder="输入您的问题... (按 Enter 发送)"
        class="chat-input"
        :disabled="isLoading"
        rows="1"
      ></textarea>
      <button 
        @click="handleSend" 
        class="send-button"
        :disabled="!inputText.trim() || isLoading"
      >
        <svg v-if="!isLoading" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span v-else class="loading-spinner"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';
import Message from './Message.vue';

const messages = ref([]);
const inputText = ref('');
const isLoading = ref(false);
const messagesContainer = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const handleSend = async () => {
  if (!inputText.value.trim() || isLoading.value) return;
  
  const userMessage = {
    id: Date.now(),
    role: 'user',
    content: inputText.value,
    timestamp: Date.now()
  };
  
  messages.value.push(userMessage);
  const question = inputText.value;
  inputText.value = '';
  scrollToBottom();
  
  isLoading.value = true;
  
  try {
    const response = await axios.post('http://localhost:3000/api/chat', {
      message: question
    });
    
    const assistantMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: response.data.reply,
      timestamp: Date.now()
    };
    
    messages.value.push(assistantMessage);
    scrollToBottom();
  } catch (error) {
    console.error('Error sending message:', error);
    const errorMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: '抱歉，发生了错误。请确保后端服务器正在运行。',
      timestamp: Date.now()
    };
    messages.value.push(errorMessage);
    scrollToBottom();
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  const welcomeMessage = {
    id: Date.now(),
    role: 'assistant',
    content: '您好！我是AI助手，很高兴为您服务。请问有什么可以帮助您的吗？',
    timestamp: Date.now()
  };
  messages.value.push(welcomeMessage);
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 900px;
  margin: 0 auto;
  background: #f5f5f5;
}

.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chat-header h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
}

.chat-header p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: white;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.loading-indicator {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.loading-dots {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  gap: 6px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #667eea;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.chat-input-container {
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  background: white;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.chat-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 24px;
  font-size: 14px;
  resize: none;
  outline: none;
  font-family: inherit;
  max-height: 120px;
  overflow-y: auto;
}

.chat-input:focus {
  border-color: #667eea;
}

.chat-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.send-button {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;
  flex-shrink: 0;
}

.send-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
