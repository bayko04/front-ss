<template>
  <div class="bg-white dark:bg-gray-900">
    <div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full dark:text-gray-300">
          <!-- Table header -->
          <thead class="text-xs font-semibold uppercase text-gray-500 border-t border-b border-gray-200 dark:border-gray-700/60">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Транзакция</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Дата</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Тип</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-right">Сумма</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-gray-100 dark:divide-gray-700/60 border-b border-gray-200 dark:border-gray-700/60">
            <TransactionItem
              v-for="transaction in transactions"
              :key="transaction.id"
              :transaction="transaction"
              :value="transaction.id"
            />
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import TransactionItem from './TransactionsTableItem.vue'
import {useBillingStore} from "../../stores/billing.store.js";

const balance = ref([])
const transactions = ref([])

const billingStore = useBillingStore()

onMounted(async () => {
  balance.value = await billingStore.getBalance()
  transactions.value = balance.value.transactions
})
</script>
