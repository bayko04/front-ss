<template>
  <div>
      <img v-if="message.user_id" class="rounded-full mr-4" :src="authStore?.userData?.user?.image" width="40" height="40" alt="User 01" />
      <img v-else class="rounded-full mr-4" :src="activeChat?.image" width="40" height="40" alt="User 01" />
      <div v-if="message.type === 'text'">
        <div class="flex">
          <div
              class="text-sm rounded-lg border shadow-md mb-1 p-3"
              :class="message.user_id ? 'bg-indigo-500 text-white rounded-tl-none border-transparent' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border-slate-200 dark:border-slate-7001'"
          >
            {{message.text}}
          </div>
          <div v-if="message.errors" class="m-4">
            <div class="flex items-center space-x-2">
              <!-- Start -->
              <Tooltip size="md" bg="light">
                <div class="ml-2 text-xs">{{ message.errors }}</div>
              </Tooltip>
            </div>
          </div>
        </div>
        <MessageStatus :message="message"/>
      </div>
      <div v-else-if="message.type === 'image'">
        <div class="flex items-center">
          <img v-if="message?.attachments[0]" class="rounded-lg shadow-md mb-1" :src="message?.attachments[0].path" width="240" height="180" alt="Chat image" />
          <MessageStatus :message="message"/>
        </div>
        <MessageStatus :message="message"/>
      </div>
      <div v-else-if="message.type === 'audio' && message?.attachments[0]">
        <div class="flex items-center">
          <AudioPlayer :audioPath="message?.attachments[0].path"/>
          <div v-if="message.errors" class="m-4">
            <div class="flex items-center space-x-2">
              <!-- Start -->
              <Tooltip size="md" bg="light">
                <div class="ml-2 text-xs">{{ message.errors }}</div>
              </Tooltip>
            </div>
          </div>
          <MessageFileLink v-else :message="message" />
        </div>
        <MessageStatus :message="message"/>
      </div>
      <div v-else-if="message.type === 'video' && message?.attachments[0]">
        <div class="flex items-center">
          <VideoPlayer :videoPath="message?.attachments[0].path"/>
          <div v-if="message.errors" class="m-4">
            <div class="flex items-center space-x-2">
              <!-- Start -->
              <Tooltip size="md" bg="light">
                <div class="ml-2 text-xs">{{ message.errors }}</div>
              </Tooltip>
            </div>
          </div>
          <MessageFileLink v-else :message="message" />
        </div>
        <MessageStatus :message="message"/>
      </div>
      <div v-else-if="(message.type === 'file' || message.type === 'document') && message?.attachments[0]">
        <div class="flex items-center">
          <div class="flex text-sm rounded-lg border shadow-md mb-1 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <path d="M9 15l2 2l4 -4" />
            </svg>
            <span v-if="message?.attachments[0] && message?.attachments[0].name">
              {{ message?.attachments[0].name }}
            </span>
            <span v-else class="mr-2">Без имени</span>
          </div>
          <div v-if="message.errors" class="m-4">
            <div class="flex items-center space-x-2">
              <!-- Start -->
              <Tooltip size="md" bg="light">
                <div class="ml-2 text-xs">{{ message.errors }}</div>
              </Tooltip>
            </div>
          </div>
          <MessageFileLink v-else :message="message" />
        </div>
        <MessageStatus :message="message"/>
      </div>
  </div>
</template>

<script setup>
import { useMessangers } from "../../utils/messengers.js";
import { useAuthStore } from '../../stores/auth.store.js';
import AudioPlayer from "./AudioPlayer.vue";
import VideoPlayer from "./VideoPlayer.vue";
import { onMounted  } from "vue";
import MessageStatus from "./MessageStatus.vue";
import MessageFileLink from "./MessageFileLink.vue";
import Tooltip from '../../components/Tooltip.vue'

const { activeChat, markAsRead } = useMessangers();
const authStore = useAuthStore();
const { message } = defineProps(['message']);

onMounted(() => {
  if(message.message_status_id === 3) {
    markAsRead(message)
  }

});
</script>