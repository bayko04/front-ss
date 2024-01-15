<template>
  <!-- Modal backdrop -->
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-out duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="fileModal" class="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity" aria-hidden="true"></div>
  </transition>
  <!-- Modal dialog -->
  <transition
    enter-active-class="transition ease-in-out duration-200"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in-out duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div v-show="fileModal" id="file-modal" class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6" role="dialog" aria-modal="true">
      <div ref="modalContent" class="bg-white dark:bg-slate-800 rounded shadow-lg overflow-auto max-w-lg w-full max-h-full">
        <!-- Modal header -->
        <div class="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
          <div class="flex justify-between items-center">
            <div class="font-semibold text-slate-800 dark:text-slate-100">Отправка файлов</div>
            <button class="text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400" @click.stop="closeModal()">
              <div class="sr-only">Close</div>
              <svg class="w-4 h-4 fill-current">
                <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
              </svg>
            </button>
          </div>
        </div>
        <!-- Modal for files-->
        <div>
          <!-- Modal content -->
          <div
              v-if="activeChat?.message?.attachments"
              class="px-5 py-4"
          >
            <div
                class="text-sm"
            >
              <div
                  class="flex flex-row justify-between"
                  v-for="(attachment, index) in activeChat.message.attachments"
              >
                <div class="font-medium text-slate-800 dark:text-slate-100 mb-3">{{ attachment.name }}</div>
                <Delete
                    @click="deleteFile(index)"
                    class="cursor-pointer"/>
              </div>

            </div>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium mb-1" for="name">Заголовок</label>
                <input v-model="activeChat.message.text" id="name" class="form-input w-full px-2 py-1" type="text" required />
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
            <div class="flex flex-wrap justify-end space-x-2">
              <button class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" @click.stop="closeModal()">Cancel</button>
              <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="send()">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { fileModal, useMessangers} from "../utils/messengers.js"
import Delete from '../images/delete.svg?component'

const { activeChat, sendFiles } = await useMessangers()

const deleteFile = function (index) {
  activeChat.value.message.attachments.splice(index, 1)
}

const closeModal = function() {
  fileModal.value = false
  activeChat.value.message.attachments = []
  activeChat.value.message.text = ''
}

const send = async function() {
  await sendFiles()
  closeModal()
}
</script>
