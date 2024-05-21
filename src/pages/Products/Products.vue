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


<!--          modal -->
          <div class="flex flex-wrap items-center -m-1.5">

            <!-- Send Feedback -->
            <div class="m-1.5">
              <!-- Start -->
              <ModalBasic id="feedback-modal" v-if="productStore.productModalStatus" :modalOpen="productStore.productModalStatus" @close-modal="productStore.productModalStatus = false" :title="productStore.productModalStatus !== 'delete' ? 'Добавление/редактирование продукта' : 'Удаление продукта'">
                <!-- Modal content -->
                <div class="px-5 py-4">
                  <div v-if="productStore.productModalStatus !== 'delete'" class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium mb-1" for="name">Название <span class="text-rose-500">*</span></label>
                      <input v-model="productStore.product.name" class="form-input w-full px-2 py-1" type="text" required />
                    </div>
                    <div class="mb-2">
                      <h2 class="block text-sm font-medium mb-1">Категория <span class="text-rose-500">*</span></h2>
                      <DropdownFull :options="productStore.childCategories"
                                    :value="productStore.product.category_id"
                                    @update-value="(value) =>handleUpdateValue('category_id', value)"/>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="name">Цена</label>
                      <input v-model="productStore.product.price" class="form-input w-full px-2 py-1" type="text"/>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="feedback">Описание <span class="text-rose-500">*</span></label>
                      <textarea v-model="productStore.product.description" class="form-textarea w-full px-2 py-1" rows="4" required></textarea>
                    </div>
                    <div style="margin-bottom: 40px">
                      <h2 class="block text-sm font-medium mb-1">Статус <span class="text-rose-500">*</span></h2>
                      <DropdownFull :options="statuses"
                                    :value="productStore.product.status"
                                    @update-value="(value) =>handleUpdateValue('status', value)"/>
                    </div>
                  </div>
                  <div v-else class="space-y-3">
                    <div class="text-sm mb-10">
                      <div class="space-y-2">
                        <p>Вы уверены что хотите навсегда удалить продукт - {{productStore.product.name}}?.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Modal footer -->
                <div class="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
                  <div class="flex flex-wrap justify-end space-x-2">
                    <button class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" @click.stop="productStore.productModalStatus = false">Отмена</button>
                    <button v-if="productStore.productModalStatus === 'edit' && productStore.productModalStatus !== 'add'" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="save()">Сохранить</button>
                    <button v-if="productStore.productModalStatus === 'delete'" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="acceptDelete()">Удалить</button>
                    <button v-if="productStore.productModalStatus === 'delete'" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="acceptDelete()">Удалить</button>
                  </div>
                </div>
              </ModalBasic>
            </div>


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
import ModalBasic from "../../components/ModalBasic.vue";
import DropdownFull from "../../components/DropdownFull.vue";

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
  },
  setup() {

    const sidebarOpen = ref(false)
    const selectedItems = ref([])
    const productStore = useProductStore()
    const statuses = [
      {
        id:'Активный',
        name:'Активный'
      },
      {
        id:'Неактивный',
        name:'Неактивный'
      }
    ]

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    onMounted(() => {
      productStore.getProducts()
      productStore.getChildCategories()
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

    function handleUpdateValue(field, value) {
      productStore.product[field] = value
    }

    function save() {
      productStore.createOrUpdateProduct()
    }

    function acceptDelete() {
      productStore.deleteProduct()
    }

    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      importButtonVisible,
      handleFileChange,
      importFile,
      productStore,
      file,
      handleUpdateValue,
      statuses,
      save,
      acceptDelete
    }
  }
}
</script>