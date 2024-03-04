<template>
  <div class="grow" v-if="authStore.userData">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
        <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <div class="mb-4 sm:mb-0">
                <h3 class="text-lg sm:text-xl md:text-2xl text-slate-800 dark:text-slate-100 font-bold">Все рассылки ✨</h3>
            </div>

            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <!-- Add customer button -->
                <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span class="hidden xs:block ml-2">Создать рассылку</span>
                </button>
            </div>
        </div>



    </div>

      <!-- Table -->
      <NewslettersTable @change-selection="updateSelectedItems($event)"/>
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
import NewslettersTable from '../../partials/marketing/NewslettersTable.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'

export default {
    name: 'Orders',
    components: {
        Sidebar,
        Header,
        DeleteButton,
        DateSelect,
        FilterButton,
        NewslettersTable,
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