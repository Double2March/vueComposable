<template>
  <div class="simple-form">
    <div class="info">
      {{ isPortal ? '🟢 Portal 방식' : '🔴 기존 방식' }} - 사용자 폼
    </div>
    
    <label>이름:</label>
    <input v-model="name" type="text" placeholder="이름을 입력하세요" />
    
    <label>이메일:</label>
    <input v-model="email" type="email" placeholder="이메일을 입력하세요" />
    
    <label>전화번호:</label>
    <input v-model="phone" type="tel" placeholder="전화번호를 입력하세요" />
    
    <div class="data">
      현재 데이터: {{ JSON.stringify({ name, email, phone }) }}
    </div>

    <!-- Portal 방식일 때만 버튼 표시 -->
    <div v-if="isPortal" class="portal-buttons">
      <button @click="$emit('close')">닫기</button>
      <button @click="save">저장</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialName: { type: String, default: '' },
  initialEmail: { type: String, default: '' },
  initialPhone: { type: String, default: '' },
  isPortal: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'save'])

const name = ref(props.initialName)
const email = ref(props.initialEmail)
const phone = ref(props.initialPhone)

// props 변경 감지해서 업데이트
watch(() => [props.initialName, props.initialEmail, props.initialPhone], () => {
  name.value = props.initialName
  email.value = props.initialEmail
  phone.value = props.initialPhone
})

const save = () => {
  const data = { name: name.value, email: email.value, phone: phone.value }
  emit('save', data)
  if (props.isPortal) {
    emit('close')
  }
}

// 기존 방식에서 부모가 접근할 수 있도록
const getData = () => ({ name: name.value, email: email.value, phone: phone.value })
defineExpose({ getData })
</script>

<style scoped>
.simple-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info {
  background: #f0f8ff;
  padding: 8px;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
}

label {
  font-weight: 500;
}

input {
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
  background: #28a745;
  color: white;
}
</style>