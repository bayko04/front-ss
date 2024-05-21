<template>
    <tr>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-medium text-slate-800 dark:text-slate-100">{{customerRequest.chat?.customer?.name ?? customerRequest.chat?.name}}</div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5" :class="statusColor(customerRequest.chat_status?.name)">{{customerRequest.chat_status?.name}}</div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div>{{timestampToDateTime(customerRequest.created_at)}}</div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-medium text-slate-800 dark:text-slate-100">{{customerRequest.comment}}</div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
            <div @click="customerRequestsStore.setChatByCustomerRequestId(customerRequest.id)" class="space-x-1">
                <button class="">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" width="44" height="44" viewBox="0 0 32 32" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                    <path d="M8 13l3 -2l2 2l3 -2" />
                  </svg>
                </button>
            </div>
        </td>
    </tr>
</template>

<script setup>
import {timestampToDateTime} from "../../helpers/date-format.js";
import {useCustomerRequestStore} from "../../stores/customer-request.store.js";

const { customerRequest } = defineProps(['customerRequest']);
const customerRequestsStore = useCustomerRequestStore()

const totalColor = (status) => {
  switch (status) {
    case 'Paid':
      return 'text-emerald-500'
    case 'Due':
      return 'text-amber-500'
    case 'Overdue':
      return 'text-rose-500'
    default:
      return 'text-slate-500'
  }
}

const statusColor = (status) => {
  switch (status) {
    case 'Paid':
      return 'bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400'
    case 'Due':
      return 'bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400'
    case 'Overdue':
      return 'bg-rose-100 dark:bg-rose-500/30 text-rose-500 dark:text-rose-400'
    default:
      return 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
  }
}

</script>