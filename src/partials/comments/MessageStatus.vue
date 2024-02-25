<template>
  <div class="flex flex-col min-w-72">
    <div class="flex items-center justify-between">
      <div class="text-xs text-slate-500 font-medium">{{timestampToTime(message.created_at)}}</div>
      <div class="text-xs text-slate-500 font-medium ml-2 cursor-pointer" @click="openReply">ответить</div>
      <div class="text-xs text-slate-500 font-medium ml-2 cursor-pointer" @click="openReplyToDirectModal">ответить лично</div>
    </div>
    <div v-if="replyInputOpen" class="mt-2 min-w-72">
      <input @keydown="handleKeyDown" type="text" v-model="reply" class="py-2 min-w-72 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Введите ответ">
    </div>
  </div>
</template>

<script setup>
import { timestampToTime } from "../../helpers/date-format.js";
import {ref} from "vue";
import { useMessangers } from "../../utils/messengers.js";
import {replyToDirectModal} from "../../utils/modalVariables.js";

const { replyComment } = await useMessangers();
const { message } = defineProps(['message']);
const reply = ref('');
const openReply = () => {
  replyInputOpen.value = !replyInputOpen.value;
  if(replyInputOpen.value) {
    reply.value = `@${message.username} `;
  }
  else {
    reply.value = '';
  }
}

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    replyComment(reply.value, message.id_from_comment, message.instagram_content_id);
    reply.value = '';
    replyInputOpen.value = false;
  }
}

const openReplyToDirectModal = () => {
  replyToDirectModal.value.stayOpen = true
  replyToDirectModal.value.status = true
  replyToDirectModal.value.repliedCommentId = message.id_from_comment
  replyToDirectModal.value.contentId = message.instagram_content_id
}

const replyInputOpen = ref(false);
</script>