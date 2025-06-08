// composables/useCounter.ts - 타입 안전한 Composable
import { ref, computed, Ref, ComputedRef } from 'vue'

// 🔥 인터페이스 정의
interface UseCounterReturn {
  count: Ref<number>
  increment: () => void
  decrement: () => void
  reset: () => void
  isEven: ComputedRef<boolean>
  doubleCount: ComputedRef<number>
  setCount: (value: number) => void
}

interface UseCounterOptions {
  min?: number
  max?: number
  step?: number
}

// 🔥 타입 안전한 Composable 함수
export function useCounter(
  initialValue: number = 0,
  options: UseCounterOptions = {}
): UseCounterReturn {
  const { min = -Infinity, max = Infinity, step = 1 } = options
  
  const count = ref<number>(initialValue)
  
  const increment = (): void => {
    if (count.value + step <= max) {
      count.value += step
    }
  }
  
  const decrement = (): void => {
    if (count.value - step >= min) {
      count.value -= step
    }
  }
  
  const reset = (): void => {
    count.value = initialValue
  }
  
  const setCount = (value: number): void => {
    if (value >= min && value <= max) {
      count.value = value
    }
  }
  
  // 🔥 타입 안전한 계산된 속성
  const isEven = computed<boolean>(() => count.value % 2 === 0)
  const doubleCount = computed<number>(() => count.value * 2)
  
  return { 
    count, 
    increment, 
    decrement, 
    reset,
    setCount,
    isEven,
    doubleCount 
  }
}