<template>
  <div class="mt-4">
    <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-3">Чаты</div>
    <ul class="mb-6">
      <li
          class="-mx-2"
          v-for="(chat) in activeAccount?.chats"
          :key="chat.id"
      >
        <button
            class="flex items-center justify-between w-full p-2 rounded"
            @click.stop="$emit('close-msgsidebar')"
            @click="setActiveChat(chat)"
            :class="{'bg-indigo-500/30': (chat.id === activeChat?.id) }"
            v-if="(activeChatStatus.id === userChatStatusId && chat.user_id === authStore.userData?.user.id) || (activeChatStatus.id === chat.chat_status_id)"
        >
          <div class="flex items-center truncate">
            <img class="w-8 h-8 rounded-full mr-2" :src="chat.image" width="32" height="32" alt="User 01" />
            <div class="truncate">
              <span class="text-sm font-medium text-slate-800 dark:text-slate-100">{{chat.name}}</span>
            </div>
          </div>
          <div
              v-if="chat.unread_messages_count"
              class="flex items-center ml-2">
            <div class="text-xs inline-flex font-medium bg-indigo-400 text-white rounded-full text-center leading-5 px-2">{{chat.unread_messages_count}}</div>
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useMessangers } from "../../utils/messengers.js";
import { useAuthStore} from "../../stores/auth.store.js";

const {activeChat, activeAccount, setActiveChat, activeChatStatus, userChatStatusId} = await useMessangers()

const authStore = useAuthStore()
</script>