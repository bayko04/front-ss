<template>
  <div class="sticky top-16 z-50">
    <div
        v-if="activeCommentsChat"
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
            <img class="rounded-full border-2 border-white dark:border-slate-800 box-content" :src="activeCommentsChat.media_type === 'VIDEO' ? activeCommentsChat.thumbnail_url : activeCommentsChat.media_url" width="32" height="32" alt="User 01" />
            <span class="ml-2">{{ activeCommentsChat.caption }}</span>
          </button>
        </div>
      </div>

      <!-- Buttons on the right side -->
      <div class="flex">
        <button title="В архив" class="p-1.5 shrink-0 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm ml-2">
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

  const { activeCommentsChat } = await useMessangers()
  const { msgSidebarOpen } = defineProps(['msgSidebarOpen'])

</script>