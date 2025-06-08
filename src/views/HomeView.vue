<!-- src/views/HomeView.vue -->
<template>
  <div class="home">
    <div class="hero-section">
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      <h1>🔥 Vue UI 마라톤 시작!</h1>
      <p>25시간 만에 Vue 마스터 되기</p>
      
      <div class="quick-links">
        <RouterLink to="/test" class="hero-btn">테스트 페이지로 이동</RouterLink>
        <RouterLink to="/about" class="hero-btn secondary">About 보기</RouterLink>
        <RouterLink to="/portal" class="hero-btn secondary">Portal 보기</RouterLink>
      </div>
    </div>
    
    <div class="info-section">
      <h2>학습 목표</h2>
      <ul>
        <li>✅ Vue 3 Composition API 마스터</li>
        <li>✅ Portal 기반 UI 시스템 구축</li>
        <li>✅ useToast, useAlert, useLoading 구현</li>
        <li>✅ 기존 Store 시스템 대체</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.home {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-section {
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px;
  margin-bottom: 40px;
}

.logo {
  margin-bottom: 20px;
}

.hero-section h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.quick-links {
  margin-top: 30px;
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn {
  padding: 12px 24px;
  background: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.hero-btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.info-section {
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.info-section ul {
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
}

.info-section li {
  margin: 10px 0;
  font-size: 1.1em;
}
</style>