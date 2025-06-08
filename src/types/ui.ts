// types/ui.ts - UI 시스템 타입 정의
export type ToastType = 'success' | 'error' | 'warning' | 'info'
export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'question'
export type LoadingType = 'circle' | 'dots' | 'progress'
export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen'

export interface Toast {
  id: number
  message: string
  type: ToastType
  duration?: number
  createdAt: number
}

export interface AlertOptions {
  title?: string | null
  type?: AlertType | null
  showConfirmButton?: boolean | null
  showCancelButton?: boolean | null
  confirmText?: string | null
  cancelText?: string | null
  onConfirm?: (() => void | Promise<void>) | null
  onCancel?: (() => void | Promise<void>) | null
  closeOnOverlay?: boolean | null
}

export interface Alert {
  id: number
  message: string
  title: string
  type: AlertType
  showConfirmButton: boolean
  showCancelButton: boolean
  confirmText: string
  cancelText: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
  closeOnOverlay: boolean
}

export interface Loading {
  id: number
  message: string
  type: LoadingType
  showProgress: boolean
  progress: number
  createdAt: number
}

export interface Modal {
  id: number
  component: any
  title: string
  props: Record<string, any>
  size: ModalSize
  persistent: boolean
}