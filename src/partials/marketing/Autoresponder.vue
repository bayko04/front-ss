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
                      <div v-for="(message, index) in marketingStore.autoresponderTemplate.messages">
                        <button type="button" class="close-button" @click="removeMessage(index)">×</button>
                        <!-- Выбор типа медиа -->
                        <div class="col-span-2">
                          <label class="block text-sm font-medium mb-1" for="media-type">Тип медиа файла <span class="text-rose-500">*</span></label>
                          <select v-model="message.selectedOption" id="media-type" name="mediaType" class="form-input w-full">
                            <option value="">Не выбрано</option>
                            <option value="text">Текст</option>
                            <option value="audio">Аудио</option>
                            <option value="image">Картинка</option>
                          </select>
                        </div>

                        <!-- Текстовый заголовок -->
<!--                        <div v-if="message.selectedOption === 'text'" class="col-span-2">-->
<!--                          <label class="block text-sm font-medium mb-1" for="text-title">Введите текст заголовка <span class="text-rose-500">*</span></label>-->
<!--                          <input v-model="message.textTitle" id="text-title" name="textTitle" class="form-input w-full" type="text" placeholder="Введите текст заголовка" />-->
<!--                        </div>-->

                        <!-- Квадраты для выбора медиа -->
                        <div v-if="message.selectedOption === 'audio'" class="col-span-2">
                          <AudioPlayer v-if="message.audioFile" :audioPath="getImageUrl(message.audioFile)"/>
                          <div class="flex space-x-4">
                            <label class="p-4 border rounded bg-gray-100 text-center cursor-pointer w-full">
                              <span v-if="!message.audioFile">
                                Выберите аудио файл
                                 <br>
                                <i class="fas fa-plus"></i>
                                </span>
                              <input type="file" @change="(event) => message.audioFile = event.target.files[0]"
                                     class="hidden">
                              <div v-if="message.audioFile" class="mt-2 text-sm text-gray-700 w-full text-center"> {{
                                  message.audioFile.name
                                }}
                              </div>
                            </label>
                          </div>
                        </div>

                        <div v-if="message.selectedOption === 'image'" class="col-span-2">
                          <div class="flex space-x-4">
                            <label class="p-4 border rounded bg-gray-100 text-center cursor-pointer w-full">
                              <span v-if="!message.imageFile">
                                Выберите картинку
                                 <br>
                                <i class="fas fa-plus"></i>
                                </span>
                              <input type="file" @change="(event) => message.imageFile = event.target.files[0]" class="hidden">
                              <div v-if="message.imageFile" class="image-container">
                                <img :src="getImageUrl(message.imageFile)" alt="Selected Image" class="image-preview" />
                              </div>
                            </label>
                          </div>
                        </div>

                        <!-- Сообщение -->
                        <div v-if="message.selectedOption === 'text'" class="col-span-2">
                          <div class="col-span-2">
                            <label class="block text-sm font-medium mb-1" for="ad-body-input">Введите текст сообщения
                              <span class="text-rose-500">*</span></label>
                            <input v-model="message.textBody" id="ad-body-input" name="textBody"
                                   class="form-input w-full" type="text" placeholder="Введите текст сообщения"/>
                          </div>
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
                <div v-for="(message, index) in marketingStore.autoresponderTemplate.messages">
                  <div v-if="message.imageFile" class="message-container mt-2 p-3 border rounded bg-blue-100 dark:bg-slate-700 text-gray-900 dark:text-gray-300">
                    <img :src="getImageUrl(message.imageFile)" alt="Selected Image" class="image-preview" />
                  </div>
                  <div v-if="message.audioFile" class="message-container mt-2 p-3 border rounded bg-blue-100 dark:bg-slate-700 text-gray-900 dark:text-gray-300">
                    <AudioPlayer v-if="message.audioFile" :audioPath="getImageUrl(message.audioFile)"/>
                  </div>
                  <div v-if="message.textBody" class="message-container mt-2 p-3 border rounded bg-blue-100 dark:bg-slate-700 text-gray-900 dark:text-gray-300">
                    {{ message.textBody }}
                  </div>
                </div>
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
import {useMarketingStore} from '../../stores/marketing.store.js';
import Header from '../../partials/Header.vue';
import router from "../../router.js";
import AudioPlayer from "../messages/AudioPlayer.vue";
const baseUrl = `${import.meta.env.VITE_APP_URL}/storage/`;

const route = router.currentRoute?.value
const id = route.params?.id;


const sidebarOpen = ref(false);
const marketingStore = useMarketingStore();

const adLink = ref('');
const textTitle = ref('');
const textBody = ref('');
const previewImage = ref('');

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

function removeMessage(index) {
  this.marketingStore.autoresponderTemplate.messages.splice(index, 1);
}

function getImageUrl(filename) {

  if (!filename) return '';
  if (typeof filename === 'string') {
    const encodedFilename = encodeURIComponent(filename);
    return `${baseUrl}/${encodedFilename}`;
  }
  return URL.createObjectURL(filename);
}

onMounted(() => {
  if (id) {
    marketingStore.getAutoresponderTemplate(id)
  }
})
</script>

<style>
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}

.image-container {
  width: 100%;
  height: 200px; /* Установите желаемую высоту */
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0; /* Цвет фона, если изображение не загружено */
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Изображение заполняет контейнер и обрезается при необходимости */
  display: block;
}

#img_url {
  background: #ddd;
  width:100px;
  height: 90px;
  display: block;
}

 .message-container {
   position: relative;
   background-color: #e0f7fa; /* Слегка синий фон */
   border: 1px solid #b0bec5; /* Граница */
   padding: 10px;
   border-radius: 8px;
   margin-top: 10px;
   color: #37474f; /* Цвет текста */
 }

.message-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 1px;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #e0f7fa; /* Цвет хвостика, совпадающий с фоном */
  border-bottom: 0;
  border-left: 0;
  margin-left: -5px;
  margin-bottom: -10px;
}
</style>
