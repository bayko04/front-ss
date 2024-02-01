<template>
  <div
      class="grow px-4 sm:px-6 md:px-5 py-6"

  >
    <div
        v-if="activeChat"
        class="flex items-start mb-4 last:mb-0"
        v-for="message in activeChat.messages"
        :key="message.id"
    >
      <img v-if="message.user_id" class="rounded-full mr-4" :src="authStore?.userData?.user?.image" width="40" height="40" alt="User 01" />
      <img v-else class="rounded-full mr-4" :src="activeChat?.image" width="40" height="40" alt="User 01" />
      <div v-if="message.type === 'text'">
        <div
            class="text-sm rounded-lg border shadow-md mb-1 p-3"
            :class="message.user_id ? 'bg-indigo-500 text-white rounded-tl-none border-transparent' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border-slate-200 dark:border-slate-7001'"
        >
          {{message.text}}
        </div>
        <div class="flex items-center justify-between">
          <div class="text-xs text-slate-500 font-medium">{{timestampToTime(message.date)}}</div>
          <svg v-if="message.message_status_id === 1" class="w-3 h-3 shrink-0 fill-current text-slate-400" viewBox="0 0 12 12">
            <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
          </svg>
          <svg v-else-if="message.message_status_id === 4" class="w-5 h-3 shrink-0 fill-current text-slate-400" viewBox="0 0 20 12">
            <path d="M10.402 6.988l1.586 1.586L18.28 2.28a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0L8.988 8.402l-2.293 2.293a1 1 0 01-1.414 0l-3-3A1 1 0 013.695 6.28l2.293 2.293L12.28 2.28a1 1 0 011.414 1.414l-3.293 3.293z" />
          </svg>
          <svg v-else-if="message.message_status_id === 2" class="w-5 h-3 shrink-0 fill-current text-emerald-500" viewBox="0 0 20 12">
            <path d="M10.402 6.988l1.586 1.586L18.28 2.28a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0L8.988 8.402l-2.293 2.293a1 1 0 01-1.414 0l-3-3A1 1 0 013.695 6.28l2.293 2.293L12.28 2.28a1 1 0 011.414 1.414l-3.293 3.293z" />
          </svg>
        </div>
      </div>
      <div v-else-if="message.type === 'image'">
        <div class="flex items-center">
          <img v-if="message?.attachments[0]" class="rounded-lg shadow-md mb-1" :src="message?.attachments[0].path" width="240" height="180" alt="Chat image" />
          <a :href="message?.attachments[0].path" target="_blank" class="p-1.5 rounded-full border border-slate-200 dark:border-slate-700 ml-4 hover:bg-white dark:hover:bg-slate-800 transition duration-150">
            <span class="sr-only">Download</span>
            <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500" viewBox="0 0 16 16">
              <path d="M15 15H1a1 1 0 01-1-1V2a1 1 0 011-1h4v2H2v10h12V3h-3V1h4a1 1 0 011 1v12a1 1 0 01-1 1zM9 7h3l-4 4-4-4h3V1h2v6z" />
            </svg>
          </a>
        </div>
        <div class="flex items-center justify-between">
          <div class="text-xs text-slate-500 font-medium">{{timestampToTime(message.date)}}</div>
        </div>
      </div>
      <div v-else-if="message.type === 'audio' && message?.attachments[0]">
        <AudioPlayer :audioPath="message?.attachments[0].path"/>
      </div>
      <div class="flex items-center" v-else-if="message.type === 'video' && message?.attachments[0]">
        <VideoPlayer :videoPath="message?.attachments[0].path"/>
        <a :href="message?.attachments[0].path" target="_blank" class="p-1.5 rounded-full border border-slate-200 dark:border-slate-700 ml-4 hover:bg-white dark:hover:bg-slate-800 transition duration-150">
          <span class="sr-only">Download</span>
          <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500" viewBox="0 0 16 16">
            <path d="M15 15H1a1 1 0 01-1-1V2a1 1 0 011-1h4v2H2v10h12V3h-3V1h4a1 1 0 011 1v12a1 1 0 01-1 1zM9 7h3l-4 4-4-4h3V1h2v6z" />
          </svg>
        </a>
      </div>
    </div>
    <div ref="messagesBottomElement"></div>
  </div>
</template>

<script setup>
import { useMessangers } from "../../utils/messengers.js";
import { useAuthStore } from '../../stores/auth.store.js';
import { timestampToTime } from "../../helpers/date-format.js";
import AudioPlayer from "./AudioPlayer.vue";
import VideoPlayer from "./VideoPlayer.vue";
import { onMounted, ref  } from "vue";

const { activeChat, scrollToBottom } = useMessangers();
const authStore = useAuthStore();
const messagesBottomElement = ref('')

onMounted(() => {
  window.messagesBottomElement = messagesBottomElement.value;
});
</script>