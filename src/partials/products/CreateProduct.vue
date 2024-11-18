<template>
  <!--          modal -->
  <div class="flex flex-wrap items-center -m-1.5">

    <!-- Send Feedback -->
    <div class="m-1.5">
      <!-- Start -->
      <ModalBasic id="feedback-modal" v-if="productStore.productModalStatus" :modalOpen="productStore.productModalStatus" @close-modal="cancel()" :title="titles[productStore.productModalStatus]">
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
            <div class="grid grid-cols-5 gap-4">

              <!-- Статичное изображение -->
              <div v-for="(image, index) in productStore.product.images" :key="image.id" class="relative group">
                <img class="h-32 w-32 object-cover rounded-lg" :src="image.path" :alt="image.id">
                <button class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        @click.stop="removeImage(index)">
                  X
                </button>
              </div>

              <!-- Динамически добавляемые изображения -->
              <div v-for="(newImage, index) in newImages" :key="newImage.id" class="relative group">
                <img class="h-32 w-32 object-cover rounded-lg" :src="newImage.preview" :alt="newImage.file.name">
                <button
                    class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    @click.stop="removeNewImage(index)">
                  X
                </button>
              </div>
            </div>

            <div class="flex justify-center w-full">
              <div class="w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6" id="dropzone">
                <input v-bind="getInputProps()" />
                <div class="text-center" v-bind="getRootProps()">
                  <img class="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="">

                  <h3 class="mt-2 text-sm font-medium text-gray-900">
                    <label for="file-upload" class="relative cursor-pointer">
                      <span>Drag and drop</span>
                      <span class="text-indigo-600"> or browse</span>
                      <span>to upload</span>
                      <input v-bind="getInputProps()" class="sr-only">
                    </label>
                  </h3>
                  <p class="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
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
    </div>


  </div>
</template>
<script setup>
import ModalBasic from "../../components/ModalBasic.vue";
import DropdownFull from "../../components/DropdownFull.vue";
import {useProductStore} from "../../stores/product.store.js";
import { useDropzone } from "vue3-dropzone";
import {ref} from "vue";

const { getRootProps, getInputProps} = useDropzone({ onDrop });

const newImages = ref([])

function onDrop(acceptedFiles) {
  // Фильтруем файлы, которые уже есть в `newImages`
  const uniqueFiles = acceptedFiles.filter(
      (file) => !newImages.value.some((existingFile) => existingFile.name === file.name && existingFile.size === file.size)
  );

  // Добавляем только уникальные файлы
  newImages.value.push(
      ...uniqueFiles.map((file) => ({
        id: `${file.name}-${file.size}`, // Уникальный идентификатор
        file,
        preview: URL.createObjectURL(file), // Создаем временный URL для изображения
      }))
  );

}

function removeNewImage(index) {
  URL.revokeObjectURL(newImages.value[index].preview); // Освобождаем URL
  newImages.value.splice(index, 1); // Удаляем изображение из массива
}

function removeImage(index) {
  productStore.product.images.splice(index, 1);
}

const productStore = useProductStore()

function save() {
  if (newImages.value.length > 0) {
    productStore.product.new_images = newImages.value.map(mewImage => mewImage.file)
  }

  productStore.createOrUpdateProduct()
  newImages.value = [];
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
  newImages.value = []
}
function handleUpdateValue(field, value) {
  productStore.product[field] = value
}

function handleUpdateCategoryValue(field, value) {
  productStore.category[field] = value
}

const titles = {
  delete: 'Удаление продукта',
  category: 'Добавление категории',
  add: 'Добавление/редактирование продукта'
}
</script>
