<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" v-if="paginateData">
    <nav class="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
      <ul class="flex justify-center">
        <li class="ml-3 first:ml-0 cursor-pointer" v-if="paginateData.prev_page_url" @click="paginateAction(paginateData.prev_page_url)">
          <a class="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500">&lt;- Пред.</a>
        </li>
        <li class="ml-3 first:ml-0" v-else>
          <span class="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600">&lt;- Пред.</span>
        </li>
        <li class="ml-3 first:ml-0 cursor-pointer" v-if="paginateData.next_page_url" @click="paginateAction(paginateData.next_page_url)">
          <a class="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500">След. -&gt;</a>
        </li>
        <li class="ml-3 first:ml-0" v-else>
          <span class="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600">След. -&gt;</span>
        </li>
      </ul>
    </nav>
    <div class="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
      Вывод: <span class="font-medium text-slate-600 dark:text-slate-300">от {{ paginateData.from }}</span> до <span class="font-medium text-slate-600 dark:text-slate-300">{{ paginateData.to }}</span> из <span class="font-medium text-slate-600 dark:text-slate-300">{{ paginateData.total }}</span>
    </div>
  </div>
</template>

<script setup>
const { paginateData, paginateAction } = defineProps(['paginateData', 'paginateAction']);
</script>