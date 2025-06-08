<!-- components/UIPortal.vue - 수정된 UI Portal -->
<template>
  <Teleport to="body">
    <div id="ui-portal">
      <!-- 🍞 Toast 컨테이너 -->
      <TransitionGroup 
        name="toast" 
        tag="div" 
        class="toast-container"
      >
        <div 
          v-for="toast in toasts" 
          :key="toast.id"
          :class="getToastClasses(toast)"
          @click="removeToast(toast.id)"
        >
          <div class="toast-icon">
            <component :is="getToastIcon(toast.type)" />
          </div>
          <span class="toast-message">{{ toast.message }}</span>
          <button 
            class="toast-close"
            @click.stop="removeToast(toast.id)"
          >
            ×
          </button>
        </div>
      </TransitionGroup>
      
      <!-- 🚨 Alert 컨테이너 - TransitionGroup으로 수정 -->
      <TransitionGroup name="overlay" tag="div">
        <div 
          v-for="alert in alerts"
          :key="alert.id"
          class="alert-overlay"
          @click="handleAlertOverlay(alert)"
        >
          <div class="alert-modal" @click.stop>
            <div v-if="alert.title" class="alert-title">
              {{ alert.title }}
            </div>
            <div class="alert-message">{{ alert.message }}</div>
            <div class="alert-buttons">
              <button 
                v-if="alert.showCancelButton"
                @click="handleAlertCancel(alert)"
                class="btn btn-cancel"
              >
                {{ alert.cancelText }}
              </button>
              <button 
                @click="handleAlertConfirm(alert)"
                class="btn btn-confirm"
              >
                {{ alert.confirmText }}
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
      
      <!-- ⏳ Loading 컨테이너 - 단일 요소이므로 Transition 유지 -->
      <Transition name="overlay">
        <div 
          v-if="loadings.length > 0"
          class="loading-overlay"
        >
          <div class="loading-modal">
            <div class="loading-spinner">
              <component :is="getLoadingComponent(loadings[loadings.length - 1].type)" />
            </div>
            <div class="loading-message">
              {{ loadings[loadings.length - 1].message }}
            </div>
            <div 
              v-if="loadings[loadings.length - 1].showProgress" 
              class="loading-progress"
            >
              <div class="progress-bar">
                <div 
                  class="progress-fill"
                  :style="{ width: `${loadings[loadings.length - 1].progress}%` }"
                ></div>
              </div>
              <span class="progress-text">
                {{ loadings[loadings.length - 1].progress }}%
              </span>
            </div>
          </div>
        </div>
      </Transition>
      
      <!-- 🪟 Modal 컨테이너 - TransitionGroup으로 수정 -->
      <TransitionGroup name="overlay" tag="div">
        <div 
          v-for="modal in modals"
          :key="modal.id"
          class="modal-overlay"
          @click="handleModalOverlay(modal)"
        >
          <div 
            :class="getModalClasses(modal)"
            @click.stop
          >
            <div v-if="modal.title" class="modal-header">
              <h3 class="modal-title">{{ modal.title }}</h3>
              <button 
                @click="closeModal(modal.id)"
                class="modal-close"
              >
                ×
              </button>
            </div>
            <div class="modal-body">
              <component 
                :is="modal.component" 
                v-bind="modal.props"
                @close="closeModal(modal.id)"
              />
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from '@/composables/ui/useToast'
import { useAlert } from '@/composables/ui/useAlert'  
import { useLoading } from '@/composables/ui/useLoading'
import { useModal } from '@/composables/ui/useModal'
import type { Toast, Alert, Loading, Modal, ToastType, LoadingType } from '@/types/ui'

// Icons (간단한 SVG 컴포넌트들)
import CheckIcon from '@/components/icons/CheckIcon.vue'
import ErrorIcon from '@/components/icons/ErrorIcon.vue'
import WarningIcon from '@/components/icons/WarningIcon.vue'
import InfoIcon from '@/components/icons/InfoIcon.vue'
import CircleLoader from '@/components/loaders/CircleLoader.vue'
import DotsLoader from '@/components/loaders/Dotsloader.vue'

// 각 composable에서 상태와 메서드 가져오기
const { toasts, removeToast } = useToast()
const { alerts, removeAlert } = useAlert()
const { loadings } = useLoading()
const { modals, closeModal } = useModal()

// 🔥 타입 안전한 클래스 생성
const getToastClasses = (toast: Toast): string[] => {
  return [
    'toast',
    `toast--${toast.type}`
  ]
}

const getModalClasses = (modal: Modal): string[] => {
  return [
    'modal-content',
    `modal--${modal.size}`
  ]
}

// 🔥 타입 안전한 아이콘 매핑
const getToastIcon = (type: ToastType) => {
  const iconMap: Record<ToastType, any> = {
    success: CheckIcon,
    error: ErrorIcon,
    warning: WarningIcon,
    info: InfoIcon
  }
  return iconMap[type] || InfoIcon
}

// 🔥 타입 안전한 로딩 컴포넌트 매핑
const getLoadingComponent = (type: LoadingType) => {
  const loaderMap: Record<LoadingType, any> = {
    circle: CircleLoader,
    dots: DotsLoader,
    progress: CircleLoader
  }
  return loaderMap[type] || CircleLoader
}

// 🔥 이벤트 핸들러들
const handleAlertConfirm = async (alert: Alert): Promise<void> => {
  await alert.onConfirm?.()
}

const handleAlertCancel = async (alert: Alert): Promise<void> => {
  await alert.onCancel?.()
}

const handleAlertOverlay = (alert: Alert): void => {
  if (alert.closeOnOverlay) {
    removeAlert(alert.id)
  }
}

const handleModalOverlay = (modal: Modal): void => {
  if (!modal.persistent) {
    closeModal(modal.id)
  }
}
</script>

<style scoped>
/* Toast 스타일 */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
}

.toast {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  max-width: 500px;
  pointer-events: auto;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toast--success { border-left: 4px solid #10b981; }
.toast--error { border-left: 4px solid #ef4444; }
.toast--warning { border-left: 4px solid #f59e0b; }
.toast--info { border-left: 4px solid #3b82f6; }

.toast-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.toast-message {
  flex: 1;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.toast-close:hover {
  background-color: rgba(0,0,0,0.1);
}

/* Alert 스타일 */
.alert-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(2px);
}

.alert-modal {
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.alert-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1f2937;
}

.alert-message {
  margin-bottom: 20px;
  line-height: 1.5;
  color: #4b5563;
}

.alert-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

/* Loading 스타일 */
.loading-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(1px);
}

.loading-modal {
  background: white;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  min-width: 200px;
}

.loading-spinner {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.loading-message {
  font-size: 16px;
  color: #4b5563;
  margin-bottom: 16px;
}

.loading-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #3b82f6;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 14px;
  color: #6b7280;
  min-width: 40px;
}

/* Modal 스타일 */
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(2px);
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.modal--small { width: 90%; max-width: 400px; }
.modal--medium { width: 90%; max-width: 600px; }
.modal--large { width: 90%; max-width: 800px; }
.modal--fullscreen { width: 95%; max-width: none; height: 95%; max-height: none; }

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.modal-close:hover {
  background-color: rgba(0,0,0,0.1);
}

.modal-body {
  padding: 0 24px 24px;
}

/* 공통 버튼 스타일 */
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-cancel {
  background: #f3f4f6;
  color: #374151;
}

.btn-cancel:hover {
  background: #e5e7eb;
}

.btn-confirm {
  background: #3b82f6;
  color: white;
}

.btn-confirm:hover {
  background: #2563eb;
}

/* 애니메이션 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}
</style>