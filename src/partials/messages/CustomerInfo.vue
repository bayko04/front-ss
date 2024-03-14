<template>
  <!-- Sidebar -->
  <div v-if="activeChat">
    <div class="lg:sticky lg:top-16 bg-slate-50 dark:bg-slate-800/20 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 lg:w-[320px] xl:w-[352px] 2xl:w-[calc(352px+80px)] lg:h-[calc(100dvh-64px)]">
      <div class="py-8 px-4 lg:px-8 2xl:px-12">
        <div class="text-slate-800 dark:text-slate-100 font-semibold mb-2">Детали обращения</div>
        <div class="max-w-sm mx-auto lg:max-w-none">
          <div class="space-y-6">

              <!-- Order summary -->
              <div>
                  <ul v-if="customerStore.customer" class="mb-4">
                      <li class="text-sm w-full flex justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                          <div>{{ customerStore.customer.name }}</div>
                      </li>

                      <div v-if="customerStore.customer.phone" class="grow flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-address-book" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z" />
                              <path d="M10 16h6" />
                              <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                              <path d="M4 8h3" />
                              <path d="M4 12h3" />
                              <path d="M4 16h3" />
                          </svg>
                          <span class="text-sm font-medium ml-3 2xl:opacity-100 duration-200">{{ customerStore.customer.phone }}</span>
                      </div>
                      <div v-if="customerStore.customer.email" class="grow flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                              <path d="M3 7l9 6l9 -6" />
                          </svg>
                          <span class="text-sm font-medium ml-3 2xl:opacity-100 duration-200">{{ customerStore.customer.email }}</span>
                      </div>

<!--                      <li class="text-sm w-full flex justify-between py-3 border-b border-slate-200 dark:border-slate-700">-->
<!--                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-whatsapp" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#41cc41" fill="none" stroke-linecap="round" stroke-linejoin="round">-->
<!--                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>-->
<!--                              <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />-->
<!--                              <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />-->
<!--                          </svg>-->
<!--                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-telegram" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4298ed" fill="none" stroke-linecap="round" stroke-linejoin="round">-->
<!--                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>-->
<!--                              <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />-->
<!--                          </svg>-->
<!--                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-facebook" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#124578" fill="none" stroke-linecap="round" stroke-linejoin="round">-->
<!--                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>-->
<!--                              <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />-->
<!--                          </svg>-->
<!--                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#d93848" fill="none" stroke-linecap="round" stroke-linejoin="round">-->
<!--                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>-->
<!--                              <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />-->
<!--                              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />-->
<!--                              <path d="M16.5 7.5l0 .01" />-->
<!--                          </svg>-->
<!--                      </li>-->
                  </ul>
              </div>
              <!-- Add new client -->
              <div v-if="!customerStore.customer">
                  <div class="text-slate-800 dark:text-slate-100 font-semibold mb-4">Клиента нет базе. Добавить?</div>
                  <div class="mb-4 mt-4">
                      <button @click="onSubmit" class="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white">Привязать к существующему клиенту</button>
                  </div>
                  <div class="space-y-4">
                      <!-- Name -->
                      <div>
                          <label class="block text-sm font-medium mb-1" for="name">Полное имя клиента <span
                                  class="text-rose-500">*</span></label>
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
              <button title="Добавить в контакты" v-if="!customerStore.customer" @click="openSearchModal()" class="p-1.5 shrink-0 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-address-book fill-current text-indigo-500 w-4 h-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z" />
                      <path d="M10 16h6" />
                      <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M4 8h3" />
                      <path d="M4 12h3" />
                      <path d="M4 16h3" />
                  </svg>
              </button>





              <!-- Live time value -->
              <div>
                  <ul class="mb-4">
                      <li class="text-sm w-full flex justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                          <div>LTV</div>
                          <div class="font-medium text-emerald-600">$253</div>
                      </li>
                  </ul>
              </div>
              <!-- Choose segment -->
              <div>
                  <label class="block text-sm font-medium mb-1" for="card-country">Сегмент клиента</label>
                  <button @click="addTag" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                      <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                      </svg>
                      <span class="ml-2">Добавить сегмент</span>
                  </button>
                  <div v-for="(tag, index) in tags" :key="index" class="mt-2">
                      <template v-if="tag.inputVisible">
                          <input v-model="tag.name" @keyup.enter="confirmTag(index)" @blur="cancelInput(index)" class="form-input rounded">
                      </template>
                      <template v-else>
                          <div class="flex items-center bg-gray-200 text-gray-700 rounded py-1 px-2 mt-1 mr-1" @click="showInput(index)">
                              <span>{{ tag.name }}</span>
                              <button @click="removeTag(index)" class="ml-2 text-red-600">&times;</button>
                          </div>
                      </template>
                  </div>
              </div>
              <!-- Create task -->
              <div>
                  <ul class="mb-4">
                    <div @click="openTaskModal()" class="grow flex items-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checklist w-6 h-6" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
                        <path d="M14 19l2 2l4 -4" />
                        <path d="M9 8h4" />
                        <path d="M9 12h2" />
                      </svg>
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
                  <select id="card-country" class="form-select w-full" @change="handleStatusChange">
                      <option value="" selected disabled>Выберите статус</option>
                      <option v-for="status in referenceStore.chatStatuses" :value="status.id">{{status.name}}</option>
                  </select>
              </div>
              <!-- Take chat -->
              <button v-if="authStore.userData.user.id != activeChat.user_id" @click="assignChat(authStore.userData.user.id, activeChat)" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span class="ml-2">Принять чат</span>
              </button>
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
import {Field} from "vee-validate";
import DropdownFull from "../../components/DropdownFull.vue";
import {timestampToDate} from "../../helpers/date-format.js";


const customerRequestStore = useCustomerRequestStore()
const customerStore = useCustomerStore()
const referenceStore = useReferencesStore()
const { activeChat, assignChat, activeAccount } = await useMessangers()
const taskStore = useTaskStore()
const { changeChatStatus } = useMessangers()
const authStore = useAuthStore()

const name = ref('')
const phone = ref('')
const email = ref('')
const comment = ref('')

async function onSubmit() {
    console.log(name.value)
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
}

function openTaskInfo(task) {
  taskStore.task = task
  createTaskModal.value.status = 'info'
}

async function handleStatusChange(event) {
    const selectedStatus = event.target.value
    await changeChatStatus(selectedStatus)
}

onMounted(() => {
    referenceStore.getChatStatuses()
})
</script>

<script>


export default {
    data() {
        return {
            tags: []
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