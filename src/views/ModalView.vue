<!-- 🔥 3. 메인 비교 페이지 -->
<!-- src/views/ModalView.vue -->
<template>
  <div class="simple-test">
    <!-- 🔴 기존 방식 -->
    <div class="section old">
      <h2>🔴 기존 방식</h2>
      <p><strong>원리:</strong> 부모가 show/hide 상태 관리 → v-if로 렌더링</p>
      
      <!-- 컴포넌트 선택 -->
      <div class="component-selector">
        <label>컴포넌트 선택:</label>
        <select v-model="selectedOldComponent">
          <option value="user">👤 사용자 폼</option>
          <option value="product">📦 상품 등록</option>
          <option value="delete">🗑️ 삭제 확인</option>
        </select>
      </div>
      
      <div class="test-buttons">
        <button @click="showOld = true">모달 열기</button>
        <button @click="openOldWithData">데이터와 함께 열기</button>
        <button @click="openSecondOld">두 번째 모달 열기</button>
      </div>
      
      <div class="status">
        상태: {{ showOld ? 'OPEN' : 'CLOSED' }} | 
        선택: {{ getComponentName(selectedOldComponent) }} |
        데이터: {{ JSON.stringify(oldData) }}
      </div>

      <!-- ❌ 템플릿에 미리 선언 (조건부로 다른 컴포넌트) -->
      <SimpleOldModal 
        :show="showOld" 
        :title="`기존 방식 - ${getComponentName(selectedOldComponent)}`"
        @close="showOld = false"
        @save="saveOld"
      >
        <!-- 사용자 폼 -->
        <SimpleForm 
          v-if="selectedOldComponent === 'user'"
          ref="oldFormRef"
          :initialName="oldData.name"
          :initialEmail="oldData.email"
          :initialPhone="oldData.phone"
          :isPortal="false"
        />
        
        <!-- 상품 폼 -->
        <ProductForm 
          v-else-if="selectedOldComponent === 'product'"
          ref="oldFormRef"
          :initialProduct="oldData"
          :isPortal="false"
        />
        
        <!-- 삭제 확인 -->
        <DeleteConfirm 
          v-else-if="selectedOldComponent === 'delete'"
          ref="oldFormRef"
          :itemName="oldData.itemName || '선택된 파일'"
          :isPortal="false"
        />
      </SimpleOldModal>

      <!-- 두 번째 모달 -->
      <SimpleOldModal 
        :show="showSecondOld" 
        title="두 번째 모달 (겹침 문제)"
        @close="showSecondOld = false"
        @save="showSecondOld = false"
      >
        <div style="padding: 20px; text-align: center;">
          <p>⚠️ 기존 방식의 다중 모달 문제점:</p>
          <ul style="text-align: left;">
            <li>z-index 겹침 문제</li>
            <li>각각 별도 상태 관리 필요</li>
            <li>모달 간 데이터 공유 어려움</li>
          </ul>
        </div>
      </SimpleOldModal>
    </div>

    <!-- 🟢 Portal 방식 -->
    <div class="section new">
      <h2>🟢 Portal 방식</h2>
      <p><strong>원리:</strong> ui.openModal() 호출 → UIPortal이 동적 렌더링</p>
      
      <!-- 컴포넌트 선택 -->
      <div class="component-selector">
        <label>컴포넌트 선택:</label>
        <select v-model="selectedPortalComponent">
          <option value="user">👤 사용자 폼</option>
          <option value="product">📦 상품 등록</option>
          <option value="delete">🗑️ 삭제 확인</option>
        </select>
      </div>
      
      <div class="test-buttons">
        <button @click="showPortal">모달 열기</button>
        <button @click="showPortalWithData">데이터와 함께 열기</button>
        <button @click="showSecondPortal">두 번째 모달 열기</button>
      </div>
      
      <div class="status">
        열린 모달: {{ ui.state.modals.length }}개 |
        선택: {{ getComponentName(selectedPortalComponent) }} |
        저장된 데이터: {{ JSON.stringify(savedData) }}
      </div>
    </div>

    <!-- Portal 모달 렌더링 (ui.modals가 있다고 가정) -->
    <div v-for="modal in ui.modals" :key="modal.id">
      <div class="modal-overlay" @click="modal.onClose">
        <div class="modal-box portal-modal" @click.stop 
             :style="{ transform: `translate(${(modal.id - 1) * 20}px, ${(modal.id - 1) * 20}px)` }">
          <h3>{{ modal.title }}</h3>
          <component 
            :is="modal.component"
            v-bind="modal.props"
            @save="modal.onSave"
            @confirm="modal.onConfirm"
            @close="modal.onClose"
          />
          <div class="buttons" v-if="!modal.props.isPortal">
            <button @click="modal.onClose">취소</button>
            <button @click="modal.onClose">확인</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 실행 로그 -->
    <div class="log">
      <h3>📋 실행 로그</h3>
      <div class="log-box">
        <div v-for="log in logs" :key="log.id" :class="log.type">
          {{ log.message }}
        </div>
      </div>
      <button @click="logs = []">로그 지우기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUI } from '@/composables/ui/useUI'
import SimpleOldModal from '@/components/SimpleOldModal.vue'
import SimpleForm from '@/components/SimpleForm.vue'
import ProductForm from '@/components/ProductForm.vue'
import DeleteConfirm from '@/components/DeleteConfirm.vue'

const ui = useUI()

// 컴포넌트 선택
const selectedOldComponent = ref('user')
const selectedPortalComponent = ref('user')

// 🔴 기존 방식 상태
const showOld = ref(false)
const showSecondOld = ref(false)
const oldData = ref({ name: '', email: '', phone: '', price: 0, category: '', itemName: '' })
const oldFormRef = ref(null)

// 🟢 Portal 방식 상태
const savedData = ref({})

// 로그
const logs = ref([])
let logId = 0

const addLog = (message, type = 'info') => {
  logs.value.push({ id: logId++, message, type })
  console.log(message)
}

// 컴포넌트 이름 매핑
const getComponentName = (type) => {
  const names = {
    user: '사용자 폼',
    product: '상품 등록',
    delete: '삭제 확인'
  }
  return names[type] || type
}

// 🔴 기존 방식
const openOldWithData = () => {
  const testData = {
    user: { name: '홍길동', email: 'hong@test.com', phone: '010-1234-5678' },
    product: { name: '테스트 상품', price: 10000, category: 'electronics' },
    delete: { itemName: '중요한 파일.pdf' }
  }
  
  oldData.value = { ...oldData.value, ...testData[selectedOldComponent.value] }
  showOld.value = true
  addLog(`🔴 기존: ${getComponentName(selectedOldComponent.value)} 데이터와 함께 열기`, 'old')
}

// 🔴 기존 방식
const saveOld = () => {
  if (oldFormRef.value) {
    const data = oldFormRef.value.getData ? oldFormRef.value.getData() : oldFormRef.value.getConfirmation()
    oldData.value = { ...oldData.value, ...data }
    addLog(`🔴 기존: emit으로 저장 완료 - ${JSON.stringify(data)}`, 'old')
    showOld.value = false
    ui.success(`기존 방식으로 ${getComponentName(selectedOldComponent.value)} 처리 완료!`)
  }
}

// 🔴 기존 방식
const openSecondOld = () => {
  showSecondOld.value = true
  addLog('🔴 기존: 두 번째 모달 열기 (겹침 문제)', 'old')
}

// 🟢 Portal 방식
const getPortalComponent = () => {
  const components = {
    user: SimpleForm,
    product: ProductForm,
    delete: DeleteConfirm
  }
  return components[selectedPortalComponent.value]
}

const getPortalProps = (withData = false) => {
  if (!withData) {
    return {
      user: { initialName: '', initialEmail: '', initialPhone: '', isPortal: true },
      product: { initialProduct: { name: '', price: 0, category: '' }, isPortal: true },
      delete: { itemName: '선택된 항목', isPortal: true }
    }[selectedPortalComponent.value]
  }

  return {
    user: { initialName: '김철수', initialEmail: 'kim@test.com', initialPhone: '010-5555-6666', isPortal: true },
    product: { initialProduct: { name: '수정할 상품', price: 25000, category: 'clothing' }, isPortal: true },
    delete: { itemName: '삭제할 파일.docx', isPortal: true }
  }[selectedPortalComponent.value]
}

// 🟢 Portal 방식
const showPortal = () => {
  addLog(`🟢 Portal: ${getComponentName(selectedPortalComponent.value)} 모달 열기`, 'new')
  
  const component = getPortalComponent()
  const props = getPortalProps()
  
  ui.openModal(component, {
    title: `Portal 방식 - ${getComponentName(selectedPortalComponent.value)}`,
    props,
    size: 'small',
    onSave: (data) => {
      savedData.value = { ...savedData.value, [selectedPortalComponent.value]: data }
      addLog(`🟢 Portal: 콜백으로 저장 완료 - ${JSON.stringify(data)}`, 'new')
      ui.success(`Portal 방식으로 ${getComponentName(selectedPortalComponent.value)} 처리 완료!`)
    },
    onConfirm: (data) => {
      savedData.value = { ...savedData.value, [selectedPortalComponent.value]: data }
      addLog(`🟢 Portal: 삭제 확인됨 - ${JSON.stringify(data)}`, 'new')
      ui.success('삭제가 확인되었습니다!')
    }
  })
  
  addLog('🟢 Portal: 동적으로 컴포넌트 생성됨', 'new')
}

// 🟢 Portal 방식
const showPortalWithData = () => {
  addLog(`🟢 Portal: ${getComponentName(selectedPortalComponent.value)} 초기 데이터와 함께 열기`, 'new')
  
  const component = getPortalComponent()
  const props = getPortalProps(true)
  
  ui.openModal(component, {
    title: `Portal - ${getComponentName(selectedPortalComponent.value)} 수정`,
    props,
    size: 'small',
    onSave: (result) => {
      savedData.value = { ...savedData.value, [selectedPortalComponent.value]: result }
      addLog(`🟢 Portal: 수정 데이터 저장 - ${JSON.stringify(result)}`, 'new')
      ui.success('데이터 수정 완료!')
    },
    onConfirm: (result) => {
      savedData.value = { ...savedData.value, [selectedPortalComponent.value]: result }
      addLog(`🟢 Portal: 삭제 확인됨 - ${JSON.stringify(result)}`, 'new')
      ui.success('삭제가 확인되었습니다!')
    }
  })
}

// 🟢 Portal 방식
const showSecondPortal = () => {
  const component = getPortalComponent()
  const props = getPortalProps(true)
  
  ui.openModal(component, {
    title: `두 번째 Portal - ${getComponentName(selectedPortalComponent.value)}`,
    props,
    size: 'small',
    onSave: (data) => {
      savedData.value = { ...savedData.value, [`second_${selectedPortalComponent.value}`]: data }
      addLog(`🟢 Portal: 두 번째 모달 저장 - ${JSON.stringify(data)}`, 'new')
      ui.success('두 번째 Portal 모달 처리 완료!')
    },
    onConfirm: (data) => {
      savedData.value = { ...savedData.value, [`second_${selectedPortalComponent.value}`]: data }
      addLog(`🟢 Portal: 두 번째 모달 확인 - ${JSON.stringify(data)}`, 'new')
      ui.success('두 번째 Portal 모달 확인!')
    }
  })
  
  addLog('🟢 Portal: 두 번째 모달 열기 (스택 관리)', 'new')
}

// 초기 로그
addLog('🔬 간단 모달 테스트 시작', 'system')
</script>

<style scoped>
.simple-test {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.section {
  margin: 30px 0;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid;
}

.section.old {
  background: #fff5f5;
  border-color: #fc8181;
}

.section.new {
  background: #f0fff4;
  border-color: #68d391;
}

.section h2 {
  margin-top: 0;
}

.section p {
  background: rgba(255,255,255,0.7);
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.section button {
  margin: 5px 10px 5px 0;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.status {
  margin-top: 15px;
  padding: 10px;
  background: rgba(255,255,255,0.7);
  border-radius: 4px;
  font-size: 14px;
  font-family: monospace;
}

.log {
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.log-box {
  max-height: 200px;
  overflow-y: auto;
  background: #343a40;
  color: white;
  padding: 15px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
}

.log-box .old {
  color: #fbb6ce;
}

.log-box .new {
  color: #9ae6b4;
}

.log-box .system {
  color: #90cdf4;
}

.log button {
  margin-top: 10px;
  padding: 5px 10px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.component-selector {
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(255,255,255,0.5);
  border-radius: 4px;
}

.component-selector label {
  font-weight: 500;
  margin-right: 10px;
}

.component-selector select {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.test-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

/* Portal 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.portal-modal {
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  border: 2px solid #68d391;
}

.modal-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.buttons button:first-child {
  background: #ccc;
}

.buttons button:last-child {
  background: #007bff;
  color: white;
}
</style>