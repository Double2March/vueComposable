<!-- Portal + TypeScript 완전 정복 -->
<template>
  <div style="transform: scale(0.5); overflow: hidden;">
    <h2>부모 컨테이너 (변형됨)</h2>
    <button @click="showModal = true">모달 열기</button>
    
    <!-- 🔥 일반 모달 (문제 상황) -->
    <div v-if="showModal && !usePortal" class="modal">
      <p>이 모달은 부모의 transform 영향을 받아요!</p>
      <button @click="showModal = false">닫기</button>
    </div>
    
    <!-- 🌟 Portal 모달 (해결!) -->
    <Teleport to="body" v-if="showModal && usePortal">
      <div class="modal-overlay">
        <div class="modal">
          <p>이 모달은 body에 직접! 자유로워요! 🚀</p>
          <button @click="showModal = false">닫기</button>
        </div>
      </div>
    </Teleport>
    
    <label>
      <input type="checkbox" v-model="usePortal">
      Portal 사용하기
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// 🔥 타입 정의
interface ModalConfig {
  title: string
  message: string
  confirmText: string
  cancelText: string
  onConfirm?: () => void
  onCancel?: () => void
}

// 🔥 타입 안전한 상태 관리
const showModal = ref<boolean>(false)
const usePortal = ref<boolean>(true)

const modalConfig = reactive<ModalConfig>({
  title: '확인',
  message: '이 모달은 body에 직접! 자유로워요! 🚀',
  confirmText: '확인',
  cancelText: '취소',
  onConfirm: () => console.log('확인 클릭!'),
  onCancel: () => console.log('취소 클릭!')
})

// 🔥 타입 안전한 이벤트 핸들러
const handleOverlayClick = (): void => {
  showModal.value = false
}

const handleConfirm = (): void => {
  modalConfig.onConfirm?.()
  showModal.value = false
}

const handleCancel = (): void => {
  modalConfig.onCancel?.()
  showModal.value = false
}

onMounted(() => {
  showModal.value = true
})

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}

.modal-buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-confirm, .btn-cancel {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.btn-confirm {
  background: #3b82f6;
  color: white;
}

.btn-cancel {
  background: #f3f4f6;
  color: #374151;
}
</style>