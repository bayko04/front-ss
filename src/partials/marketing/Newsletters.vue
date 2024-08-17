<template>
  <!--  <div class="flex h-[100dvh] overflow-hidden">-->


  <!-- Content area -->
  <!--    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">-->

  <!-- Site header -->

  <main class="grow">
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <!-- Content -->
      <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
        <div class="flex flex-col md:flex-row md:-mr-px">
          <div class="grow">
            <!-- Panel body -->
            <div class="p-6 space-y-6">
              <!-- Left: Title -->
              <div class="mb-4 sm:mb-0">
                <h2 class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">Список рассылок</h2>
              </div>
              <!-- Right: Actions  -->
              <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                <!-- Add newsletter button -->
                <div class="m-1.5">
                  <router-link to="/marketing/create-newsletter">
                    <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                      <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path
                            d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                      </svg>
                      <span class="hidden xs:block ml-2">Добавить рассылку</span>
                    </button>
                  </router-link>
                  <!-- Start -->
<!--                  <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white" aria-controls="feedback-modal" @click.stop="planModalOpen = true">Добавить рассылку</button>-->
<!--                  <ModalBasic id="feedback-modal" :modalOpen="planModalOpen" @close-modal="planModalOpen = false" title="Добавьте новую рассылку">-->
<!--                    &lt;!&ndash; Modal content &ndash;&gt;-->
<!--                    <div class="px-5 pt-4 pb-1">-->
<!--                      <div class="text-sm">-->
<!--                        <div class="mb-4">Выбор получателей</div>-->
<!--                        <form class="max-w-sm mx-auto flex items-center gap-2">-->
<!--                          <div class="relative w-1/3">-->
<!--                            <select v-model="selectedOption1" @change="addTag('segment')" class="appearance-none bg-blue-100 text-blue-700 border border-gray-300 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">-->
<!--                              <option selected>Сегмент</option>-->
<!--                              <option value="US">Успешно завершенные</option>-->
<!--                              <option value="CA">Италия</option>-->
<!--                              <option value="FR">Дубай</option>-->
<!--                              <option value="DE">Не успешно завершенные</option>-->
<!--                            </select>-->
<!--                            <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">-->
<!--                              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>-->
<!--                              </svg>-->
<!--                            </span>-->
<!--                          </div>-->
<!--                          <div class="relative w-1/3">-->
<!--                            <select v-model="selectedOption2" @change="addTag('status')" class="appearance-none bg-green-100 text-green-700 border border-gray-300 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">-->
<!--                              <option selected>Статус</option>-->
<!--                              <option value="completed">Завершенные</option>-->
<!--                              <option value="pending">В ожидании</option>-->
<!--                              <option value="canceled">Отмененные</option>-->
<!--                            </select>-->
<!--                            <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">-->
<!--                              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>-->
<!--                              </svg>-->
<!--                            </span>-->
<!--                          </div>-->
<!--                          <div class="relative w-1/3">-->
<!--                            <select v-model="selectedOption3" @change="addTag('category')" class="appearance-none bg-red-100 text-red-700 border border-gray-300 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">-->
<!--                              <option selected>Категория</option>-->
<!--                              <option value="business">Бизнес</option>-->
<!--                              <option value="personal">Личное</option>-->
<!--                              <option value="other">Другое</option>-->
<!--                            </select>-->
<!--                            <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">-->
<!--                              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>-->
<!--                              </svg>-->
<!--                            </span>-->
<!--                          </div>-->
<!--                        </form>-->
<!--                        <div id="tagsContainer" class="mt-4 p-2 border border-gray-300 rounded-lg bg-gray-50 min-h-[50px] flex flex-wrap gap-2">-->
<!--                          <div v-for="(tag, index) in selectedTags" :key="index" :class="tag.colorClass" class="tag rounded-full">-->
<!--                            {{ tag.label }}-->
<!--                            <button @click="removeTag(tag.value)" class="ml-2">&times;</button>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                        <div class="mb-4">Ввести номер</div>-->
<!--                        <div class="w-full mx-auto">-->
<!--                          <textarea-->
<!--                              id="text-area"-->
<!--                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
<!--                              rows="5"-->
<!--                              placeholder="Введите ваш текст здесь...">-->
<!--                          </textarea>-->
<!--                        </div>-->
<!--                        <div class="mb-4">Выберите шаблон для отправки</div>-->
<!--                        <form class="max-w-sm mx-auto">-->
<!--                          <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">-->
<!--                            <option selected>Выберите шаблон</option>-->
<!--                            <option value="US">Успешно завершенные</option>-->
<!--                            <option value="CA">Италия</option>-->
<!--                            <option value="FR">Дубай</option>-->
<!--                            <option value="DE">Не успешно завершенные</option>-->
<!--                          </select>-->
<!--                        </form>-->
<!--                        &lt;!&ndash; Options &ndash;&gt;-->
<!--                        <br>-->
<!--                        <ul class="space-y-2 mb-4">-->
<!--                          <li>-->
<!--                            <div class="w-full h-full py-3 px-4 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm duration-150 ease-in-out">-->
<!--                              <div class="flex flex-col space-y-4">-->
<!--                                <div>-->
<!--                                  <label for="send-date" class="block text-slate-800 dark:text-slate-100 font-semibold mb-1">Выберите дату отправки</label>-->
<!--                                  <input-->
<!--                                      type="date"-->
<!--                                      id="send-date"-->
<!--                                      class="w-full py-2 px-3 rounded bg-gray-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
<!--                                  />-->
<!--                                </div>-->
<!--                                <div>-->
<!--                                  <label for="send-time" class="block text-slate-800 dark:text-slate-100 font-semibold mb-1">Выберите время отправки</label>-->
<!--                                  <input-->
<!--                                      type="time"-->
<!--                                      id="send-time"-->
<!--                                      class="w-full py-2 px-3 rounded bg-gray-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
<!--                                  />-->
<!--                                </div>-->
<!--                              </div>-->
<!--                            </div>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                        <div class="text-xs text-slate-500">Рассылку можно изменить в любое время до отправки.</div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    &lt;!&ndash; Modal footer &ndash;&gt;-->
<!--                    <div class="px-5 py-4">-->
<!--                      <div class="flex flex-wrap justify-end space-x-2">-->
<!--                        <button class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" @click.stop="planModalOpen = false">Отменить</button>-->
<!--                        <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Сохранить</button>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </ModalBasic>-->
                  <!-- End -->
                </div>

              </div>

              <table class="min-w-full bg-white dark:bg-gray-800">
                <thead>
                <tr>
                  <th class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Название</th>
                  <th class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Статус</th>
                  <th class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Действие</th>
                  <th class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Статистика</th>
                </tr>
                </thead>
                <tbody>
                <!-- Здесь можно добавить строки таблицы -->
                <tr>
                  <td class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Пример рассылки 1</td>
                  <td class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Активна</td>
                  <td class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    <button class="text-blue-500 hover:text-blue-700">Изменить</button>
                  </td>
                  <td class="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Открытий: 50</td>
                </tr>
                <!-- Дополнительные строки можно добавлять ниже -->
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
import {onMounted, ref, watch} from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import SettingsSidebar from '../../partials/settings/SettingsSidebar.vue'
import SettingsSystem from '../../partials/settings/SettingsSystem.vue'
import {useAuthStore} from "../../stores/auth.store.js";
import {useMarketingStore} from '../../stores/marketing.store.js';
import ModalBasic from "../../components/ModalBasic.vue";
import ModalCookies from '../../components/ModalCookies.vue'
import ModalBlank from '../../components/ModalBlank.vue'
import ModalAction from '../../components/ModalAction.vue'
import ModalSearch from '../../components/ModalSearch.vue'

export default {
  name: 'Account',
  components: {
    ModalBasic,
    Sidebar,
    Header,
    SettingsSidebar,
    SettingsSystem,
    ModalCookies,
    ModalBlank,
    ModalAction,
    ModalSearch,
  },
  setup() {

    const authStore = useAuthStore();
    const settings = authStore.userData.company.assigner_settings;
    const sidebarOpen = ref()
    const isActive = ref(settings.is_active ? 'Включен' : 'Выключен')
    const maxCount = ref(settings.max_count ?? 10)
    const marketingStore = useMarketingStore();
    const basicModalOpen = ref(false)
    const scrollbarModalOpen = ref(false)
    const cookiesModalOpen = ref(false)
    const successModalOpen = ref(false)
    const dangerModalOpen = ref(false)
    const infoModalOpen = ref(false)
    const feedbackModalOpen = ref(false)
    const newsletterModalOpen = ref(false)
    const announcementModalOpen = ref(false)
    const integrationModalOpen = ref(false)
    const newsModalOpen = ref(false)
    const planModalOpen = ref(false)
    const searchModalOpen = ref(false)

    const colors = {
      segment: 'bg-blue-100 text-blue-700',
      status: 'bg-green-100 text-green-700',
      category: 'bg-red-100 text-red-700',
    };

    const options = {
      segment: [
        { value: 'US', label: 'Успешно завершенные' },
        { value: 'CA', label: 'Италия' },
        { value: 'FR', label: 'Дубай' },
        { value: 'DE', label: 'Не успешно завершенные' }
      ],
      status: [
        { value: 'completed', label: 'Завершенные' },
        { value: 'pending', label: 'В ожидании' },
        { value: 'canceled', label: 'Отмененные' }
      ],
      category: [
        { value: 'business', label: 'Бизнес' },
        { value: 'personal', label: 'Личное' },
        { value: 'other', label: 'Другое' }
      ]
    };

    const selectedOption1 = ref(''); // Выбранный элемент из первого селектора
    const selectedOption2 = ref('');  // Выбранный элемент из второго селектора
    const selectedOption3 = ref('');
    const selectedTags = ref([]);

    function addTag(type) {
      let option;
      switch (type) {
        case 'segment':
          option = selectedOption1.value;
          break;
        case 'status':
          option = selectedOption2.value;
          break;
        case 'category':
          option = selectedOption3.value;
          break;
      }

      const label = option === 'US' ? 'Успешно завершенные' :
          option === 'CA' ? 'Италия' :
              option === 'FR' ? 'Дубай' :
                  option === 'DE' ? 'Не успешно завершенные' :
                      option === 'completed' ? 'Завершенные' :
                          option === 'pending' ? 'В ожидании' :
                              option === 'canceled' ? 'Отмененные' :
                                  option === 'business' ? 'Бизнес' :
                                      option === 'personal' ? 'Личное' :
                                          option === 'other' ? 'Другое' : '';

      if (option && !selectedTags.value.some(tag => tag.value === option)) {
        selectedTags.value.push({ value: option, label: label, colorClass: colors[type] });
      }

      // Очищаем селектор после выбора
      if (type === 'segment') selectedOption1.value = '';
      if (type === 'status') selectedOption2.value = '';
      if (type === 'category') selectedOption3.value = '';
    }

    const getTagClass = (type) => {
      return {
        segment: 'bg-blue-100 text-blue-700',
        status: 'bg-green-100 text-green-700',
        category: 'bg-red-100 text-red-700'
      }[type];
    };

    const getSelectClass = (type) => {
      return {
        segment: 'bg-blue-100',
        status: 'bg-green-100',
        category: 'bg-red-100'
      }[type];
    };

    function removeTag(value) {
      selectedTags.value = selectedTags.value.filter(tag => tag.value !== value);
    }

    function save() {
      marketingStore.updateReminderSettings({
        active: marketingStore.reminderSettings.active,
        minutes: marketingStore.reminderSettings.minutes
      })
    }

    onMounted(() => {
      marketingStore.getReminderSettings()
    })

    return {
      sidebarOpen,
      isActive,
      maxCount,
      marketingStore,
      save,
      basicModalOpen,
      scrollbarModalOpen,
      cookiesModalOpen,
      successModalOpen,
      dangerModalOpen,
      infoModalOpen,
      feedbackModalOpen,
      newsletterModalOpen,
      announcementModalOpen,
      integrationModalOpen,
      newsModalOpen,
      planModalOpen,
      searchModalOpen,
      selectedOption1,
      selectedOption2,
      selectedOption3,
      selectedTags,
      getTagClass,
      getSelectClass,
      removeTag,
      addTag,
    };
  },
}
</script>