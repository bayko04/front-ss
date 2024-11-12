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
            class="sm:flex sm:justify-between items-center sm:items-center mb-4 md:mb-2"
          >
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1
                class="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold"
              >
                Баланс: {{ balance["balance"] }} сомов
              </h1>
            </div>

            <div
              class="bg-indigo-500 text-white py-[5px] px-[10px] rounded-[5px]"
            >
              <button>Пополнить баланс</button>
            </div>

            <!--            &lt;!&ndash; Right: Actions  &ndash;&gt;-->
            <!--            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">-->

            <!--              &lt;!&ndash; Search form &ndash;&gt;-->
            <!--              <div class="hidden sm:block">-->
            <!--                <SearchForm class="hidden sm:block" />-->
            <!--              </div>-->

            <!--              &lt;!&ndash; Export button &ndash;&gt;-->
            <!--              <button class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">Экспорт транзакций</button>-->

            <!--            </div>-->
          </div>

          <div class="flex gap-[20px] items-center">
            <router-link
              @click="activeTab = 'overview'"
              to="overview"
              :class="[
                'py-[10px] px-[20px] rounded-[8px] text-[12px] font-semibold',
                activeTab === 'overview'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
              ]"
            >
              Обзор
            </router-link>
            <router-link
              @click="activeTab = 'transactions'"
              to="transactions"
              :class="[
                'py-[10px] px-[20px] rounded-[8px] text-[12px] font-semibold',
                activeTab === 'transactions'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
              ]"
              >Транзакции</router-link
            >
          </div>

          <!-- Filters -->
          <div class="mb-5">
            <!--            <ul class="flex flex-wrap -m-1">-->
            <!--              <li class="m-1">-->
            <!--                <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800 transition">View All</button>-->
            <!--              </li>-->
            <!--              <li class="m-1">-->
            <!--                <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">Completed</button>-->
            <!--              </li>-->
            <!--              <li class="m-1">-->
            <!--                <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">Pending</button>-->
            <!--              </li>-->
            <!--              <li class="m-1">-->
            <!--                <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">Canceled</button>-->
            <!--              </li>-->
            <!--            </ul>-->
          </div>

          <router-view />
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
