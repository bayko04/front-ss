<template>
  <div v-if="activeChat" class="sticky bottom-0">
    <div v-if="activeChat?.message?.reply_message" class="flex items-center justify-between bg-gray-100 dark:bg-slate-800 border-t border-l-4 border-gray-300 dark:border-blue-700 px-4 sm:px-6 md:px-5 h-16">
      <span v-if="activeChat?.message?.reply_message?.text" class="overflow-hidden whitespace-no-wrap overflow-ellipsis line-clamp-1 max-w-[calc(100%-1.25rem)]">
        {{ activeChat?.message?.reply_message?.text }}
      </span>
      <span v-else class="overflow-hidden whitespace-no-wrap overflow-ellipsis line-clamp-1 max-w-[calc(100%-1.25rem)]">
        <span v-if="activeChat?.message?.reply_message?.attachments[0] && activeChat?.message?.reply_message?.attachments[0].name">
          {{ activeChat?.message?.reply_message?.attachments[0].name }}
        </span>
        <span v-else>
          Без названия
        </span>
      </span>
      <button class="text-red-500" @click="removeReplyMessage()">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="flex items-center justify-between bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 sm:px-6 md:px-5" :style="{ height: blockHeight }">
      <div class="grow flex items-end mt-1">
        <div class="mr-3 mb-1">
          <AddAttachments/>
        </div>
        <div class="grow mr-3">
          <textarea
              v-model="activeChat.message.text"
              ref="textarea"
              @input="handleInput"
              @keydown="handleKeyDown"
              id="message-input"
              :style="{ height: textareaHeight}"
              class="w-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-transparent dark:border-transparent focus:border-transparent focus:ring-0 focus:outline-none placeholder-slate-500"
              rows="1"
          ></textarea>
        </div>
        <button class="shrink-0 text-slate-400 dark:text-slate-500 hover:text-slate-500 mr-3 mb-1 dark:hover:text-slate-400 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mood-smile" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 10l.01 0" />
            <path d="M15 10l.01 0" />
            <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
          </svg>
        </button>
        <button class="shrink-0 text-slate-400 dark:text-slate-500 hover:text-slate-500 mr-3 mb-1 dark:hover:text-slate-400 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-microphone w-6 h-6" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" />
            <path d="M5 10a7 7 0 0 0 14 0" />
            <path d="M8 21l8 0" />
            <path d="M12 17l0 4" />
          </svg>
        </button>
        <button @click="send()"  type="submit" class="mb-1 btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap h-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
            <path d="M6.5 12h14.5" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AddAttachments from "./AddAttachments.vue";
import { useMessangers } from "../../utils/messengers.js"
import { ref } from "vue";

const { activeChat, saveMessage, removeReplyMessage } = await useMessangers()
const textareaHeight = ref('auto');
const textarea = ref(null);
const blockHeight = ref('auto');

const send = function () {
  saveMessage()
  textareaHeight.value = 'auto';
  blockHeight.value = 'auto';
}
const handleInput = (event) => {
  adjustTextareaHeight();
  adjustBlockHeight();
};

const adjustTextareaHeight = () => {
  textareaHeight.value = 'auto';
  textareaHeight.value = `${textarea.value.scrollHeight}px`;
};

const adjustBlockHeight = () => {
  blockHeight.value = 'auto';
  blockHeight.value = `${blockHeight.value.scrollHeight}px`;
};

const handleKeyDown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    send();
  }
};
</script>