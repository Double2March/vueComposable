<template>
  <div class="product-form">
    <div class="info">
      {{ isPortal ? '🟢 Portal 방식' : '🔴 기존 방식' }} - 상품 등록
    </div>
    
    <label>상품명:</label>
    <input v-model="productName" type="text" placeholder="상품명을 입력하세요" />
    
    <label>가격:</label>
    <input v-model="price" type="number" placeholder="0" />
    
    <label>카테고리:</label>
    <select v-model="category">
      <option value="">선택하세요</option>
      <option value="electronics">전자제품</option>
      <option value="clothing">의류</option>
      <option value="books">도서</option>
    </select>
    
    <div class="data">
      현재 데이터: {{ JSON.stringify({ name: productName, price, category }) }}
    </div>

    <!-- Portal 방식일 때만 버튼 표시 -->
    <div v-if="isPortal" class="portal-buttons">
      <button @click="$emit('close')">취소</button>
      <button @click="save">등록</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialProduct: { type: Object, default: () => ({ name: '', price: 0, category: '' }) },
  isPortal: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'save'])

const productName = ref(props.initialProduct.name || '')
const price = ref(props.initialProduct.price || 0)
const category = ref(props.initialProduct.category || '')

// props 변경 감지해서 업데이트
watch(() => props.initialProduct, (newProduct) => {
  productName.value = newProduct.name || ''
  price.value = newProduct.price || 0
  category.value = newProduct.category || ''
}, { deep: true })

const save = () => {
  const data = { name: productName.value, price: price.value, category: category.value }
  emit('save', data)
  if (props.isPortal) {
    emit('close')
  }
}

// 기존 방식에서 부모가 접근할 수 있도록
const getData = () => ({ name: productName.value, price: price.value, category: category.value })
defineExpose({ getData })
</script>

<style scoped>
.product-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info {
  background: #fff3cd;
  padding: 8px;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  color: #856404;
}

label {
  font-weight: 500;
}

input, select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.data {
  background: #f9f9f9;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
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
  background: #ccc;
}

.portal-buttons button:last-child {
  background: #ffc107;
  color: #000;
}
</style>