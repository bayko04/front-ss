<template>
  <div>
    <label for="fileInput" class="shrink-0 text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400 cursor-pointer">
      <span class="sr-only">Add</span>
      <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.98 5.38 18.62.02 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z" />
      </svg>
    </label>
    <input id="fileInput" type="file" style="display: none;" ref="fileInput" @change="handleFileChange" multiple>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { fileModal, useMessangers } from "../../utils/messengers.js";

const { activeChat } = await useMessangers();
const fileInput = ref(null);

const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files);
  activeChat.value.message.attachments = selectedFiles;
  fileModal.value = true;

  fileInput.value.value = ''
}
</script>