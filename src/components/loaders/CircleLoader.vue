<template>
  <div class="circle-loader">
    <svg 
      :width="size" 
      :height="size" 
      viewBox="0 0 50 50"
      class="loader-svg"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-dasharray="31.416"
        stroke-dashoffset="31.416"
        class="spinner-circle"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: number | string
  strokeWidth?: number
  color?: string
}

withDefaults(defineProps<Props>(), {
  size: 24,
  strokeWidth: 3,
  color: '#3b82f6'
})
</script>

<style scoped>
.circle-loader {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.loader-svg {
  animation: rotate 2s linear infinite;
}

.spinner-circle {
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>