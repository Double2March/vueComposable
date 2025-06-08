<template>
  <div v-if="show" class="modal-overlay" @click="$emit('close')">
    <div class="modal-box" @click.stop>
      <h3>{{ title }}</h3>
      <slot></slot>
      <div class="buttons">
        <button @click="$emit('close')">취소</button>
        <button @click="$emit('save')">저장</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String
})
defineEmits(['close', 'save'])
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
  z-index: 1000;
}

.modal-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:first-child {
  background: #ccc;
}

button:last-child {
  background: #007bff;
  color: white;
}
</style>