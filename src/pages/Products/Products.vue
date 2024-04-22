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
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload csv file</label>
              <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" @change="handleFileChange">
              <button v-if="importButtonVisible" id="import_button" class="btn bg-indigo-500 hover:bg-indigo-600 text-white" @click="importFile">
                Import File
              </button>

              <!-- Dropdown -->
              <DateSelect />

              <!-- Filter button -->
              <FilterButton align="right" />

              <!-- Add customer button -->
              <button @click="" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
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
import {fetchWrapper} from "../../helpers/fetch-wrapper.js";
import PaginationNumeric from "../../components/PaginationNumeric.vue";

export default {
  name: 'Customers',
  components: {
    PaginationNumeric,
    Sidebar,
    Header,
    DeleteButton,
    DateSelect,
    FilterButton,
    CustomersTable,
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
      productStore
    }
  }
}
// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById('file_input').addEventListener('change', function(e) {
//     // Показываем кнопку импорта файла после выбора файла
//     document.getElementById('import_button').classList.remove('hidden');
//   });
//
//   document.getElementById('import_button').addEventListener('click', function() {
//     var fileInput = document.getElementById('file_input');
//     var file = fileInput.files[0];
//     if (file) {
//       var reader = new FileReader();
//       reader.onload = function(e) {
//         var contents = e.target.result;
//         // Отправляем данные на сервер
//         sendDataToBackend(contents);
//       };
//       reader.readAsText(file);
//     }
//   });
//
//   function sendDataToBackend(fileContents) {
//     fetch('/products/import', {
//       method: 'POST',
//       body: fileContents
//     })
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.text();
//         })
//         .then(data => {
//           console.log(data); // Полученный ответ от сервера
//         })
//         .catch(error => {
//           console.error('There was an error!', error);
//         });
//   }
//
//   // async function sendDataToBackend() {
//   //   try {
//   //     const response = await fetch('/products');
//   //     if (!response.ok) {
//   //       throw new Error('Network response was not ok');
//   //     }
//   //     const data = await response.json();
//   //     // Обработка полученных данных
//   //     this.products = data;
//   //   } catch (error) {
//   //     console.error('There was an error!', error);
//   //   }
//   // }
// });
</script>