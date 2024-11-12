<template>
  <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Content -->
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
            <div class="flex flex-col md:flex-row md:-mr-px">
              <div class="grow">
                <!-- Panel body -->
                <div class="p-6 space-y-6" v-if="marketingStore.reminderSettings">
                  <h2 class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">Автоматическая отправка сообщения</h2>

                  <!-- Toggle Switch -->
                  <div class="flex flex-wrap items-center -m-3 justify-between gap-[10px] max-xl:justify-start max-lg:flex-col max-lg:items-start">
                    <div class=" w-40">
                      <div class="flex items-center">
                        <label class="inline-flex items-center cursor-pointer">
                          <input
                              type="checkbox"
                              v-model="marketingStore.reminderSettings.auto_client_retention.active"
                              class="sr-only peer"
                          />
                          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                        <div class="text-sm text-gray-400 dark:text-gray-500 italic ml-2">
                          {{ marketingStore.reminderSettings.auto_client_retention.active ? 'Включен' : 'Выключен' }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-end">
                        <input
                            v-model="marketingStore.reminderSettings.auto_client_retention.minutes"
                            id="small"
                            class="form-input px-2 py-1 mr-4 w-20"
                            type="number"
                        />
                        <label class="block text-sm font-medium" for="small">
                          Через сколько минут отправить
                        </label>
                      </div>
                    </div>

                    <button @click="save()" class="cursor-pointer bg-blue-700 text-white px-4 py-2 rounded">Сохранить</button>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
</template>

<script setup>
import {onMounted} from 'vue'
import {useMarketingStore} from '../../stores/marketing.store.js';

const marketingStore = useMarketingStore();

function save() {
  marketingStore.updateReminderSettings()
}

onMounted(() => {
  marketingStore.getReminderSettings()
})
</script>
