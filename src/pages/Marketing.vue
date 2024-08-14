<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            <!-- Page header -->
            <div class="sm:flex sm:justify-between sm:items-center mb-8">

              <!-- Left: Title -->
              <div class="mb-4 sm:mb-0">
                <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Триггеры ✨</h1>
              </div>

              <!-- Right: Actions  -->
              <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                <!-- Add customer button -->
                <router-link to="/marketing/autoresponder">
                  <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                      <path
                          d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                    </svg>
                    <span class="hidden xs:block ml-2">Добавить триггер</span>
                  </button>
                </router-link>

              </div>

            </div>
            <CartItems />

        </div>
      </main>

    </div>

  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import ChatHeader from '../partials/ChatHeader.vue'
import {useReferencesStore} from "../stores/references.store.js";
import {useCustomerRequestStore} from "../stores/customer-request.store.js";
import PaginationNumeric from "../components/PaginationNumeric.vue";
import RequestsTable from "../partials/archive/RequestsTable.vue";
import BasicSelect from "../components/BasicSelect.vue";
import {useMessangers} from "../utils/messengers.js";
import Datepicker from "../components/Datepicker.vue";
import {timestampToDate} from "../helpers/date-format.js";
import CartItems from '../partials/marketing/CartItems.vue'

const sidebarOpen = ref(false)
const selectedItems = ref([])
const selectedStatusId = ref(0)
const selectedAccount = ref(null)
const selectedMessenger = ref(null)
const dateFrom = ref(null)
const dateTo = ref(null)

const {accounts} = useMessangers()
const referencesStore = useReferencesStore()
const customerRequestsStore = useCustomerRequestStore()

onMounted(() => {
  referencesStore.getChatStatuses()
  customerRequestsStore.getCustomerRequests()
})

function selectStatus(statusId) {
  selectedStatusId.value = statusId
  customerRequestsStore.getCustomerRequests(selectedStatusId.value, selectedAccount.value?.id, selectedMessenger.value, dateFrom.value, dateTo.value)
}

function selectAccount(account) {
  selectedAccount.value = account
  selectedMessenger.value = selectedAccount.value?.messenger.name
  customerRequestsStore.getCustomerRequests(selectedStatusId.value, selectedAccount.value?.id, selectedMessenger.value, dateFrom.value, dateTo.value)
}

function selectDates(dates) {
  dateFrom.value = timestampToDate(dates[0])
  dateTo.value = timestampToDate(dates[1])
  customerRequestsStore.getCustomerRequests(selectedStatusId.value, selectedAccount.value?.id, selectedMessenger.value, dateFrom.value, dateTo.value)
}

function clean() {
  selectedStatusId.value = null
  selectedAccount.value = null
  selectedMessenger.value = null
  dateFrom.value = null
  dateTo.value = null
  customerRequestsStore.getCustomerRequests()
}


</script>