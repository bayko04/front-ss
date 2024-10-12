<template>
  <main class="grow">
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
        <div class="flex flex-col md:flex-row md:-mr-px">
          <div class="grow">
            <div class="p-6 space-y-6">
              <div class="mb-4 sm:mb-0">
                <h2 class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">Список рассылок</h2>
              </div>
              <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <div class="m-1.5">
                  <router-link to="/marketing/newsletters/create">
                    <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                      <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path
                            d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                      </svg>
                      <span class="hidden xs:block ml-2">Добавить рассылку</span>
                    </button>
                  </router-link>
                </div>
              </div>

              <table class="min-w-full bg-white dark:bg-gray-800" v-if="newsletterStore.newsletters">
                <thead>
                <tr>
                  <th class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Название</th>
                  <th class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Статус</th>
                  <th class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Действие</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="newsletter in newsletterStore.newsletters">
                  <td class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{{ newsletter.name }}</td>
                  <td class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{{ newsletter.status }}</td>
                  <td class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    <router-link :to="`/marketing/newsletters/update/${newsletter.id}`">
                      <button class="text-blue-500 hover:text-blue-700">Изменить</button>
                    </router-link>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import { useNewsletterStore } from "../../stores/newsletter.store.js";

const sidebarOpen = ref()

const newsletterStore = useNewsletterStore()

onMounted(() => {
  newsletterStore.getNewsletters()
})

</script>