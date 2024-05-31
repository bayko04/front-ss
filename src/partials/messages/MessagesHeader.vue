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