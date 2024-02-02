<template>
  <div>
      <img v-if="message.user_id" class="rounded-full mr-4" :src="authStore?.userData?.user?.image" width="40" height="40" alt="User 01" />
      <img v-else class="rounded-full mr-4" :src="activeChat?.image" width="40" height="40" alt="User 01" />
      <div v-if="message.type === 'text'">
        <div
            class="text-sm rounded-lg border shadow-md mb-1 p-3"
            :class="message.user_id ? 'bg-indigo-500 text-white rounded-tl-none border-transparent' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border-slate-200 dark:border-slate-7001'"
        >
          {{message.text}}
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
        <AudioPlayer :audioPath="message?.attachments[0].path"/>
        <MessageStatus :message="message"/>
      </div>
      <div v-else-if="message.type === 'video' && message?.attachments[0]">
        <div class="flex items-center">
          <VideoPlayer :videoPath="message?.attachments[0].path"/>
          <MessageFileLink :message="message" />
        </div>
        <MessageStatus :message="message"/>
      </div>
      <div v-else-if="message.type === 'file' && message?.attachments[0]">
        <div class="flex items-center">
         file
          <MessageFileLink :message="message" />
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

const { activeChat, markAsRead } = useMessangers();
const authStore = useAuthStore();
const { message } = defineProps(['message']);

onMounted(() => {
  if(message.message_status_id === 3) {
    markAsRead(message)
  }

});
</script>