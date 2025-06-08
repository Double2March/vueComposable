<!-- src/views/TestView.vue -->
<template>
  <div class="test-page">
    <h1>🔥 UI 마라톤 테스트 페이지</h1>
    
    <div class="welcome-section">
      <h2>환영합니다! 🎉</h2>
      <p>Vue 3 + Composition API 학습이 시작되었습니다!</p>
      <p>현재 시간: {{ currentTime }}</p>
    </div>


    <div style="margin: 20px; padding: 20px; border: 2px solid #ccc;">
      <h3>UI 시스템 테스트</h3>
      <button @click="testToast" style="margin: 5px; padding: 10px;">Toast 테스트</button>
      <button @click="testAlert" style="margin: 5px; padding: 10px;">Alert 테스트</button>
      <button @click="testBasicLoading" style="margin: 5px; padding: 10px;">기본 로딩</button>
    </div>
    
    <div class="test-section">
      <h3>반응형 데이터 테스트</h3>
      <div class="counter-box">
        <p>카운트: <span class="count">{{ count }}</span></p>
        <div class="button-group">
          <button @click="increment" class="btn btn-primary">+1</button>
          <button @click="decrement" class="btn btn-secondary">-1</button>
          <button @click="reset" class="btn btn-danger">리셋</button>
        </div>
        <p v-if="count > 10" class="achievement">🎯 10회 돌파! 대단해요!</p>
        <p v-if="count > 50" class="achievement">🔥 50회 돌파! Vue 마스터!</p>
      </div>
    </div>
    
    <div class="test-section">
      <h3>미래의 Toast 시스템 미리보기</h3>
      <div class="toast-preview">
        <button @click="showPreviewToast" class="btn btn-success">Toast 미리보기</button>
        
        <div v-if="toastVisible" class="toast-demo">
          <div class="toast-content">
            <span>{{ toastMessage }}</span>
            <button @click="hideToast" class="toast-close">×</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="test-section">
      <h3>학습 진행률</h3>
      <div class="progress-box">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <p>{{ Math.round(progress) }}% 완료</p>
        <button @click="addProgress" class="btn btn-info">진행률 +10%</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUIState } from '@/composables/core/useUIState.ts'

// 오버레이
const { 
  addToast, 
  addAlert, 
  addLoading, 
  removeLoading, 
  updateLoadingProgress 
} = useUIState()

// 반응형 데이터
const count = ref(0)
const currentTime = ref('')
const toastVisible = ref(false)
const toastMessage = ref('')
const progress = ref(0)

// 시간 업데이트
let timeInterval = null

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

const testToast = () => {
  console.log('🍞 Toast 테스트!')
  addToast('Toast가 나타났나요? 🎉', 'warning', 3000)
}

const testAlert = () => {
  console.log('🚨 Alert 테스트!')
  // ✅ 직접 addAlert 사용
  addAlert('Alert가 나타났나요?', {
    type: 'warning'
  })
}

const testBasicLoading = () => {
  console.log('🔄 기본 로딩 테스트!')
  
  const loadingId = addLoading('데이터를 처리하고 있습니다...', 'circle', false)
  
  // 3초 후 제거
  setTimeout(() => {
    removeLoading(loadingId)
    addToast('로딩 완료! 📊', 'success')
  }, 3000)
}

// 메서드들
const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString()
}

const increment = () => {
  count.value++
}

const decrement = () => {
  if (count.value > 0) count.value--
}

const reset = () => {
  count.value = 0
}

const showPreviewToast = () => {
  const messages = [
    '곧 진짜 Toast가 될 거예요! 🍞',
    'Portal 시스템으로 업그레이드 예정! 🌟',
    'Vue 마스터 되는 중... 🚀',
    '25시간 마라톤 화이팅! 💪'
  ]
  
  toastMessage.value = messages[Math.floor(Math.random() * messages.length)]
  toastVisible.value = true
  
  setTimeout(() => {
    toastVisible.value = false
  }, 3000)
}

const hideToast = () => {
  toastVisible.value = false
}

const addProgress = () => {
  if (progress.value < 100) {
    progress.value = Math.min(100, progress.value + 10)
  } else {
    progress.value = 0 // 리셋
  }
}
</script>

<style scoped>
.test-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.test-page h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
}

.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  text-align: center;
}

.test-section {
  background: white;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.test-section h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.counter-box {
  text-align: center;
}

.count {
  font-size: 2em;
  font-weight: bold;
  color: #3498db;
}

.button-group {
  margin: 20px 0;
}

.btn {
  margin: 0 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary { background: #3498db; color: white; }
.btn-secondary { background: #95a5a6; color: white; }
.btn-danger { background: #e74c3c; color: white; }
.btn-success { background: #27ae60; color: white; }
.btn-info { background: #17a2b8; color: white; }

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.achievement {
  color: #27ae60;
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 15px;
}

.toast-preview {
  text-align: center;
}

.toast-demo {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.toast-content {
  background: #27ae60;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: slideIn 0.3s ease-out;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-box {
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background: #ecf0f1;
  border-radius: 10px;
  overflow: hidden;
  margin: 15px 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #27ae60);
  transition: width 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>