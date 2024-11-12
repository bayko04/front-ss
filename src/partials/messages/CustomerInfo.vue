<template>
  <!-- Sidebar -->
  <div v-if="activeChat" class="hidden md:block">
    <div class="lg:sticky lg:top-16 bg-slate-50 dark:bg-slate-800/20 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 lg:w-[320px] xl:w-[352px] 2xl:w-[calc(352px+80px)] lg:h-[calc(100dvh-64px)]">
      <div class="py-8 px-4 lg:px-8 2xl:px-12">
        <div class="text-slate-800 dark:text-slate-100 font-semibold mb-2">Детали обращения</div>
        <div class="max-w-sm mx-auto lg:max-w-none">
          <div class="space-y-6">

              <!-- Order summary -->
              <div>
                  <ul v-if="activeChat.customer" class="mb-4">
                      <li class="text-sm w-full flex justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                        <div>{{ activeChat.customer.name }}</div>
                        <div>
                          <router-link :to="`/customers/update/${activeChat.customer.id}`">
                            <Edit/>
                          </router-link>
                        </div>
                      </li>
                    <div v-if="activeChat.customer.comment" class="grow mt-2 mb-2 flex items-center">
                      <span class="text-sm ml-3 2xl:opacity-100 duration-200">{{ activeChat.customer.comment }}</span>
                    </div>
                      <div v-if="activeChat.customer.phone" class="grow flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-address-book" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z" />
                              <path d="M10 16h6" />
                              <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                              <path d="M4 8h3" />
                              <path d="M4 12h3" />
                              <path d="M4 16h3" />
                          </svg>
                          <span class="text-sm font-medium ml-3 2xl:opacity-100 duration-200">{{ activeChat.customer.phone }}</span>
                      </div>
                      <div v-if="activeChat.customer.email" class="grow flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                              <path d="M3 7l9 6l9 -6" />
                          </svg>
                          <span class="text-sm font-medium ml-3 2xl:opacity-100 duration-200">{{ activeChat.customer.email }}</span>
                      </div>
                  </ul>
              </div>
              <!-- Add new client -->
              <div v-if="!activeChat.customer">
                  <div class="text-slate-800 dark:text-slate-100 font-semibold mb-4">Клиента нет базе. Добавить?</div>
                  <!-- Add or connect user -->
                  <div>
                      <ul class="mb-4">
                          <div @click="toggleAddClientForm" class="grow flex items-center cursor-pointer">
                            <img :src="clientIcon" alt="Image description" class="w-6 h-6">
                              <span class="text-sm font-medium ml-3 2xl:opacity-100 duration-200">Добавить клиента</span>
                          </div>
                      </ul>
                      <!-- Form -->
                      <div v-if="showAddClientForm">
                          <div class="space-y-4">
                              <!-- Name -->
                              <div>
                                  <label class="block text-sm font-medium mb-1" for="name">Полное имя клиента <span class="text-rose-500">*</span></label>
                                  <Field v-model="name" id="name" name="name" class="form-input w-full" type="text"/>
                              </div>
                              <!-- Number -->
                              <div>
                                  <label class="block text-sm font-medium mb-1" for="phone">Номер телефона </label>
                                  <Field v-model="phone" id="phone" class="form-input w-full" type="tel" placeholder="0 779 779 979"  name="phone"/>
                              </div>
                              <!-- Email -->
                              <div>
                                  <label class="block text-sm font-medium mb-1" for="email">Email </label>
                                  <Field v-model="email" id="email" class="form-input w-full" type="email" placeholder="team@cerera.io"  name="email"/>
                              </div>
                              <!-- Comments -->
                              <div>
                                  <label class="block text-sm font-medium mb-1" for="comment">Примечание </label>
                                  <Field v-model="comment" id="comment" class="form-input w-full" type="text" placeholder="" name="comment"/>
                              </div>
                          </div>
                          <div class="mb-4 mt-4">
                              <button @click="onSubmit" class="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white">Добавить клиента</button>
                          </div>
                      </div>
                  </div>
                  <div>
                      <ul class="mb-4">
                          <div @click="openSearchModal()" class="grow flex items-center cursor-pointer">
                            <img :src="clientsIcon" alt="Image description" class="w-6 h-6">
                              <span class="text-sm font-medium ml-3 2xl:opacity-100 duration-200">Привязать к существующему клиенту</span>
                          </div>
                      </ul>
                  </div>
                  <!-- -->
              </div>

              <div v-if="activeAccount.ai_active && !activeChat.latest_customer_request.user_handle">
                  <ul class="mb-4">
                    <div @click="handleUser()" class="grow flex items-center cursor-pointer">
                      <img :src="managerIcon" alt="Image description" class="w-6 h-6">
                      <span class="text-sm font-medium ml-3 2xl:opacity-100 duration-200">Переключить на менеджера</span>
                    </div>
                  </ul>
              </div>
            <!-- Create task -->
              <div>
                <ul class="mb-4">
                  <div @click="openTaskModal()" class="grow flex items-center cursor-pointer">
                    <img :src="taskIcon" alt="Image description" class="w-6 h-6">
                    <span class="text-sm font-medium ml-3 2xl:opacity-100 duration-200">Создать задачу</span>
                  </div>
                </ul>
              </div>
              <div>
                  <ul class="grid grid-cols-2 gap-1">
                      <li v-for="task in taskStore.tasks" @click.stop="openTaskInfo(task)"
                          class="text-xs text-slate-600 font-medium px-2.5 py-2 bg-white border border-slate-200 rounded-lg my-5 cursor-pointer" style="margin-top: -7px;">
                          <div><strong>{{ task.name }}</strong></div>
                          <div class="text-xs">{{ formatDatefunc(task.due_date) }}</div>
                      </li>
                  </ul>
              </div>
              <!-- Chat status -->
              <div>
                  <label class="block text-sm font-medium mb-1" for="card-country">Статус обращения</label>
                  <select v-model="activeChat.latest_customer_request.chat_status_id" id="card-country" class="form-select w-full" @change="handleStatusChange">
                      <option v-for="status in referenceStore.chatStatuses" :value="status.id">{{status.name}}</option>
                  </select>
              </div>
         
              <!-- User -->
            <div>
              <label class="block text-sm font-medium mb-1" for="card-country">Назначить на</label>
              <select v-model="activeChat.latest_customer_request.user_id" id="card-country" class="form-select w-full"
                      @change="handleUserChange">
                <option v-for="user in usersStore.users" :value="user.id">{{ user.name }}</option>
              </select>
            </div>
            <div v-if="activeChat.latest_customer_request.slots" class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div class="font-medium text-slate-800 dark:text-slate-100 mb-2">Информация от клиента</div>
              <ul class="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                <li v-for="(value, key) in activeChat.latest_customer_request.slots" :key="key" class="flex justify-between">
                  <span class="font-semibold">{{ key }}:</span>
                  <span>{{ value }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useMessangers } from "../../utils/messengers.js";
import {useCustomerStore} from "../../stores/customer.store.js"
import { createTaskModal } from "../../utils/modalVariables.js"
import {useTaskStore} from "../../stores/task.store.js"
import {useCustomerRequestStore} from "../../stores/customer-request.store.js";
import {useReferencesStore} from "../../stores/references.store.js";
import {onMounted, ref} from "vue";
import { useAuthStore } from "../../stores/auth.store.js";
import { useUsersStore} from "../../stores/user.store.js";
import { searchContactModal } from "../../utils/modalVariables.js";
import managerIcon from "../../images/chat/manager.svg?url"
import taskIcon from "../../images/chat/task-list.svg?url"
import clientsIcon from "../../images/chat/clients.svg?url"
import clientIcon from "../../images/chat/client.svg?url"

import {Field} from "vee-validate";
import Edit from "../../images/edit.svg";

const customerRequestStore = useCustomerRequestStore()
const customerStore = useCustomerStore()
const referenceStore = useReferencesStore()
const { activeChat, activeAccount } = await useMessangers()
const taskStore = useTaskStore()
const authStore = useAuthStore()
const usersStore = useUsersStore()

const name = ref('')
const phone = ref('')
const email = ref('')
const comment = ref('')

function openSearchModal() {
    searchContactModal.value.stayOpen = true
    searchContactModal.value.status = true
}

async function onSubmit() {
    const values = {
        name: name.value,
        phone: phone.value,
        comment: comment.value,
        email: email.value,
        chat_id: activeChat.value.id,
        messenger: activeAccount.value.messenger.name
    }
    customerStore.addCustomerToChat(values)
}

function openTaskModal() {
    createTaskModal.value.stayOpen = true
    createTaskModal.value.status = 'create-update'
    createTaskModal.value.customerRequestId = activeChat.value.latest_customer_request.id
}

function openTaskInfo(task) {
  taskStore.task = task
  createTaskModal.value.status = 'info'
}

async function handleUser(event) {
  await customerRequestStore.handleUser(activeChat.value.latest_customer_request.id)
  activeChat.value.latest_customer_request.user_handle = true
}

async function handleStatusChange(event) {
    const selectedStatus = event.target.value
    await customerRequestStore.changeChatStatus(selectedStatus, activeChat.value.latest_customer_request.id)
}

async function handleUserChange(event) {
  const selectedUser = event.target.value
  await customerRequestStore.changeUser(selectedUser, activeChat.value.latest_customer_request.id)
}

onMounted(() => {
    referenceStore.getChatStatuses()
})
</script>

<script>


export default {
    data() {
        return {
            tags: [],
            showAddClientForm: false,
            name: '',
            phone: '',
            email: '',
            comment: ''
        };
    },
    methods: {
        addTag() {
            this.tags.push({ name: '', inputVisible: true });
        },
        showInput(index) {
            this.$set(this.tags[index], 'inputVisible', true);
        },
        confirmTag(index) {
            if (this.tags[index].name.trim() !== '') {
                this.tags[index].inputVisible = false;
            }
        },
        cancelInput(index) {
            if (this.tags[index].name === '') {
                this.tags.splice(index, 1);
            } else {
                this.tags[index].inputVisible = false;
            }
        },
        removeTag(index) {
            this.tags.splice(index, 1);
        },
        toggleAddClientForm() {
            this.showAddClientForm = !this.showAddClientForm;
        }
    },
    setup() {
        const feedbackModalOpen = ref(false)

        return {
            feedbackModalOpen,
        }
    }
};

function formatDatefunc(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-GB', options).replace(/\//g, '.');
    return formattedDate;
}
</script>