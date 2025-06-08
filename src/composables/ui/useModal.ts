// composables/ui/useModal.ts
import { ref, reactive, markRaw } from 'vue'

interface ModalOptions {
  title?: string
  props?: Record<string, any>
  size?: 'small' | 'medium' | 'large'
  onSave?: (data: any) => void
  onConfirm?: (data: any) => void
  onClose?: () => void
}

interface Modal {
  id: number
  component: any
  title: string
  props: Record<string, any>
  size: string
  onSave?: (data: any) => void
  onConfirm?: (data: any) => void
  onClose: () => void
}

const modals = ref<Modal[]>([])
let modalIdCounter = 0

export function useModal() {
  const openModal = (component: any, options: ModalOptions = {}) => {
    const modalId = ++modalIdCounter
    
    const modal: Modal = {
      id: modalId,
      component: markRaw(component),
      title: options.title || 'Modal',
      props: options.props || {},
      size: options.size || 'medium',
      onSave: options.onSave,
      onConfirm: options.onConfirm,
      onClose: () => closeModal(modalId)
    }

    modals.value.push(modal)
    return modalId
  }

  const closeModal = (modalId: number) => {
    const index = modals.value.findIndex(m => m.id === modalId)
    if (index > -1) {
      modals.value.splice(index, 1)
    }
  }

  const closeAllModals = () => {
    modals.value = []
  }

  return {
    modals,
    openModal,
    closeModal,
    closeAllModals
  }
}