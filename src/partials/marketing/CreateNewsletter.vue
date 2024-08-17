<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false"/>

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen"/>

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
                    <h2 class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">Создание рассылки</h2>
                  </div>
                  <div class="px-5 pt-4 pb-1">
                    <div class="mb-4">
                      <label for="campaign-name" class="block text-gray-800 dark:text-gray-100 font-semibold mb-1">Наименование рассылки</label>
                      <input
                          type="text"
                          id="campaign-name"
                          class="w-full py-2 px-3 rounded bg-gray-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Введите наименование рассылки"
                      />
                    </div>
                    <div class="text-sm">
                      <div class="flex flex-col md:flex-row md:-mr-px">
                        <div class="grow flex">
                          <!-- Left Column: Selectors (вертикально) -->
                          <div class="w-1/2 pr-4">
                            <div class="mb-4">Выбор получателей</div>
                            <form class="flex flex-col space-y-2">
                              <div class="relative">
                                <select v-model="selectedOption1" @change="addTag('segment')"
                                        class="appearance-none bg-blue-100 text-blue-700 border border-gray-300 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                  <option value="">Сегмент</option>
                                  <option value="US">Успешно завершенные</option>
                                  <option value="CA">Италия</option>
                                  <option value="FR">Дубай</option>
                                  <option value="DE">Не успешно завершенные</option>
                                </select>
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                       viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M19 9l-7 7-7-7"></path>
                                  </svg>
                                </span>
                              </div>
                              <div class="relative">
                                <select v-model="selectedOption2" @change="addTag('status')"
                                        class="appearance-none bg-green-100 text-green-700 border border-gray-300 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                  <option value="">Статус</option>
                                  <option value="completed">Завершенные</option>
                                  <option value="pending">В ожидании</option>
                                  <option value="canceled">Отмененные</option>
                                </select>
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                       viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M19 9l-7 7-7-7"></path>
                                  </svg>
                                </span>
                              </div>
                              <div class="relative">
                                <select v-model="selectedOption3" @change="addTag('category')"
                                        class="appearance-none bg-red-100 text-red-700 border border-gray-300 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                  <option value="">Категория</option>
                                  <option value="business">Бизнес</option>
                                  <option value="personal">Личное</option>
                                  <option value="other">Другое</option>
                                </select>
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                       viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M19 9l-7 7-7-7"></path>
                                  </svg>
                                </span>
                              </div>
                            </form>
                          </div>

                          <!-- Right Column: Tags Container -->
                          <div class="w-1/2">
                            <div id="tagsContainer"
                                 class="p-2 border border-gray-300 rounded-lg bg-gray-50 min-h-[200px] flex flex-wrap gap-2"> <!-- Увеличена высота -->
                              <div v-for="(tag, index) in selectedTags" :key="index" :class="tag.colorClass"
                                   class="tag rounded-full">
                                {{ tag.label }}
                                <button @click="removeTag(tag.value)" class="ml-2">&times;</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="mb-4">Ввести номер</div>
                      <div class="w-full mx-auto">
                                            <textarea
                                                id="text-area"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                rows="5"
                                                placeholder="Введите ваш текст здесь...">
                                            </textarea>
                      </div>
                      <br>
                      <div class="flex flex-col md:flex-row md:-mr-px">
                        <div class="grow flex">
                          <!-- Left Column: Template Selection -->
                          <div class="w-1/2 pr-4">
                            <div class="mb-4">Выберите шаблон для отправки</div>
                            <form>
                              <select id="countries"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Выберите шаблон</option>
                                <option value="US">Успешно завершенные</option>
                                <option value="CA">Италия</option>
                                <option value="FR">Дубай</option>
                                <option value="DE">Не успешно завершенные</option>
                              </select>
                            </form>
                          </div>

                          <!-- Right Column: Text Area -->
                          <div class="w-1/2">
                            <div class="w-full mx-auto">
        <textarea
            id="text-area"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            rows="5"
            placeholder="Введите ваш текст здесь...">
        </textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Options -->
                      <br>
                      <ul class="space-y-2 mb-4">
                        <li>
                          <div
                              class="w-full h-full py-3 px-4 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm duration-150 ease-in-out">
                            <div class="flex flex-col space-y-4">
                              <div>
                                <label for="send-date"
                                       class="block text-slate-800 dark:text-slate-100 font-semibold mb-1">Выберите дату
                                  отправки</label>
                                <input
                                    type="date"
                                    id="send-date"
                                    class="w-full py-2 px-3 rounded bg-gray-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label for="send-time"
                                       class="block text-slate-800 dark:text-slate-100 font-semibold mb-1">Выберите
                                  время отправки</label>
                                <input
                                    type="time"
                                    id="send-time"
                                    class="w-full py-2 px-3 rounded bg-gray-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div class="text-xs text-slate-500">Рассылку можно изменить в любое время до отправки.</div>
                    </div>
                  </div>
                  <!-- Modal footer -->
                  <div class="px-5 py-4">
                    <div class="flex flex-wrap justify-end space-x-2">
                      <button
                          class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                          @click.stop="planModalOpen = false">Отменить
                      </button>
                      <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Сохранить</button>
                    </div>
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