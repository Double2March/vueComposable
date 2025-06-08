import { reactive } from 'vue'
import type { Modal, ModalSize } from '@/types/ui'

const modalState = reactive<{
  modals: Modal[]
  nextId: number
}>({
  modals: [],
  nextId: 1
})

export function useModal() {
  const openModal = (
    component: any,
    options: {
      title?: string
      props?: Record<string, any>
      size?: ModalSize
      persistent?: boolean
    } = {}
  ): number => {
    const modal: Modal = {
      id: modalState.nextId++,
      component,
      title: options.title || '',
      props: options.props || {},
      size: options.size || 'medium',
      persistent: options.persistent || false
    }
    
    modalState.modals.push(modal)
    return modal.id
  }
  
  const closeModal = (id?: number): void => {
    if (id) {
      // 특정 모달 제거
      const index = modalState.modals.findIndex(m => m.id === id)
      if (index !== -1) {
        modalState.modals.splice(index, 1)
      }
    } else {
      // 가장 최근 모달 제거
      if (modalState.modals.length > 0) {
        modalState.modals.pop()
      }
    }
  }
  
  const closeAllModals = (): void => {
    modalState.modals.length = 0
  }
  
  return {
    modals: modalState.modals,
    openModal,
    closeModal,
    closeAllModals
  }
}