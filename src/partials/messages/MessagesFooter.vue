<template>
  <div v-if="activeChat" class="sticky bottom-0">
    <div class="flex items-center justify-between bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 sm:px-6 md:px-5 min-h-16">
        <AddAttachments/>
      <!-- Message input -->
      <div class="grow flex items-end">
        <div class="grow mr-3">
          <label for="message-input" class="sr-only">Type a message</label>
          <div
               @input="handleInput"
               contenteditable
               id="message-input"
               class="form-textarea w-full bg-slate-100 dark:bg-slate-800 border-transparent dark:border-transparent focus:bg-white dark:focus:bg-slate-800 placeholder-slate-500"
          >
            {{ activeChat?.message?.text }}
          </div>
        </div>
        <button @click="send()" type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap h-8 mb-2">Send -&gt;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AddAttachments from "./AddAttachments.vue";
import { useMessangers } from "../../utils/messengers.js"

const { activeChat, saveMessage } = await useMessangers()

const send = function () {
  saveMessage()
}
const handleInput = (event) => {
  if (activeChat.value) {
    activeChat.value.message.text = event.target.innerText;
  }
};
</script>