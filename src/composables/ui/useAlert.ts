import { reactive } from 'vue'
import type { Alert, AlertOptions, AlertType } from '@/types/ui'

const alertState = reactive<{
  alerts: Alert[]
  nextId: number
}>({
  alerts: [],
  nextId: 1
})

export function useAlert() {
  const alert = (
    message: string, 
    options: AlertOptions = {}
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const newAlert: Alert = {
        id: alertState.nextId++,
        message,
        title: options.title || '',
        type: options.type || 'info',
        showConfirmButton: options.showConfirmButton !== false,
        showCancelButton: options.showCancelButton || false,
        confirmText: options.confirmText || '확인',
        cancelText: options.cancelText || '취소',
        closeOnOverlay: options.closeOnOverlay !== false,
        onConfirm: async () => {
          try {
            await options.onConfirm?.()
            resolve(true)
          } catch (error) {
            console.error('Alert confirm error:', error)
            resolve(false)
          } finally {
            removeAlert(newAlert.id)
          }
        },
        onCancel: async () => {
          try {
            await options.onCancel?.()
            resolve(false)
          } catch (error) {
            console.error('Alert cancel error:', error)
            resolve(false)
          } finally {
            removeAlert(newAlert.id)
          }
        }
      }
      
      alertState.alerts.push(newAlert)
    })
  }
  
  const removeAlert = (id: number): void => {
    const index = alertState.alerts.findIndex(a => a.id === id)
    if (index !== -1) {
      alertState.alerts.splice(index, 1)
    }
  }
  
  const clearAllAlerts = (): void => {
    alertState.alerts.length = 0
  }
  
  return {
    alerts: alertState.alerts,
    alert,
    removeAlert,
    clearAllAlerts
  }
}