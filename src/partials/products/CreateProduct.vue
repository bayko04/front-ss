<template>
  <!--          modal -->
  <div class="flex flex-wrap items-center -m-1.5">

    <!-- Send Feedback -->
    <div class="m-1.5">
      <!-- Start -->
      <ModalBasic id="feedback-modal" v-if="productStore.productModalStatus && productStore.productModalStatus !== 'photo'" :modalOpen="productStore.productModalStatus" @close-modal="cancel()" :title="titles[productStore.productModalStatus]">
        <!-- Modal content -->
        <div class="px-5 py-4">
          <div v-if="productStore.productModalStatus === 'add' || productStore.productModalStatus === 'edit'" class="space-y-3">
            <div>
              <label class="block text-sm font-medium mb-1" for="name">Название <span class="text-rose-500">*</span></label>
              <input v-model="productStore.product.name" class="form-input w-full px-2 py-1" type="text" required />
            </div>
            <div class="mb-2">
              <h2 class="block text-sm font-medium mb-1">
                Категория <span class="text-rose-500">*</span>
              </h2>
              <div class="flex items-center">
                <DropdownFull
                    :options="productStore.childCategories"
                    :value="productStore.product.category_id"
                    @update-value="(value) => handleUpdateValue('category_id', value)"
                />
                <button
                    class="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    @click.stop="productStore.productModalStatus = 'category'"
                >
                  +
                </button>
              </div>
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
          <div v-else-if="productStore.productModalStatus === 'category'" class="space-y-3">
            <div>
              <label class="block text-sm font-medium mb-1" for="name">Название категории<span class="text-rose-500">*</span></label>
              <input v-model="productStore.category.name" class="form-input w-full px-2 py-1" type="text" required />
            </div>
            <div class="mb-2">
              <h2 class="block text-sm font-medium mb-1">Родительская категория <span class="text-rose-500">*</span></h2>
              <DropdownFull :options="productStore.allCategories"
                            @update-value="(value) =>handleUpdateCategoryValue('parent_id', value)"/>
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
            <button class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" @click.stop="cancel()">Отмена</button>
            <button v-if="productStore.productModalStatus === 'add' || productStore.productModalStatus === 'edit'" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="save()">Сохранить</button>
            <button v-if="productStore.productModalStatus === 'delete'" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="acceptDelete()">Удалить</button>
            <button v-if="productStore.productModalStatus === 'category'" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="saveCategory()">Сохранить</button>
          </div>
        </div>
      </ModalBasic>
      <ModalBasic id="feedback-modal" v-if="productStore.productModalStatus && productStore.productModalStatus === 'photo'" :modalOpen="productStore.productModalStatus" @close-modal="cancel()" :title="'Добавление фото'">
        <!-- Modal content -->
        <div class="px-5 py-4">
          <h1 class="font-bold">{{productStore.product.name}}</h1>

        </div>
        <!-- Modal footer -->
        <div class="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
          <div class="flex flex-wrap justify-end space-x-2">
            <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Сохранить</button>
          </div>
        </div>
      </ModalBasic>
    </div>


  </div>
</template>
<script setup>
import ModalBasic from "../../components/ModalBasic.vue";
import DropdownFull from "../../components/DropdownFull.vue";
import {useProductStore} from "../../stores/product.store.js";

const productStore = useProductStore()

function save() {
  productStore.createOrUpdateProduct()
}

function acceptDelete() {
  productStore.deleteProduct()
}

function saveCategory() {
  productStore.createOrUpdateCategory()
}

function cancel() {
  productStore.productModalStatus = false
  productStore.category = {
    name: '',
    parent_id: ''
  }
  productStore.product = {
    name: '',
    description: '',
    price: null,
    status: true,
    category_id: null
  }
}
function handleUpdateValue(field, value) {
  productStore.product[field] = value
}

function handleUpdateCategoryValue(field, value) {
  productStore.category[field] = value
}

const statuses = [
  {
    id:true,
    name:'Активный'
  },
  {
    id:false,
    name:'Неактивный'
  }
]

const titles = {
  delete: 'Удаление продукта',
  category: 'Добавление категории',
  add: 'Добавление/редактирование продукта'
}
</script>