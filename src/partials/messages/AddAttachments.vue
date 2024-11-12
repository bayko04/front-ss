<template>
  <div class="w-[25px] h-[25px]"> 
    <label for="fileInput" class="shrink-0 text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400 cursor-pointer">
      <span class="sr-only">Add</span>
      <template v-if="isHovered">
        <!-- Изображение при наведении -->
        <img class="w-full h-full" src="../../images/icons/paperclipHover.svg" alt="" @mouseleave="isHovered = false">
      </template>
      <template v-else>
        <!-- Исходное изображение -->
        <img class="w-full h-full" src="../../images/icons/paperclip.svg" alt="" @mouseover="isHovered = true">
      </template>
    </label>
    <input id="fileInput" type="file" style="display: none;" ref="fileInput" @change="handleFileChange" multiple>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMessangers } from "../../utils/messengers.js";
import { fileModal } from "../../utils/modalVariables.js";
const { activeChat } = await useMessangers();
const fileInput = ref(null);

const isHovered = ref(false);
const defaultImageSrc = '../../images/icons/paperclip.svg';
const hoverImageSrc = '../../images/icons/paperclip.svg';

const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files);
  activeChat.value.message.attachments = selectedFiles;
  fileModal.value = true;

  fileInput.value.value = ''
}
</script>