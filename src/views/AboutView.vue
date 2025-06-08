<!-- 사용 예제 -->
<script setup lang="ts">
import { useCounter } from '@/composables/useCounter.ts'

// 🔥 타입 추론으로 안전한 사용
const { count, increment, decrement, reset, isEven } = useCounter(100, {
  min: 0,
  max: 1000,
  step: 5
})
</script>

<template>
  <div>
    <h2>카운터: {{ count }}</h2>
    <p>{{ isEven ? '짝수' : '홀수' }}</p>
    <button @click="increment">+5</button>
    <button @click="decrement">-5</button>
    <button @click="reset">리셋</button>
  </div>
</template>

<style scoped>
.counter-demo {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  text-align: center;
}

.counter-display {
  margin: 20px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.counter-display h3 {
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 10px;
}

.button-group {
  margin: 20px 0;
}

.btn {
  margin: 0 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-plus {
  background: #27ae60;
  color: white;
}

.btn-minus {
  background: #e74c3c;
  color: white;
}

.btn-reset {
  background: #95a5a6;
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.info {
  margin-top: 20px;
  padding: 15px;
  background: #e8f4fd;
  border-radius: 6px;
  font-size: 0.9em;
  color: #2c3e50;
}
</style>