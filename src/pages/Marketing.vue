<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full">

          <!-- Page content -->
          <div class="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">

            <!-- Cart items -->
            <div class="mb-6 lg:mb-0">
              <div class="mb-3">
                <div class="flex text-sm font-medium text-slate-400 dark:text-slate-500 space-x-2">
                  <span class="text-indigo-500">Review</span>
                  <span>-&gt;</span>
                  <span class="text-slate-500 dark:text-slate-400">Payment</span>
                  <span>-&gt;</span>
                  <span class="text-slate-500 dark:text-slate-400">Confirm</span>
                </div>
              </div>
              <header class="mb-2">
                <!-- Title -->
                <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Триггеры ✨</h1>
              </header>

              <!-- Cart items -->
              <CartItems />

            </div>

            <!-- Sidebar -->
            <div>
              <div class="bg-slate-50 dark:bg-slate-800/20 p-4 rounded border border-slate-200 dark:border-slate-700">
                <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-4">Социальные сети</div>
                <ul class="space-y-3">
                  <li>
                    <div class="flex items-center justify-between">
                      <div class="grow flex items-center">
                        <div class="relative mr-3">
                          <img class="w-8 h-8 rounded-full" src="../images/chat/whatsapp-color.svg" width="32" height="32" alt="Group 01" />
                        </div>
                        <div class="truncate">
                          <span class="text-sm font-medium text-slate-800 dark:text-slate-100">WhatsApp</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center justify-between">
                      <div class="grow flex items-center">
                        <div class="relative mr-3">
                          <img class="w-8 h-8 rounded-full" src="../images/chat/instagram1.svg" width="32" height="32" alt="Group 02" />
                        </div>
                        <div class="truncate">
                          <span class="text-sm font-medium text-slate-800 dark:text-slate-100">Instagram</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
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