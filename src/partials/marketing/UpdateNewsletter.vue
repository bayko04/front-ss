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
                    <h2 class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">Изменение рассылки</h2>
                  </div>
                  <div class="px-5 pt-4 pb-1">
                    <div class="mb-4">
                      <label for="campaign-name" class="block text-gray-800 dark:text-gray-100 font-semibold mb-1">Наименование рассылки</label>
                      <input
                          v-model="newsletterStore.newsletter.name"
                          type="text"
                          id="campaign-name"
                          class="w-full py-2 px-3 rounded bg-gray-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Введите наименование рассылки"
                          required
                      />
                    </div>
                    <div class="text-sm">
                      <div class="flex flex-col md:flex-row md:-mr-px">
                        <div class="grow flex">
                          <!-- Left Column: Selectors (вертикально) -->
                          <div class="w-1/2 pr-4">
                            <div class="mb-4">Выбор получателей</div>
                            <div class="flex flex-col space-y-2">
                              <div class="relative">
                                <Multiselect
                                    v-model="selectedCustomerTags"
                                    :options="marketingStore.customerTags"
                                    :close-on-select="false"
                                    :searchable="true"
                                    :classes="{
                                      tags: 'flex-grow flex-shrink flex flex-wrap items-center mt-1 pl-2 min-w-0 rtl:pl-0 rtl:pr-2',
                                      tag: 'bg-green-500 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap min-w-0 rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
                                      tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full',
                                    }"
                                />
                              </div>
                              <div class="relative">
                                <Multiselect
                                    v-model="newsletterStore.newsletter.chat_statuses"
                                    :options="referencesStore.chatStatuses"
                                    mode="tags"
                                    valueProp="id"
                                    label="name"
                                    :close-on-select="false"
                                    :searchable="true"
                                    :classes="{
                                      tags: 'flex-grow flex-shrink flex flex-wrap items-center mt-1 pl-2 min-w-0 rtl:pl-0 rtl:pr-2',
                                      tag: 'bg-green-500 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap min-w-0 rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
                                      tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full',
                                    }"
                                />
                              </div>
                              <div class="mb-12">Выбор периода</div>

                              <div class="grow flex">
                                <div class="w-1/2 pr-4">
                                  <input
                                    v-model="newsletterStore.newsletter.date_from"
                                    type="date"
                                    class="w-full py-2 px-3 rounded bg-gray-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                  />
                                </div>
                                <div class="w-1/2">
                                  <input
                                    v-model="newsletterStore.newsletter.date_to"
                                    type="date"
                                    class="w-full py-2 px-3 rounded bg-gray-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Right Column: Tags Container -->
                          <div class="w-1/2">
                            <div class="">
                              <div v-for="(customer, index) in customerPull" :key="index"
                                   class="tag rounded-full">
                                <div v-for="chat in customer.whatsapp_chats">
                                  {{ customer.name }} - {{ chat.phone }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br>
                      <div class="flex flex-col md:flex-row md:-mr-px">
                        <div class="grow flex">
                          <!-- Left Column: Template Selection -->
                          <div class="w-1/2 pr-4">
                            <div class="mb-4">Выберите шаблон для отправки</div>
                            <DropdownFull
                              v-model="newsletterStore.newsletter.template_id"
                              :options="referencesStore.templates"
                              @update-value="(value) => handleUpdateValue('templateId', value)"
                            />
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
                                <label for="send-date" class="block text-slate-800 dark:text-slate-100 font-semibold mb-1">
                                  Выберите дату отправки
                                </label>
                                <input
                                    v-model="newsletterStore.newsletter.send_at"
                                    type="date"
                                    id="send-date"
                                    class="w-full py-2 px-3 rounded bg-gray-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                              </div>
                              <div>
                                <label for="send-time" class="block text-slate-800 dark:text-slate-100 font-semibold mb-1">
                                  Выберите время отправки
                                </label>
                                <input
                                    v-model="newsletterStore.newsletter.send_time"
                                    type="time"
                                    id="send-time"
                                    class="w-full py-2 px-3 rounded bg-gray-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                              </div>
                              <div>
                                <h2 class="block text-sm font-medium mb-1">
                                  Статус<span class="text-rose-500">*</span></h2>
                                <DropdownFull
                                  v-model="newsletterStore.newsletter.status"
                                  :options="statuses"
                                  :selected="newsletterStore.newsletter.status"
                                  @update-value="(value) => handleUpdateValue('status', value)"
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
                      <button class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">
                        Отменить
                      </button>
                      <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="save()">Сохранить</button>
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

<script setup>
import {onMounted, ref} from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import {useMarketingStore} from '../../stores/marketing.store.js';
import {useReferencesStore} from "../../stores/references.store.js";
import {timestampToDate} from "../../helpers/date-format.js";
import Multiselect from '@vueform/multiselect'
import DropdownFull from "../../components/DropdownFull.vue";
import { useNewsletterStore } from "../../stores/newsletter.store.js";
import router from "../../router.js";

const sidebarOpen = ref()
const referencesStore = useReferencesStore()
const dateFrom = ref(null)
const dateTo = ref(null)
const selectedCustomerTags = ref(null)
const customerPull = ref([])
const newsletterStore = useNewsletterStore()

const marketingStore = useMarketingStore();

const planModalOpen = ref(false)

const selectedTags = ref([]);
const route = router?.currentRoute?.value

function removeTag(value) {
  selectedTags.value = selectedTags.value.filter(tag => tag.value !== value);
}

function selectDates(dates) {
  dateFrom.value = timestampToDate(dates[0])
  dateTo.value = timestampToDate(dates[1])
}

onMounted(() => {
  referencesStore.getChatStatuses()
  referencesStore.getTemplates()
  newsletterStore.getNewsletter(route.params.id)
})

function handleUpdateValue(field, value) {
  newsletterStore.newsletter[field] = value
}

function save() {
  newsletterStore.update(route.params.id)
}

const statuses = [
  {
    id: 'active',
    name: 'Активный'
  },
  {
    id: 'inactive',
    name: 'Неактивный'
  }
]

</script>
