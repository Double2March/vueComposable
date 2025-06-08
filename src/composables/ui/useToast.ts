import { reactive } from 'vue'
import type { Toast, ToastType } from '@/types/ui'

const toastState = reactive<{
  toasts: Toast[]
  nextId: number
}>({
  toasts: [],
  nextId: 1
})

export function useToast() {
  const toast = (
    message: string, 
    type: ToastType = 'info',
    duration: number = 3000
  ): number => {
    const newToast: Toast = {
      id: toastState.nextId++,
      message,
      type,
      duration,
      createdAt: Date.now()
    }
    
    toastState.toasts.push(newToast)
    
    // 자동 제거
    if (duration > 0) {
      setTimeout(() => {
        removeToast(newToast.id)
      }, duration)
    }
    
    return newToast.id
  }
  
  const removeToast = (id: number): void => {
    const index = toastState.toasts.findIndex(t => t.id === id)
    if (index !== -1) {
      toastState.toasts.splice(index, 1)
    }
  }
  
  const clearAllToasts = (): void => {
    toastState.toasts.length = 0
  }
  
  return {
    toasts: toastState.toasts,
    toast,
    removeToast,
    clearAllToasts
  }
}