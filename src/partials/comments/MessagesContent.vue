<template>
  <div>
    <div class="flex flex-row items-center">
      <img v-if="comment.user_id" class="rounded-full mr-4" :src="comment.user?.image" width="40" height="40" alt="User 01" />
      <img v-else class="rounded-full mr-4" src="https://i.pinimg.com/originals/02/41/dc/0241dc4c544ec54fee0c378b40ca6bc6.png" width="40" height="40" alt="User 01" />
      <div class="text-xs text-slate-500 font-medium ml-2 mr-2">{{ comment.username }}</div>
    </div>
    <div class="relative group flex-col ">
      <div
          v-if="comment.text"
          class="whitespace-pre-wrap text-sm rounded-lg border shadow-md mb-1 p-3 w-full min-w-[100px]"
          :class="comment.user_id ? 'bg-indigo-500 text-white rounded-tl-none border-transparent' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border-slate-200 dark:border-slate-7001'"
      >
        {{comment.text}}
      </div>
      <div class="flex items-center flex-row">
        <MessageStatus :message="comment"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth.store.js';
import MessageStatus from "./MessageStatus.vue";

const authStore = useAuthStore();
const { comment } = defineProps(['comment']);

</script>