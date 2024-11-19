<template lang="">
  <div>
    <div>
      <!-- Table -->
      <TransactionsTable
        v-if="balance.transactions"
        :transactions="balance.transactions"
      />
    </div>
  </div>
</template>
<script setup>
import TransactionsTable from "../../partials/finance/TransactionsTable.vue";
import { onMounted, ref } from "vue";
import { useBillingStore } from "../../stores/billing.store.js";

const { billingStore, balance } = useBillingStore();
// const balance = ref([]);

onMounted(async () => {
  // if (balance.value.transactions.length === 0) {
  //   balance.value = await billingStore.getBalance();
  // }
});
</script>
