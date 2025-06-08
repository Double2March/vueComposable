// src/main.ts 수정
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // 추가!

const app = createApp(App)

app.use(router)  // 추가!

app.mount('#app')