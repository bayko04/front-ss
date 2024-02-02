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
    <div v-show="checkedMessageData.message" class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6" role="dialog" aria-modal="true">
      <div ref="modalContent" :style="checkedMessageData.style" class="bg-white dark:bg-slate-800 rounded shadow-lg max-w-[200px] overflow-auto w-full max-h-full">
        <div class="p-6">
          <div class="relative">
            <!-- Close button -->
            <button class="absolute top-0 right-0 text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400" @click.stop="closeModal">
              <div class="sr-only">Close</div>
              <svg class="w-4 h-4 fill-current">
                <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
              </svg>
            </button>
            <div>test</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { checkedMessageData, useMessangers} from "../utils/messengers.js"
import {onMounted, onUnmounted, ref} from "vue";
const modalContent = ref(null)
const closeModal = function() {
  checkedMessageData.value.message = undefined
  checkedMessageData.value.styles = undefined
  }

const clickHandler = ({ target }) => {
  if (checkedMessageData.value.stayOpen || modalContent.value.contains(target))  {
    checkedMessageData.value.stayOpen = false
    return
  }

  closeModal()
}

onMounted(() => {
  document.addEventListener('click', clickHandler)
})

onUnmounted(() => {
  document.removeEventListener('click', clickHandler)
})
</script>
