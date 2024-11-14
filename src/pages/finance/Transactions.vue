<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <!-- Site header -->
      <Header
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div
            class="flex justify-between items-center mb-4 mb-2 max-sm:flex-col max-sm:items-start"
          >
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1
                class="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold"
              >
                Баланс: {{ balance["balance"] }}
              </h1>
            </div>

            <div
              class="bg-indigo-500 text-white py-[5px] px-[10px] inline-block rounded-[5px]"
            >
              <button>Пополнить баланс</button>
            </div>
          </div>

          <div class="flex gap-[10px] items-center relative z-0">
            <router-link
              @click="activeTab = 'overview'"
              to="overview"
              :class="[
                'py-[10px] px-[20px] mb-[-5px] rounded-t-[8px] text-[12px] font-semibold border',
                activeTab === 'overview'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-800 bg-white',
              ]"
            >
              Обзор
            </router-link>
            <router-link
              @click="activeTab = 'transactions'"
              to="transactions"
              :class="[
                'py-[10px] px-[20px] mb-[-5px] rounded-t-[8px] text-[12px] font-semibold border',
                activeTab === 'transactions'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-800 bg-white',
              ]"
              >Транзакции</router-link
            >
          </div>
          <div class="h-[700px] max-md:h-[300px] bg-white relative z-10">
            <router-view />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../../partials/Sidebar.vue";
import Header from "../../partials/Header.vue";

import TransactionsTable from "../../partials/finance/TransactionsTable.vue";
import { onMounted, ref } from "vue";
import { useBillingStore } from "../../stores/billing.store.js";
import { useRouter } from "vue-router";

const router = useRouter();
const billingStore = useBillingStore();
const balance = ref([]);
const activeTab = ref("overview");

onMounted(async () => {
  balance.value = await billingStore.getBalance();

  if (router.currentRoute.value.path !== "/finance/overview") {
    router.push("/finance/overview");
  }
});
</script>
