<template>
  <!-- Modal dialog -->
  <transition
      enter-active-class="transition ease-in-out duration-200"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in-out duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
  >
    <div
        v-show="emojiModal.status"
        class="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
        role="dialog"
        aria-modal="true"
    >
      <div ref="modalContent" class="absolute right-[50px] bottom-[60px] max-w-xs w-full max-h-full">
        <EmojiPicker :native="true" @select="onSelectEmoji" />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useMessangers } from "../utils/messengers.js";
import { emojiModal } from "../utils/modalVariables.js";
import { onMounted, onUnmounted, ref } from "vue";
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const modalContent = ref(null);
const { addEmojiToMessage } = useMessangers()

const onSelectEmoji = function (emoji) {
  console.log(emoji)
  addEmojiToMessage(emoji.i)
}
const closeModal = function () {
  emojiModal.value.status = false;
};

const clickHandler = ({ target }) => {
  if (emojiModal.value.stayOpen || modalContent.value.contains(target)) {
    emojiModal.value.stayOpen = false;
    return;
  }

  closeModal();
};

onMounted(() => {
  document.addEventListener("click", clickHandler);
});

onUnmounted(() => {
  document.removeEventListener("click", clickHandler);
});
</script>
