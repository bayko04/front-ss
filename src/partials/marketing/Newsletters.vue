<template>
  <main class="grow">
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
        <div class="flex flex-col md:flex-row md:-mr-px">
          <div class="grow">
            <div class="p-6 space-y-6">
              <div class="flex justify-between items-center">
                <div class="">
                <h2 class="text-2xl text-gray-800 dark:text-gray-100 font-bold">Список рассылок</h2>
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
              </div>

              <table class="min-w-full bg-white dark:bg-gray-800 border-spacing-[10px]" v-if="newsletterStore.newsletters">
                <thead>
                <tr class="text-left">
                  <th class="py-[20px] px-4 border-b border-gray-200 dark:border-gray-700">Название</th>
                  <th class="py-[20px] px-4 border-b border-gray-200 dark:border-gray-700">Статус</th>
                  <th class="py-[20px] px-4 border-b border-gray-200 dark:border-gray-700">Действие</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="newsletter in newsletterStore.newsletters">
                  <td class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{{ newsletter.name }}</td>
                  <td :class="`py-2 px-4 border-b border-gray-200 dark:border-gray-700 ${newsletter.status === 'inactive' ? 'text-[red]' : 'text-[green]'}`">{{ newsletter.status }}</td>
                  <td class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    <router-link :to="`/marketing/newsletters/update/${newsletter.id}`">
                      <button class="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full">
                        <span class="sr-only">Edit</span>
                        <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                          <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                        </svg>
                      </button>
                    </router-link>
                    <button @click.stop="deleteNewsletter(newsletter.id)" class="text-rose-500 hover:text-rose-600 rounded-full">
                      <span class="sr-only">Delete</span>
                      <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                        <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                      </svg>
                    </button>
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

function deleteNewsletter(id)
{
  newsletterStore.delete(id)
}

onMounted(() => {
  newsletterStore.getNewsletters()
})

</script>