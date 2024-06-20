<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Продукты ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

              <!-- Delete button -->
              <DeleteButton :selectedItems="selectedItems" />
              <!-- Import products button -->

              <!-- Upload file input -->
              <label class="btn bg-indigo-500 hover:bg-indigo-600 text-white" for="file_input">Импорт <span v-if="file"> ({{file.name}})</span></label>
              <input class="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" @change="handleFileChange">
              <button v-if="importButtonVisible" id="import_button" class="btn bg-indigo-500 hover:bg-indigo-600 text-white" @click="importFile">
                подтвердить
              </button>

              <!-- Add customer button -->
              <button @click.stop="productStore.productModalStatus = 'add'" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="hidden xs:block ml-2">Добавить продукт</span>
              </button>     
                       
            </div>

          </div>

          <!-- Table -->
          <CustomersTable @change-selection="updateSelectedItems($event)" />

          <!-- Pagination -->
          <div class="mt-8">
            <PaginationNumeric :paginateData="productStore.products" :paginateAction="productStore.productsPaginate"/>
          </div>          


        <CreateProduct/>

        </div>
      </main>

    </div> 

  </div>
</template>

<script>

import {onMounted, ref} from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import DeleteButton from '../../partials/actions/DeleteButton.vue'
import DateSelect from '../../components/DateSelect.vue'
import FilterButton from '../../components/DropdownFilter.vue'
import CustomersTable from '../../partials/products/CustomersTable.vue'
import {useProductStore} from '../../stores/product.store.js';
import PaginationNumeric from "../../components/PaginationNumeric.vue";
import ModalBasic from "../../components/ModalBasic.vue";
import DropdownFull from "../../components/DropdownFull.vue";
import CreateProduct from "../../partials/products/CreateProduct.vue";

export default {
  name: 'Customers',
  components: {
    DropdownFull,
    ModalBasic,
    PaginationNumeric,
    Sidebar,
    Header,
    DeleteButton,
    DateSelect,
    FilterButton,
    CustomersTable,
    CreateProduct
  },
  setup() {

    const sidebarOpen = ref(false)
    const selectedItems = ref([])
    const productStore = useProductStore()

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    onMounted(() => {
      productStore.getProducts()
      productStore.getChildCategories()
      productStore.getAllCategories()
    })

    const importButtonVisible = ref(false);
    const file = ref(null)

    const handleFileChange = (event) => {
      const fileInput = event.target;
      file.value = fileInput.files[0];

      if (file.value) {
        importButtonVisible.value = true;
      } else {
        importButtonVisible.value = false;
      }
    };

    const importFile = async () => {
      if (file.value) {
        productStore.import(file)
      }
    };


    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      importButtonVisible,
      handleFileChange,
      importFile,
      productStore,
      file
    }
  }
}
</script>