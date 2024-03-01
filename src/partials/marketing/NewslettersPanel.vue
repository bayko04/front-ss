<template>
  <div class="grow" v-if="authStore.userData">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">Hello</h2>
      <!-- Picture -->
      <section>
        <div class="flex items-center">
          <div class="mr-4">
            <img class="w-20 h-20 rounded-full" :src="authStore.userData.user.image" width="80" height="80" alt="User upload" />
          </div>
        </div>
      </section>
      <!-- Business Profile -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">{{ authStore.userData.user.last_name }} {{ authStore.userData.user.name }} {{ authStore.userData.user.middle_name }}</h3>
      </section>
    </div>
      <!-- Table -->
      <OrdersTable @change-selection="updateSelectedItems($event)"/>
    <!-- Panel footer -->
    <footer>
      <div class="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
        <div class="flex self-end">
          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Сохранить изменения</button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from "../../stores/auth.store.js";
const authStore = useAuthStore()

</script>

<script>
import {ref} from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import DeleteButton from '../../partials/actions/DeleteButton.vue'
import DateSelect from '../../components/DateSelect.vue'
import FilterButton from '../../components/DropdownFilter.vue'
import OrdersTable from '../../partials/orders/OrdersTable.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'

export default {
    name: 'Orders',
    components: {
        Sidebar,
        Header,
        DeleteButton,
        DateSelect,
        FilterButton,
        OrdersTable,
        PaginationClassic,
    },
    setup() {

        const sidebarOpen = ref(false)
        const selectedItems = ref([])

        const updateSelectedItems = (selected) => {
            selectedItems.value = selected
        }

        return {
            sidebarOpen,
            selectedItems,
            updateSelectedItems,
        }
    }
}
</script>