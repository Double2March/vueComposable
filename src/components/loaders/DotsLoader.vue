<template>
  <div class="dots-loader">
    <div 
      v-for="i in 3" 
      :key="i"
      class="dot"
      :style="{ 
        animationDelay: `${(i - 1) * 0.16}s`,
        backgroundColor: color 
      }"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: number | string
  color?: string
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 6,
  color: '#3b82f6',
  speed: 1.4
})

// 반응형 스타일 계산
const dotSize = typeof props.size === 'number' ? `${props.size}px` : props.size
</script>

<style scoped>
.dots-loader {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.dot {
  width: v-bind(dotSize);
  height: v-bind(dotSize);
  border-radius: 50%;
  animation: pulse v-bind("`${speed}s`") ease-in-out infinite;
}

@keyframes pulse {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>