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
    <div class="flex items-center justify-between bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 sm:px-6 md:px-5 h-16">
      <div class="grow flex items-end">
        <div class="mr-3 mb-1">
          <AddAttachments/>
        </div>
        <div class="grow mr-3">
          <label for="message-input" class="sr-only">Type a message</label>
          <div
               @keydown.enter="send()"
               @input="handleInput"
               contenteditable
               id="message-input"
               class="form-textarea w-full bg-slate-100 dark:bg-slate-800 border-transparent dark:border-transparent focus:bg-white dark:focus:bg-slate-800 placeholder-slate-500"
          >
            {{ activeChat?.message?.text }}
          </div>
        </div>
        <button class="shrink-0 text-slate-400 dark:text-slate-500 hover:text-slate-500 mr-3 mb-1 dark:hover:text-slate-400 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-microphone w-6 h-6" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" />
            <path d="M5 10a7 7 0 0 0 14 0" />
            <path d="M8 21l8 0" />
            <path d="M12 17l0 4" />
          </svg>
        </button>
        <button @click="send()"  type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap h-8">
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

const { activeChat, saveMessage, removeReplyMessage } = await useMessangers()

const send = function () {
  saveMessage()
}
const handleInput = (event) => {
  if (activeChat.value) {
    activeChat.value.message.text = event.target.innerText;
  }
};
</script>