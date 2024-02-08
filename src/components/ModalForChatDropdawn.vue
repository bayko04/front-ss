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
        v-show="checkedMessageData.message"
        class="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
        role="dialog"
        aria-modal="true"
    >
      <div
          ref="modalContent"
          :style="checkedMessageData.style"
          class="bg-white dark:bg-slate-800 rounded shadow-lg overflow-auto max-w-[150px] mx-auto w-full max-h-full"
      >
        <div class="text-sm">
          <ul class="list-none p-0">
            <li class="border-b cursor-pointer" @click="reply()">
              <a class="block w-full font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 py-2 px-3 transition-all duration-300">
                Ответить
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { checkedMessageData, useMessangers } from "../utils/messengers.js";
import { onMounted, onUnmounted, ref } from "vue";
const modalContent = ref(null);

const { setReplyMessage } = useMessangers()

const reply = function() {
  setReplyMessage(checkedMessageData.value.message)
  closeModal()
}
const closeModal = function () {
  checkedMessageData.value.message = undefined;
  checkedMessageData.value.styles = undefined;
};

const clickHandler = ({ target }) => {
  if (checkedMessageData.value.stayOpen || modalContent.value.contains(target)) {
    checkedMessageData.value.stayOpen = false;
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
