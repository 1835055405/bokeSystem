<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <button @click="closeModal">Close</button>
      </div>
      <div class="modal-content"><slot></slot></div>
      <div class="modal-footer">
        <button :disabled="submitting" @click="handleCancel()">Cancel</button>
        <button :disabled="submitting" @click="handleSubmit()">Submit</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
let title = ref("hello");
let visible = ref(false);
let submitting = ref(false);
function openModal() {
  visible.value = true;
}
function closeModal() {
  visible.value = false;
}
function handleCancel() {
  this.closeModal();
}
const handleSubmit = async () => {
  try {
    submitting.value = true;
    await submit();
    closeModal();
  } catch (error) {
    console.error("Submit failed:", error);
  } finally {
    submitting.value = false;
  }
};
const submit = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = 1;
      if (isSuccess) {
        resolve(isSuccess);
      } else {
        reject("Submission failed");
      }
    }, 1000);
  });
};
</script>
