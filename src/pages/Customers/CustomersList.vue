<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <!-- Sidebar -->
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
          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1
                class="test text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold"
              >
                Клиенты ✨
              </h1>
            </div>

            <!-- Right: Actions  -->
            <div
              class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
            >
              <!-- Search form -->
              <SearchForm @input-change="search" />
              <!-- Add member button -->
              <router-link
                to="/customers/create"
                class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                <svg
                  class="w-4 h-4 fill-current opacity-50 shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
                  />
                </svg>
                <span class="hidden xs:block ml-2">Добавить</span>
              </router-link>
            </div>
          </div>

          <!-- Cards -->
          <div v-if="customerStore.customers">
            <table class="table-auto bg-white w-full rounded-sm shadow-lg">
              <thead
                class="text-left rounded-sm border border-[1px] border-slate-200 dark:border-slate-700 bg-slate-50"
              >
                <tr class="rounded-sm">
                  <th class="px-5 py-4 text-left">Имя</th>
                </tr>
              </thead>
              <tbody class="text-start">
                <router-link
                  class="block"
                  :key="customer.id"
                  v-for="customer in customerStore.customers.data"
                  :to="{ name: 'customerProfile', params: { id: customer.id } }"
                >
                  <tr
                    class="border-b-[1px] w-full block border-slate-200 cursor-pointer"
                  >
                    <td class="px-5 py-4">
                      {{ customer.name || "Нет имени" }}
                    </td>
                  </tr>
                </router-link>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="mt-8">
            <PaginationNumeric
              :paginateData="customerStore.customers"
              :paginateAction="customerStore.customersPaginate"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Sidebar from "../../partials/Sidebar.vue";
import Header from "../../partials/Header.vue";
import SearchForm from "../../components/SearchForm.vue";
import CustomersTabsCard from "./CustomersTabsCard.vue";
import PaginationNumeric from "../../components/PaginationNumeric.vue";
import { useCustomerStore } from "../../stores/customer.store.js";

const customerStore = useCustomerStore();
const sidebarOpen = ref(false);

function search(searchStr) {
  customerStore.getCustomers(searchStr);
}

onMounted(() => {
  customerStore.getCustomers();
});
</script>
