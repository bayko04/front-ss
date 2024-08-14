<template>
  <ul>
    <!-- Cart item -->

    <div v-for="(message, index) in marketingStore.allAutoResponderTemplates"
          :key="message.id">
      <router-link
          :to="{ name: 'autoresponder', params: { id: message.id } }"
      >
        <li class="sm:flex items-center py-6 border-b border-slate-200 dark:border-slate-700 cursor-pointer">
          <div class="grow">

              <h3 class="w-full h-full text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">{{ message.title }}</h3>

            <div class="flex flex-wrap justify-between items-center">
              <div class="flex flex-wrap items-center space-x-2 mr-2">
                <div class="flex items-center space-x-2">
                </div>
              </div>
              <button class="text-sm underline hover:no-underline" @click="deleteAutoresponder(message)">
                <svg class="w-4 h-4 fill-current text-rose-500 shrink-0" viewBox="0 0 16 16">
                  <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/>
                </svg>
              </button>
            </div>
          </div>
        </li>
      </router-link>
    </div>
  </ul>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useMarketingStore} from "../../stores/marketing.store.js";

const marketingStore = useMarketingStore();

function deleteAutoresponder(item) {
  marketingStore.deleteAutoresponder(item.id)
}

onMounted(() => {
    marketingStore.autoResponderTemplates()
  })
</script>