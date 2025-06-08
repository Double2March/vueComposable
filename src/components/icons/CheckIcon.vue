<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    :stroke-width="strokeWidth"
    class="check-icon"
  >
    <polyline points="20,6 9,17 4,12" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number | string
  strokeWidth?: number
}

withDefaults(defineProps<Props>(), {
  size: 20,
  strokeWidth: 2
})
</script>

<style scoped>
.check-icon {
  color: #10b981; /* green-500 */
}
</style>