<template>
  <div class="delete-confirm">
    <div class="info">
      {{ isPortal ? '🟢 Portal 방식' : '🔴 기존 방식' }} - 삭제 확인
    </div>
    
    <div class="warning-icon">⚠️</div>
    <h3>정말로 삭제하시겠습니까?</h3>
    
    <div class="item-info">
      <p><strong>삭제할 항목:</strong></p>
      <p class="item-name">{{ itemName || '선택된 항목' }}</p>
      <p class="warning-text">이 작업은 되돌릴 수 없습니다.</p>
    </div>

    <!-- Portal 방식일 때만 버튼 표시 -->
    <div v-if="isPortal" class="portal-buttons">
      <button @click="$emit('close')">취소</button>
      <button @click="confirmDelete" class="danger">삭제</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  itemName: { type: String, default: '항목' },
  isPortal: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'confirm'])

const confirmDelete = () => {
  emit('confirm', { itemName: props.itemName })
  if (props.isPortal) {
    emit('close')
  }
}

// 기존 방식에서 부모가 접근할 수 있도록
const getData = () => ({ confirmed: true, itemName: props.itemName })
defineExpose({ getData })
</script>

<style scoped>
.delete-confirm {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  text-align: center;
}

.info {
  background: #f8d7da;
  padding: 8px;
  border-radius: 4px;
  font-weight: bold;
  color: #721c24;
  width: 100%;
}

.warning-icon {
  font-size: 48px;
}

h3 {
  margin: 0;
  color: #721c24;
}

.item-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  width: 100%;
}

.item-name {
  font-weight: bold;
  color: #dc3545;
  font-size: 16px;
  margin: 5px 0;
}

.warning-text {
  color: #6c757d;
  font-style: italic;
  font-size: 14px;
}

.portal-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.portal-buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.portal-buttons button:first-child {
  background: #6c757d;
  color: white;
}

.portal-buttons button.danger {
  background: #dc3545;
  color: white;
}
</style>