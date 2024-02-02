<template>
  <div>
      <img v-if="message.user_id" class="rounded-full mr-4" :src="authStore?.userData?.user?.image" width="40" height="40" alt="User 01" />
      <img v-else class="rounded-full mr-4" :src="activeChat?.image" width="40" height="40" alt="User 01" />
    <div class="relative group">
      <div class="flex items-center">
          <!--          text message -->
          <div
              v-if="message.type === 'text'"
              class="text-sm rounded-lg border shadow-md mb-1 p-3 min-w-[100px]"
              :class="message.user_id ? 'bg-indigo-500 text-white rounded-tl-none border-transparent' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border-slate-200 dark:border-slate-7001'"
          >
            {{message.text}}
          </div>
          <!--          image message -->
          <img v-else-if="message.type === 'image' && message?.attachments[0]" class="rounded-lg shadow-md mb-1" :src="message?.attachments[0].path" width="240" height="180" alt="Chat image" />
          <!--          audio message -->
          <AudioPlayer  v-else-if="message.type === 'audio'" :audioPath="message?.attachments[0].path"/>
          <!--          video message -->
          <VideoPlayer  v-else-if="message.type === 'video'" :videoPath="message?.attachments[0].path"/>
          <!--          file message -->
          <div  v-else-if="message.type === 'file' || message.type === 'document'" class="flex text-sm rounded-lg border shadow-md mb-1 p-3 min-w-[100px]">
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
          <!--          end message types -->
          <div v-if="message.errors" class="m-4">
            <div class="flex items-center space-x-2">
              <!-- Start -->
              <Tooltip size="md" bg="light">
                <div class="ml-2 text-xs">{{ message.errors }}</div>
              </Tooltip>
            </div>
          </div>
          <MessageFileLink v-else-if="message?.attachments && message?.attachments.length && message?.attachments[0].path" :message="message" />
          <!-- Icon -->
        <button @click="(event) => openModal(event, message)" class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 focus:outline-none">
          <svg class="w-3 h-3 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </button>
        </div>
        <MessageStatus :message="message"/>
      </div>
  </div>
</template>

<script setup>
import { useMessangers, checkedMessageData } from "../../utils/messengers.js";
import { useAuthStore } from '../../stores/auth.store.js';
import AudioPlayer from "./AudioPlayer.vue";
import VideoPlayer from "./VideoPlayer.vue";
import { onMounted, ref } from "vue";
import MessageStatus from "./MessageStatus.vue";
import MessageFileLink from "./MessageFileLink.vue";
import Tooltip from '../../components/Tooltip.vue'

const { activeChat, markAsRead } = useMessangers();
const authStore = useAuthStore();
const { message } = defineProps(['message']);
const modalStyle = ref({
  position: 'absolute',
  left: `0px`,
  top: `0px`,
});

function openModal(event, message) {
  calculateModalPosition(event);
  checkedMessageData.value = {
    message: message,
    style: modalStyle.value,
    stayOpen: true,
  }
}
function calculateModalPosition() {
  const buttonRect = event.target.getBoundingClientRect();
  const windowWidth = window.innerWidth;

  // Определите, насколько близко к правому краю кнопка
  const distanceToRight = windowWidth - (buttonRect.right + window.scrollX);

  // Установите расположение модалки в зависимости от расстояния
  if (distanceToRight < 220) {
    // Если слишком близко к правому краю, разместите слева от кнопки
    const modalLeft = buttonRect.left - 220 + window.scrollX;
    modalStyle.value = {
      position: 'absolute',
      left: `${modalLeft}px`,
      top: `${buttonRect.bottom + window.scrollY}px`,
    };
  } else {
    // В противном случае разместите справа от кнопки
    const modalLeft = buttonRect.left + window.scrollX;
    modalStyle.value = {
      position: 'absolute',
      left: `${modalLeft}px`,
      top: `${buttonRect.bottom + window.scrollY}px`,
    };
  }
}
onMounted(() => {
  if(message.message_status_id === 3) {
    markAsRead(message)
  }
});
</script>