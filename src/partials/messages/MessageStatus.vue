<template>
  <div class="flex items-center justify-between">
    <div class="text-xs text-slate-500 font-medium">{{timestampToTime(message.created_at)}}</div>
    <div v-if="message.user_id">
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
</template>

<script setup>
import { timestampToTime } from "../../helpers/date-format.js";

const { message } = defineProps(['message']);
</script>