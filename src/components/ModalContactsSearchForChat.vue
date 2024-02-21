<template>
  <!-- Modal backdrop -->
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-out duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="searchContactModal.status" class="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity" aria-hidden="true"></div>
  </transition>
  <!-- Modal dialog -->
  <transition
    enter-active-class="transition ease-in-out duration-200"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in-out duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div v-show="searchContactModal.status" class="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6" role="dialog" aria-modal="true">
      <div ref="modalContent" class="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg">
        <!-- Search form -->
        <form class="border-b border-slate-200 dark:border-slate-700">
          <div class="relative">
            <label class="sr-only">Поиск клиента</label>
            <input @input="search" class="w-full dark:text-slate-300 bg-white dark:bg-slate-800 border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none py-3 pl-10 pr-4" type="search" placeholder="Введите имя клиента" ref="searchInput" />
            <button class="absolute inset-0 right-auto group" type="submit" aria-label="Search">
              <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-4 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </form>
        <div class="py-4 px-2">
          <!-- Recent searches -->
          <div class="mb-3 last:mb-0">
            <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase px-2 mb-2">Результаты поиска</div>
            <ul class="text-sm">
              <li v-for="customer in customerStore.customers?.data" :key="customer.id">
                <div class="flex">
                  <button class="flex-1 flex items-center p-2 text-slate-800 dark:text-slate-100 rounded group">
                    <span>{{ customer.last_name }} {{ customer.name }} {{ customer.middle_name }}</span>
                  </button>
                  <button @click="setCustomerContact(customer.id)" class="w-20 flex justify-center p-2 dark:text-slate-100 text-white bg-indigo-500 rounded group">
                    <span>выбрать</span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="searchInput && searchInput.value && searchInput.value.length >= 2" class="mb-3 last:mb-0 ml-2">
          <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase px-2 mb-4">Не нашли нужного клиента?</div>
          <router-link class="text-slate-400 underline focus:outline-none px-2 mb-4" :to="'/customers/create'">Добавить клиента</router-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue'
import {searchContactModal} from "../utils/modalVariables.js"
import {useCustomerStore} from "../stores/customer.store.js";

const modalContent = ref(null)
const searchInput = ref(null)
const customerStore = useCustomerStore()

function closeModal() {
  searchContactModal.value.status = false;
}

async function setCustomerContact(customerId) {
  await customerStore.setChatAsCustomerContact(customerId)
  customerStore.customers = []
  searchInput.value.value = ''
  closeModal()
}

function search(event) {
  let value = event.target.value
  if(value.length >= 2) {
    customerStore.searchCustomers(value)
  }
}
// close on click outside
const clickHandler = ({ target }) => {
  if (searchContactModal.value.stayOpen || modalContent.value.contains(target)) {
    searchContactModal.value.stayOpen = false;
    return;
  }

  searchContactModal.value.status = false;
}


onMounted(() => {
  document.addEventListener('click', clickHandler)
})

onUnmounted(() => {
  document.removeEventListener('click', clickHandler)
})

watch(() => searchContactModal.value.status, (open) => {
  open && nextTick(() => searchInput.value.focus())
})
</script>