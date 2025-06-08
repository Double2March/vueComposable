// composables/useUIState.ts - 타입 안전한 전역 상태
import { reactive } from 'vue'
import type { UIState, Toast, Alert, Loading, Modal, ToastType, AlertType, LoadingType } from '@/types/ui'

// 🔥 타입 안전한 전역 상태
const globalUIState = reactive<UIState>({
  toasts: [],
  alerts: [],
  loadings: [],
  modals: [],
  nextId: 1
})

export function useUIState() {
  // 🔥 Toast 관리 (타입 안전)
  const addToast = (
    message: string, 
    type: ToastType = 'info',
    duration: number = 3000
  ): number => {
    const toast: Toast = {
      id: globalUIState.nextId++,
      message,
      type,
      duration,
      createdAt: Date.now(),
      isVisible: true
    }
    
    globalUIState.toasts.push(toast)
    
    // 자동 제거
    if (duration > 0) {
      setTimeout(() => {
        removeToast(toast.id)
      }, duration)
    }
    
    return toast.id
  }
  
  const removeToast = (id: number): void => {
    const index = globalUIState.toasts.findIndex(t => t.id === id)
    if (index !== -1) {
      globalUIState.toasts.splice(index, 1)
    }
  }
  
  // 🔥 Alert 관리 (타입 안전)
  const addAlert = (message: string, options: Partial<Alert> = {}): number => {
    const alert: Alert = {
      id: globalUIState.nextId++,
      message,
      type: 'info',
      showConfirmButton: true,
      showCancelButton: false,
      confirmText: '확인',
      cancelText: '취소',
      closeOnOverlay: true,
      ...options
    }
    
    globalUIState.alerts.push(alert)
    return alert.id
  }
  
  const removeAlert = (id: number): void => {
    const index = globalUIState.alerts.findIndex(a => a.id === id)
    if (index !== -1) {
      globalUIState.alerts.splice(index, 1)
    }
  }
  
  // 🔥 Loading 관리 (타입 안전)
  const addLoading = (
    message: string = '처리 중...',
    type: LoadingType = 'circle',
    showProgress: boolean = false
  ): number => {
    const loading: Loading = {
      id: globalUIState.nextId++,
      message,
      type,
      showProgress,
      progress: 0,
      createdAt: Date.now()
    }
    
    globalUIState.loadings.push(loading)
    return loading.id
  }
  
  const removeLoading = (id: number): void => {
    const index = globalUIState.loadings.findIndex(l => l.id === id)
    if (index !== -1) {
      globalUIState.loadings.splice(index, 1)
    }
  }
  
  const updateLoadingProgress = (id: number, progress: number): void => {
    const loading = globalUIState.loadings.find(l => l.id === id)
    if (loading) {
      loading.progress = Math.max(0, Math.min(100, progress))
    }
  }
  
  // 🔥 Modal 관리 (타입 안전)
  const addModal = (modal: Omit<Modal, 'id'>): number => {
    const newModal: Modal = {
      id: globalUIState.nextId++,
      ...modal
    }
    
    globalUIState.modals.push(newModal)
    return newModal.id
  }
  
  const removeModal = (id: number): void => {
    const index = globalUIState.modals.findIndex(m => m.id === id)
    if (index !== -1) {
      globalUIState.modals.splice(index, 1)
    }
  }
  
  return {
    // 상태 노출 (읽기 전용으로 만들고 싶다면 readonly() 사용)
    state: globalUIState,
    
    // Toast 메서드
    addToast,
    removeToast,
    
    // Alert 메서드
    addAlert,
    removeAlert,
    
    // Loading 메서드
    addLoading,
    removeLoading,
    updateLoadingProgress,
    
    // Modal 메서드
    addModal,
    removeModal
  }
}