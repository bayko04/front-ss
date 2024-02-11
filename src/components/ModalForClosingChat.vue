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
        v-show="closingChatModal.status"
        class="fixed inset-0 z-50 overflow-hidden flex items-start justify-end mt-32 mr-5"
        role="dialog"
        aria-modal="true"
    >
      <div ref="modalContent" class="bg-white dark:bg-slate-800 rounded shadow-lg overflow-auto max-w-lg w-full max-h-full">
        <div class="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
          <div class="flex justify-between items-center">
            <div class="font-semibold text-slate-800 dark:text-slate-100">Завершение чата</div>
            <button class="text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400" @click.stop="closeModal()">
              <div class="sr-only">Close</div>
              <svg class="w-4 h-4 fill-current">
                <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-5">
          <div class="mb-4">
            <label for="reason" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Причина завершения чата</label>
            <select  v-model="form.reason" id="reason" name="status" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <template v-for="status in references['chat_statuses']">
                <option v-if="status.end_status" :key="status.id" :value="status.id">
                  {{ status.name }}
                </option>
              </template>
            </select>
          </div>
          <div>
            <label for="comment" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Комментарий</label>
            <textarea v-model="form.comment" id="comment" name="comment" rows="3" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
          </div>
          <div>
            <button @click="send()" type="submit" class="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useMessangers } from "../utils/messengers.js";
import { closingChatModal } from "../utils/modalVariables.js";
import { onMounted, onUnmounted, ref } from "vue";
const modalContent = ref(null);

const { references, closeChat } = useMessangers()
const form = ref({
  reason: null,
  comment: ''
})
const send = async function() {
  await closeChat(form.value)
  closeModal()
}
const closeModal = function () {
  form.value = {
    reason: null,
    comment: ''
  }
  closingChatModal.value.status = false;
};

const clickHandler = ({ target }) => {
  if (closingChatModal.value.stayOpen || modalContent.value.contains(target)) {
    closingChatModal.value.stayOpen = false;
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
