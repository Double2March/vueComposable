<!-- src/App.vue - 이걸로 완전 교체! -->
<template>
  <div id="app">
    <!-- 🔥 네비게이션 메뉴 추가 -->
    <nav class="main-nav">
      <div class="nav-container">
        <div class="logo">
          <img alt="Vue logo" src="./assets/logo.svg" width="32" height="32" />
          <span>UI 마라톤</span>
        </div>
        
        <div class="nav-links">
          <RouterLink to="/" class="nav-link">홈</RouterLink>
          <RouterLink to="/test" class="nav-link">테스트</RouterLink>
          <RouterLink to="/about" class="nav-link">About</RouterLink>
          <RouterLink to="/portal" class="nav-link">Portal</RouterLink>
          <RouterLink to="/composable" class="nav-link">Composable</RouterLink>
        </div>
      </div>
    </nav>

    <!-- 🌟 라우터 뷰 - 페이지 내용 표시 -->
    <main class="main-content">
      <RouterView />
      <UIPortal />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UIPortal from '@/components/UIPortal.vue'
</script>

<style scoped>
.main-nav {
  background: #2c3e50;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #bdc3c7;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s;
}

.nav-link:hover {
  color: white;
  background: rgba(255,255,255,0.1);
}

.nav-link.router-link-active {
  color: #3498db;
  background: rgba(52, 152, 219, 0.1);
}

.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>