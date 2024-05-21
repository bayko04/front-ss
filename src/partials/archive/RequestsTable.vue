<template>
    <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
        <header class="px-5 py-4">
            <h2 class="font-semibold text-slate-800 dark:text-slate-100">Архив обращений</h2>
        </header>
        <div>

            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="table-auto w-full dark:text-slate-300">
                    <!-- Table header -->
                    <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Клиент</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Статус</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Дата обращения</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Примечание</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left"> </div>
                        </th>
                    </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700"
                           v-if="customerRequestsStore.customerRequests"
                    >
                    <Request
                            v-for="customerRequest in customerRequestsStore.customerRequests.data"
                            :key="customerRequest.id"
                            :customerRequest="customerRequest"
                    />
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</template>

<script setup>
import Request from './RequestsTableItem.vue'
import {useCustomerRequestStore} from "../../stores/customer-request.store.js";

const customerRequestsStore = useCustomerRequestStore()
</script>