<template>
  <div class="sticky top-16 z-50">
    <div
        v-if="activeChat"
        class="flex items-center justify-between bg-slate-50 dark:bg-[#161F32] border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 md:px-5 h-16"
    >
      <!-- People -->
      <div class="flex items-center">
        <!-- Close button -->
        <button
          class="md:hidden text-slate-400 hover:text-slate-500 mr-4"
          @click.stop="$emit('toggle-msgsidebar')"
          aria-controls="messages-sidebar"
          :aria-expanded="msgSidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        <!-- People list -->
        <div class="flex -space-x-3 -ml-px items-center">
          <button class="flex items-center">
            <img class="rounded-full border-2 border-white dark:border-slate-800 box-content" :src="activeChat.image" width="32" height="32" alt="User 01" />
            <span class="ml-2">{{ customerStore.customer?.name ?? activeChat.name }}</span>
          </button>
        </div>
      </div>

      <!-- Buttons on the right side -->
      <div class="flex">
        <button title="Добавить в контакты" v-if="!customerStore.customer" @click="openSearchModal()" class="p-1.5 shrink-0 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-address-book fill-current text-indigo-500 w-4 h-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z" />
            <path d="M10 16h6" />
            <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M4 8h3" />
            <path d="M4 12h3" />
            <path d="M4 16h3" />
          </svg>
        </button>
        <button v-if="authStore.userData.user.id != activeChat.user_id" @click="assignChat(authStore.userData.user.id, activeChat)" title="Присвоить чат себе" class="p-1.5 shrink-0 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-up fill-current text-indigo-500 w-4 h-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
          </svg>
        </button>
        <button title="Завершить чат" v-if="!activeChat.end_status" @click="openModal()" class="p-1.5 shrink-0 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm ml-2">
          <svg class="w-4 h-4 fill-current text-indigo-500" viewBox="0 0 16 16">
            <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useMessangers } from "../../utils/messengers.js";
  import { closingChatModal, searchContactModal } from "../../utils/modalVariables.js";
  import {useCustomerStore} from "../../stores/customer.store.js"
  import { useAuthStore } from "../../stores/auth.store.js";

  const { activeChat, assignChat } = await useMessangers()
  const { msgSidebarOpen } = defineProps(['msgSidebarOpen'])
  const customerStore = useCustomerStore()
  const authStore = useAuthStore()

  function openModal() {
    closingChatModal.value.stayOpen = true
    closingChatModal.value.status = true
  }

  function openSearchModal() {
    searchContactModal.value.stayOpen = true
    searchContactModal.value.status = true
  }

</script>