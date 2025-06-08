<!-- 사용 예제 컴포넌트 -->
<template>
  <div class="example-container">
    <h1>UI 시스템 사용 예제</h1>
    
    <!-- Toast -->
    <section class="example-section">
      <h2>🍞 Toast 사용법</h2>
      <div class="button-group">
        <button @click="showSuccessToast">Success Toast</button>
        <button @click="showErrorToast">Error Toast</button>
        <button @click="showWarningToast">Warning Toast</button>
        <button @click="showInfoToast">Info Toast</button>
        <button @click="showCustomToast">Custom Duration</button>
      </div>
    </section>

    <!-- Alert -->
    <section class="example-section">
      <h2>🚨 Alert 사용법</h2>
      <div class="button-group">
        <button @click="showSimpleAlert">Simple Alert</button>
        <button @click="showConfirmAlert">Confirm Alert</button>
        <button @click="showCustomAlert">Custom Alert</button>
        <button @click="showComplexAlert">Complex Alert</button>
      </div>
    </section>

    <!-- Loading -->
    <section class="example-section">
      <h2>⏳ Loading 사용법</h2>
      <div class="button-group">
        <button @click="showSimpleLoading">Simple Loading</button>
        <button @click="showProgressLoading">Progress Loading</button>
        <button @click="simulatePageTransition">Page Transition</button>
        <button @click="ui.hideAllLoading()">Hide All Loading</button>
      </div>
    </section>

    <!-- Modal -->
    <section class="example-section">
      <h2>🪟 Modal 사용법</h2>
      <div class="button-group">
        <button @click="showSimpleModal">Simple Modal</button>
        <button @click="showUserFormModal">👤 사용자 폼</button>
        <button @click="showProductFormModal">📦 상품 폼</button>
        <button @click="showDeleteConfirmModal">🗑️ 삭제 확인</button>
      </div>
    </section>

    <!-- 개별 composable 사용 예제 -->
    <section class="example-section">
      <h2>🔧 개별 Composable 사용</h2>
      <div class="button-group">
        <button @click="useIndividualToast">Individual Toast</button>
        <button @click="useIndividualAlert">Individual Alert</button>
        <button @click="useIndividualLoading">Individual Loading</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUI } from '@/composables/ui/useUI'
import { useToast } from '@/composables/ui/useToast'
import { useAlert } from '@/composables/ui/useAlert'
import { useLoading } from '@/composables/ui/useLoading'
import { useModal } from '@/composables/ui/useModal'
// 3개 폼 컴포넌트 import
import SimpleForm from '@/components/SimpleForm.vue'
import ProductForm from '@/components/ProductForm.vue'
import DeleteConfirm from '@/components/DeleteConfirm.vue'

// 🔥 통합 UI 사용
const ui = useUI()

// Toast 예제들
const showSuccessToast = () => {
  ui.success('작업이 성공적으로 완료되었습니다!')
}

const showErrorToast = () => {
  ui.error('오류가 발생했습니다. 다시 시도해주세요.')
}

const showWarningToast = () => {
  ui.warning('주의: 이 작업은 되돌릴 수 없습니다.')
}

const showInfoToast = () => {
  ui.info('새로운 업데이트가 있습니다.')
}

const showCustomToast = () => {
  ui.toast('5초 후에 사라지는 메시지', 'info', 5000)
}

// Alert 예제들
const showSimpleAlert = async () => {
  await ui.alert('간단한 알림 메시지입니다.')
  ui.success('Alert가 닫혔습니다!')
}

const showConfirmAlert = async () => {
  const confirmed = await ui.confirm('정말로 삭제하시겠습니까?', '삭제 확인')
  if (confirmed) {
    ui.success('삭제가 완료되었습니다.')
  } else {
    ui.info('삭제가 취소되었습니다.')
  }
}

const showCustomAlert = async () => {
  await ui.alert('사용자 정의 Alert입니다.', {
    title: '커스텀 제목',
    type: 'warning',
    confirmText: '알겠습니다',
    closeOnOverlay: false
  })
}

const showComplexAlert = async () => {
  const result = await ui.alert('복잡한 작업을 수행하시겠습니까?', {
    title: '작업 확인',
    type: 'question',
    showCancelButton: true,
    confirmText: '실행',
    cancelText: '나중에',
    onConfirm: async () => {
      ui.success('작업이 시작되었습니다!')
      // 여기서 실제 작업 수행
    },
    onCancel: async () => {
      ui.info('작업이 연기되었습니다.')
    }
  })
}

// Loading 예제들
const showSimpleLoading = () => {
  const loadingId = ui.showLoading('데이터를 불러오는 중...')
  
  // 3초 후 자동 종료
  setTimeout(() => {
    ui.hideLoading(loadingId)
    ui.success('데이터 로딩 완료!')
  }, 3000)
}

const showProgressLoading = () => {
  const loadingId = ui.showLoading('파일 업로드 중...', 'circle', true)
  
  let progress = 0
  const interval = setInterval(() => {
    progress += 10
    ui.updateProgress(loadingId, progress)
    
    if (progress >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        ui.hideLoading(loadingId)
        ui.success('업로드 완료!')
      }, 500)
    }
  }, 300)
}

// 페이지 전환 시뮬레이션 (실제 router 사용 시)
const simulatePageTransition = () => {
  // 페이지 나가기 전
  const loadingId = ui.showLoading('페이지를 이동하는 중...')
  
  // 페이지 전환 시뮬레이션
  setTimeout(() => {
    // 다음 페이지에서 로딩 숨기기
    ui.hideLoading(loadingId)
    ui.success('페이지 이동 완료!')
  }, 2000)
}

// Modal 예제들
const showSimpleModal = () => {
  // 간단한 컴포넌트 정의 (실제로는 별도 파일)
  const SimpleModalContent = {
    template: `
      <div style="padding: 20px; text-align: center;">
        <h3>간단한 모달</h3>
        <p>이것은 간단한 모달 내용입니다.</p>
        <button @click="$emit('close')" class="btn btn-confirm">
          닫기
        </button>
      </div>
    `,
    emits: ['close']
  }
  
  ui.openModal(SimpleModalContent, {
    title: '간단한 모달',
    size: 'small'
  })
}

// 🔥 3개 폼 모달 추가 (컴포넌트 사용)
const showUserFormModal = () => {
  ui.openModal(SimpleForm, {
    title: '👤 사용자 폼',
    props: {
      initialName: '',
      initialEmail: '',
      initialPhone: '',
      isPortal: true
    },
    size: 'medium',
    onSave: (data) => {
      ui.success(`사용자 정보 저장 완료: ${JSON.stringify(data)}`)
    }
  })
}

const showProductFormModal = () => {
  ui.openModal(ProductForm, {
    title: '📦 상품 폼',
    props: {
      initialProduct: { name: '', price: 0, category: '' },
      isPortal: true
    },
    size: 'medium',
    onSave: (data) => {
      ui.success(`상품 정보 저장 완료: ${JSON.stringify(data)}`)
    }
  })
}

const showDeleteConfirmModal = () => {
  ui.openModal(DeleteConfirm, {
    title: '🗑️ 삭제 확인',
    props: {
      itemName: '중요한 파일.pdf',
      isPortal: true
    },
    size: 'small',
    onConfirm: (data) => {
      ui.success(`삭제 확인됨: ${JSON.stringify(data)}`)
    }
  })
}

// 개별 composable 사용 예제들
const useIndividualToast = () => {
  const { toast } = useToast()
  toast('개별 Toast Composable 사용!', 'success')
}

const useIndividualAlert = async () => {
  const { alert } = useAlert()
  await alert('개별 Alert Composable 사용!', {
    title: '개별 사용',
    type: 'info'
  })
}

const useIndividualLoading = () => {
  const { showLoading, hideLoading } = useLoading()
  const loadingId = showLoading('개별 Loading Composable 사용!')
  
  setTimeout(() => {
    hideLoading(loadingId)
  }, 2000)
}
</script>

<style scoped>
.example-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.example-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.example-section h2 {
  margin-top: 0;
  color: #1f2937;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.button-group button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.button-group button:hover {
  background: #2563eb;
}

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
</style>