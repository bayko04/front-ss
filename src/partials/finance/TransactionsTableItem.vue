<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/2">
      <div class="flex items-center">
        <div class="font-medium text-gray-800 dark:text-gray-100">{{transaction.transaction_type.name}}</div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{timestampToDateTime(transaction.created_at)}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">
        <div class="text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1" :class="statusColor(transaction.transaction_type.id)">{{transaction.transaction_type.is_income ? 'приход' : 'расход'}}</div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="text-right font-medium" :class="amountColor(transaction.transaction_type.is_income)">{{transaction.amount}}</div>
    </td>    
  </tr>  
</template>

<script setup>
    import {timestampToDateTime} from "../../helpers/date-format.js";

    const { transaction } = defineProps(['transaction']);

    const statusColor = (status) => {
      switch (status) {
        case 1:
          return 'bg-green-500/20 text-green-700'
        case 3:
          return 'bg-gray-400/20 text-gray-500 dark:text-gray-400'
        default:
          return 'bg-red-500/20 text-red-700'
      }
    }
    
    const amountColor = (amount) => {
      switch (amount) {
        case true:
          return 'text-green-500'
        default:
          return 'text-gray-800 dark:text-gray-300'
      }
    }
</script>
