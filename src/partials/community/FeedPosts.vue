<template>
  <div class="flex">
    <!-- Main Content -->
    <div class="flex-grow p-5">
      <div class="text-sm space-y-2 mb-5">
        <p>Добавьте заголовок или выберите тип медиа файла.</p>
        <form class="max-w-sm">
          <select v-model="selectedOption" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Не выбрано</option>
            <option value="text">Текст</option>
            <option value="media">Медиа</option>
          </select>
        </form>
      </div>

      <div v-if="selectedOption === 'text'" class="bg-white dark:bg-slate-800 shadow-md rounded border border-slate-200 dark:border-slate-700 p-5 mb-5">
        <div class="flex items-center space-x-3 mb-5">
          <div class="grow">
            <label for="ad-link-input" class="sr-only">Введите рекламную ссылку</label>
            <input v-model="inputText" id="ad-link-input" class="form-input w-full bg-slate-100 dark:bg-slate-900 border-transparent dark:border-transparent focus:bg-white dark:focus:bg-slate-800 placeholder-slate-500" type="text" placeholder="Введите рекламную ссылку">
          </div>
        </div>
      </div>

      <div v-if="selectedOption === 'media'" class="flex justify-around p-5 mb-5">
        <div class="bg-white dark:bg-slate-800 shadow-md rounded border border-slate-200 dark:border-slate-700 p-5 w-32 h-32 flex items-center justify-center">
          Картинка
        </div>
        <div class="bg-white dark:bg-slate-800 shadow-md rounded border border-slate-200 dark:border-slate-700 p-5 w-32 h-32 flex items-center justify-center">
          Видео
        </div>
        <div class="bg-white dark:bg-slate-800 shadow-md rounded border border-slate-200 dark:border-slate-700 p-5 w-32 h-32 flex items-center justify-center">
          Документ
        </div>
      </div>

      <!-- Post 2 -->
      <div class="bg-white dark:bg-slate-800 shadow-md rounded border border-slate-200 dark:border-slate-700 p-5 mb-5">
        <!-- Header -->
        <header class="flex justify-between items-start space-x-3 mb-3">
          <!-- User -->
          <div class="flex items-start space-x-3">
            <div>
              <div class="leading-tight">
                <a class="text-sm font-semibold text-slate-800 dark:text-slate-100" href="#0">Сообщение</a>
              </div>
            </div>
          </div>
        </header>
        <!-- Body -->
        <div class="text-sm text-slate-800 dark:text-slate-100 space-y-2 mb-5">
          <div class="flex items-center space-x-3 mb-5">
            <div class="grow">
              <label for="ad-body-input" class="sr-only">Введите текст сообщения</label>
              <input v-model="inputBody" id="ad-body-input" class="form-input w-full bg-slate-100 dark:bg-slate-900 border-transparent dark:border-transparent focus:bg-white dark:focus:bg-slate-800 placeholder-slate-500" type="text" placeholder="Введите текст сообщения">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Section -->
    <div v-if="selectedOption || inputText || inputBody" class="w-1/3 p-5 border-l border-gray-300 dark:border-gray-600">
      <h3 class="text-lg font-semibold mb-3">Предварительный просмотр:</h3>
      <p v-if="selectedOption">Выбранная опция: <strong>{{ selectedOption }}</strong></p>
      <p v-if="inputText">Заголовок: <strong>{{ inputText }}</strong></p>
      <p v-if="inputBody">Текст сообщения: <strong>{{ inputBody }}</strong></p>
    </div>
  </div>
</template>

<script>
import EditMenu from '../../components/DropdownEditMenu.vue'

export default {
  name: 'FeedPosts',
  components: {
    EditMenu,
  },
  data() {
    return {
      selectedOption: 'Не выбрано',
      inputText: '',
      inputBody: ''
    }
  }
}
</script>