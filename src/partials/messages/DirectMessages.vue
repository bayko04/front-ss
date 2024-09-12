<template>
    <ul class="mb-6">
      <li
          class="-mx-2"
          v-for="(chat) in displayedChats"
          :key="chat.id"
      >
        <button
            v-if="(chatSortStatus === 2 && chat.latest_customer_request.user_id === null)
            || chatSortStatus === 3
            || (chatSortStatus === 1 && chat.latest_customer_request.user_id === authStore.userData.user.id)"
            class="flex items-center justify-between w-full p-2 rounded"
            @click.stop="$emit('close-msgsidebar')"
            @click="setActiveChat(chat)"
            :class="{'bg-indigo-500/30': (chat.id === activeChat.id && chat.account_id === activeChat.account_id) }"

        >
          <div class="flex items-center truncate">
            <img class="w-8 h-8 rounded-full mr-2" :src="chat.image" width="32" height="32" alt="User 01" />
            <div class="truncate flex flex-col items-start">
              <span class="text-sm font-medium text-slate-800 dark:text-slate-100">{{chat.name}}</span>
              <span v-if="chat.message?.text" class="text-xs text-gray-500 truncate">{{chat.message.text}}</span>
              <span v-else-if="chat.messages?.length" class="text-xs text-gray-500 truncate">{{ lastMessage(chat.messages) }}</span>
              <span v-else-if="chat.latest_message" class="text-xs text-gray-500 truncate">{{ chat.latest_message.text }}</span>
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
</template>

<script setup>
import { computed } from 'vue';
import {useMessangers} from "../../utils/messengers.js";
import {useAuthStore} from "../../stores/auth.store.js";

const {activeChat, activeAccount, setActiveChat, chatSortStatus, allChats, accounts} = await useMessangers()

const lastMessage = (messages) => {
  const values = Object.values(messages);

  return values[values.length - 1].text;
};

const allChatsArray = computed(() => {
  let chats = [];

  accounts.value?.forEach(account => {
    account?.chats?.forEach(chat => {
      chats.push(chat);
    });
  });

  return chats;
});

const displayedChats = computed(() => {
  return allChats.value ? allChatsArray.value : activeAccount.value?.chats || [];
});

const authStore = useAuthStore()
</script>
