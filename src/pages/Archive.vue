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
                    <div class="sm:flex sm:justify-between sm:items-center mb-5">

                        <!-- Left: Title -->
                        <div class="mb-4 sm:mb-0">
                            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Архив обращений ✨</h1>
                        </div>

                    </div>

                    <!-- More actions -->
                    <div class="sm:flex sm:justify-between sm:items-center mb-5">

                        <!-- Left side -->
                        <div class="mb-4 sm:mb-0">
                            <ul class="flex flex-wrap -m-1">
                                <li class="m-1"
                                    @click="selectStatus(0)"
                                >
                                    <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border"
                                        :class="selectedStatusId === 0 ? 'border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out'"
                                      >Все <span class="ml-1 text-indigo-200">{{customerRequestsStore.customerRequestsCount}}</span></button>
                                </li>
                                <li class="m-1"
                                    v-for="status in referencesStore.chatStatuses"
                                    @click="selectStatus(status.id)"
                                >
                                    <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border"
                                        :class="selectedStatusId === status.id ? 'border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out'"
                                    >
                                      {{ status.name }}
                                      <span class="ml-1 text-slate-400 dark:text-slate-500">{{customerRequestsStore.sortedCustomerRequestsCount[status.id]}}</span>
                                    </button>
                                </li>
                            </ul>
                          <!-- Right side -->
                        </div>

                        <!-- Right side -->
                        <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                          <BasicSelect v-model="selectedAccountId" :title="'Аккаунты'" :options="accounts"/>
                        </div>

                    </div>

                    <!-- Table -->
                    <RequestsTable />

                    <!-- Pagination -->
                    <div class="mt-8">
                        <PaginationNumeric :paginate-action="customerRequestsStore.customerRequestsPaginate" :paginate-data="customerRequestsStore.customerRequests" />
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
import {useReferencesStore} from "../stores/references.store.js";
import {useCustomerRequestStore} from "../stores/customer-request.store.js";
import PaginationNumeric from "../components/PaginationNumeric.vue";
import RequestsTable from "../partials/archive/RequestsTable.vue";
import BasicSelect from "../components/BasicSelect.vue";
import {useMessangers} from "../utils/messengers.js";


const sidebarOpen = ref(false)
const selectedItems = ref([])
const selectedStatusId = ref(0)
const selectedAccountId = ref(null)

const {accounts} = useMessangers()

const referencesStore = useReferencesStore()
const customerRequestsStore = useCustomerRequestStore()

onMounted(() => {
  referencesStore.getChatStatuses()
  customerRequestsStore.getCustomerRequests()
})

function selectStatus(statusId) {
  selectedStatusId.value = statusId
  customerRequestsStore.getCustomerRequests(statusId)
}

</script>