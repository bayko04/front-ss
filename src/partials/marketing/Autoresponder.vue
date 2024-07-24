<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 md:py-0 w-full max-w-9xl mx-auto">
          <div class="xl:flex">
            <!-- Main Content -->
            <div class="flex-1 border-t border-slate-200 dark:border-slate-700">
              <form @submit.prevent="onSubmit">
                <div class="space-y-8 mt-8">
                  <div class="mx-auto px-4 w-full">
                    <div class="grid gap-5 lg:grid-cols-2">
                      <!-- Название шаблона -->
                      <div class="col-span-2">
                        <label class="block text-sm font-medium mb-1" for="ad-link-input">Название шаблона<span class="text-rose-500">*</span></label>
                        <input v-model="marketingStore.autoresponderTemplate.title" id="template-name-input" name="templateName" class="form-input w-full" type="text" placeholder="Название шаблона"/>
                      </div>

                      <!-- Рекламная ссылка -->
                      <div class="col-span-2">
                        <label class="block text-sm font-medium mb-1" for="ad-link-input">Введите рекламную ссылку <span class="text-rose-500">*</span></label>
                        <input v-model="marketingStore.autoresponderTemplate.ad_link" id="ad-link-input" name="adLink" class="form-input w-full" type="text" placeholder="Введите рекламную ссылку" />
                      </div>

                      <div v-for="message in marketingStore.autoresponderTemplate.messages">
                        <!-- Выбор типа медиа -->
                        <div class="col-span-2">
                          <label class="block text-sm font-medium mb-1" for="media-type">Тип медиа файла <span class="text-rose-500">*</span></label>
                          <select v-model="message.selectedOption" id="media-type" name="mediaType" class="form-input w-full">
                            <option value="">Не выбрано</option>
                            <option value="text">Текст</option>
                            <option value="media">Медиа</option>
                          </select>
                        </div>

                        <!-- Текстовый заголовок -->
                        <div v-if="message.selectedOption === 'text'" class="col-span-2">
                          <label class="block text-sm font-medium mb-1" for="text-title">Введите текст заголовка <span class="text-rose-500">*</span></label>
                          <input v-model="message.textTitle" id="text-title" name="textTitle" class="form-input w-full" type="text" placeholder="Введите текст заголовка" />
                        </div>

                        <!-- Квадраты для выбора медиа -->
                        <div v-if="message.selectedOption === 'media'" class="col-span-2">
                          <div class="flex space-x-4">
                            <label class="p-4 border rounded bg-gray-100 text-center cursor-pointer" >
                              audio
                              <br>
                              <i class="fas fa-plus"></i>
                              <input type="file" @change="(event) => message.audioFile = event.target.files[0]" class="hidden">
                              <div v-if="message.audioFile" class="mt-2 text-sm text-gray-700"> {{ message.audioFile.name }} </div>
                            </label>
                            <label class="p-4 border rounded bg-gray-100 text-center cursor-pointer">
                              image
                              <br>
                              <i class="fas fa-plus"></i>
                              <input type="file" @change="(event) => message.imageFile = event.target.files[0]" class="hidden">
                              <div v-if="message.imageFile" class="mt-2 text-sm text-gray-700"> {{ message.imageFile.name }} </div>
                            </label>
                          </div>
                        </div>

                        <!-- Сообщение -->
                        <div class="col-span-2">
                          <label class="block text-sm font-medium mb-1" for="ad-body-input">Введите текст сообщения <span class="text-rose-500">*</span></label>
                          <input v-model="message.textBody" id="ad-body-input" name="textBody" class="form-input w-full" type="text" placeholder="Введите текст сообщения" />
                        </div>
                      </div>
                      <button type="button" @click="addMessage()">add message</button>
                    </div>
                    <br>
                    <div class="mt-2 flex justify-end">
                      <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Сохранить</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <!-- Preview Section -->
            <div class="w-1/3 p-5 border-l border-gray-300 dark:border-gray-600">
              <div class="bg-white dark:bg-slate-800 shadow-md rounded border border-slate-200 dark:border-slate-700 p-5">
                <h3 class="text-lg font-semibold mb-3">Предварительный просмотр:</h3>
                <p>Рекламная ссылка: <strong>{{ adLink.value }}</strong></p>
                <p>Заголовок: <strong>{{ textTitle.value }}</strong></p>
                <p>Текст сообщения: <strong>{{ textBody.value }}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import Sidebar from '../../partials/Sidebar.vue';
import { useMarketingStore } from '../../stores/marketing.store.js';
import Header from '../../partials/Header.vue';
import router from "../../router.js";

const route = router.currentRoute?.value
const id = route.params?.id;


    const sidebarOpen = ref(false);
    const marketingStore = useMarketingStore();

    const adLink = ref('');
    const textTitle = ref('');
    const textBody = ref('');

    const onSubmit = async () => {
      try {
        await marketingStore.addOrUpdateAutoresponder();
        console.log('Submitted successfully');
      } catch (error) {
        console.error('Submission failed', error);
      }
    };

    function addMessage() {
      marketingStore.autoresponderTemplate.messages.push(
          {
            selectedOption: 'text',
            textTitle: '',
            textBody: '',
            audioFile: null,
            imageFile: null,
          }
      )
    }

onMounted(() => {
  console.log(id)
  if (id) {
    marketingStore.getAutoresponderTemplate(id)
  }
})
</script>
