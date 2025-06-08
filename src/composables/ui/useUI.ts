import { useToast } from './useToast'
import { useAlert } from './useAlert'
import { useLoading } from './useLoading'
import { useModal } from './useModal'

export function useUI() {
  const toastInstance = useToast()
  const alertInstance = useAlert()
  const loadingInstance = useLoading()
  const modalInstance = useModal()
  
  return {
    // Toast 단축 메서드들
    toast: toastInstance.toast,
    success: (msg: string, duration?: number) => toastInstance.toast(msg, 'success', duration),
    error: (msg: string, duration?: number) => toastInstance.toast(msg, 'error', duration),
    warning: (msg: string, duration?: number) => toastInstance.toast(msg, 'warning', duration),
    info: (msg: string, duration?: number) => toastInstance.toast(msg, 'info', duration),
    
    // Alert 메서드
    alert: alertInstance.alert,
    confirm: (msg: string, title?: string) => alertInstance.alert(msg, { 
      title, 
      showCancelButton: true,
      type: 'question' 
    }),
    
    // Loading 메서드  
    showLoading: loadingInstance.showLoading,
    hideLoading: loadingInstance.hideLoading,
    hideAllLoading: loadingInstance.hideAllLoading,
    updateProgress: loadingInstance.updateProgress,
    
    // Modal 메서드
    openModal: modalInstance.openModal,
    closeModal: modalInstance.closeModal,
    closeAllModals: modalInstance.closeAllModals,
    
    // 상태 접근
    state: {
      toasts: toastInstance.toasts,
      alerts: alertInstance.alerts,
      loadings: loadingInstance.loadings,
      modals: modalInstance.modals
    }
  }
}