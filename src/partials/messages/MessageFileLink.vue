<template>
  <div>
    <a :href="message?.attachments[0].path" target="_blank" class="p-1.5 rounded-full border border-slate-200 dark:border-slate-700 ml-4 hover:bg-white dark:hover:bg-slate-800 transition duration-150">
      <span class="sr-only">Download</span>
      <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500" viewBox="0 0 16 16">
        <path d="M15 15H1a1 1 0 01-1-1V2a1 1 0 011-1h4v2H2v10h12V3h-3V1h4a1 1 0 011 1v12a1 1 0 01-1 1zM9 7h3l-4 4-4-4h3V1h2v6z" />
      </svg>
    </a>
  </div>
</template>

<script setup>
const { message } = defineProps(['message']);
</script>