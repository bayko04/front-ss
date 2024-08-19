<template>
  <ul>
    <!-- Cart item -->

    <div v-for="(message, index) in marketingStore.allAutoResponderTemplates"
         :key="message.id"
         class="relative">
      <router-link
          :to="{ name: 'autoresponder', params: { id: message.id } }"
          class="block"
      >
        <li class="sm:flex items-center py-6 border-b border-slate-200 dark:border-slate-700 cursor-pointer">
          <div class="grow">
            <h3 class="w-full h-full text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">{{ message.title }}</h3>

            <div class="flex flex-wrap justify-between items-center">
              <div class="flex flex-wrap items-center space-x-2 mr-2">
                <div class="flex items-center space-x-2">
                  <!-- Дополнительная информация -->
                </div>
              </div>
            </div>
          </div>
        </li>
      </router-link>

      <!-- Кнопка удаления, вынесенная за пределы router-link -->
      <button class="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm underline hover:no-underline"
              @click="deleteItem(message)">
        <svg class="w-4 h-4 fill-current text-rose-500 shrink-0" viewBox="0 0 16 16">
          <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/>
        </svg>
      </button>
    </div>
  </ul>
  <!-- Модальное окно -->
  <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-[90%] sm:w-[400px] p-6">
      <div class="h-[50%]">
        <div class="p-5 flex space-x-4">
          <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100 dark:bg-rose-500/30">
            <svg class="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"/>
            </svg>
          </div>
          <div>
            <div class="mb-2">
              <div class="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Удалить задачу?
              </div>
            </div>
            <div class="text-sm mb-10">
              <div class="space-y-2">
                <p>Данные этой задачи будут удалены безвозвратно.</p>
              </div>
            </div>
            <div class="flex flex-wrap justify-end space-x-2">
              <button @click="cancel" class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">Отмена</button>
              <button @click.stop="confirmDelete" class="btn-sm bg-rose-500 hover:bg-rose-600 text-white">Да, удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useMarketingStore} from "../../stores/marketing.store.js";

const marketingStore = useMarketingStore();
const isModalVisible = ref(false);
const itemToDelete = ref(null);

function confirmDelete() {
  if (itemToDelete.value) {
    marketingStore.deleteAutoresponder(itemToDelete.value.id)
        .then(() => {
          marketingStore.allAutoResponderTemplates = marketingStore.allAutoResponderTemplates.filter(template => template.id !== itemToDelete.value.id);
          isModalVisible.value = false;
          itemToDelete.value = null;
        })
        .catch(error => {
          console.error('Ошибка при удалении:', error);
        });
  }
}

function cancel() {
  isModalVisible.value = false;
  itemToDelete.value = null;
}

function deleteItem(item) {
  itemToDelete.value = item;
  isModalVisible.value = true;
}

onMounted(() => {
    marketingStore.autoResponderTemplates()
  })
</script>