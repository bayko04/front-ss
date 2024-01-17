<template>
  <div>
    <h2 class="text-slate-800 dark:text-slate-100 font-semibold mb-2">Добавить документ</h2>
    <div class="bg-white dark:bg-slate-800 mb-4">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <!-- Input Types -->
        <div>
          <div class="grid gap-5 md:grid-cols-9">

            <div class="col-span-3">
              <Field v-model="type" name="type" as="select" id="type" class="form-select w-full">
                <option value="" disabled selected hidden>Выберите тип</option>
                <option v-for="type in documentTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
              </Field>
              <div v-if="errors.type" class="text-xs mt-1 text-rose-500">{{ errors.type }}</div>
            </div>

            <div class="col-span-3">
              <!-- Start -->
              <div>
                <ClientDatepicker id="expiry_date" align="right" :value="expiry_date" v-model="expiry_date"/>
              </div>
              <!-- End -->
            </div>

            <div class="col-span-3">
              <!-- Start -->
              <div class="w-full">
                <div class="relative w-full flex">
                  <input
                      id="file"
                      class="hidden"
                      type="file"
                      @change="handleFileChange"
                  />
                  <label
                      for="file"
                      class="form-file w-full border border-gray-300 rounded-md py-2 px-4 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-rose-500 focus:ring focus:ring-rose-200 focus:ring-opacity-50 cursor-pointer"
                  >
                    Выберите файл
                  </label>
                  <span v-if="file?.name" class="block mt-2 text-sm text-gray-500">{{ file.name }}</span>
                </div>
              </div>
              <!-- End -->
            </div>

            <div class="col-span-8">
              <!-- Start -->
              <div>
                <Field v-model="comment" id="comment" placeholder="Введите комментарий" name="comment" class="form-input w-full" type="text" />
              </div>
              <div v-if="errors.comment" class="text-xs mt-1 text-rose-500">{{ errors.comment }}</div>
              <!-- End -->
            </div>

            <div class="col-span-1">
              <button type="submit" class="w-full btn bg-indigo-500 hover:bg-indigo-600 text-white">Ок</button>
            </div>
          </div>
        </div>
      </Form>
    </div>

    <h2 class="text-slate-800 dark:text-slate-100 font-semibold mb-2">Документы</h2>
    <div class="bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-sm shadow-sm">
      <ul class="space-y-3">
        <!-- Item -->
        <li
            v-for="document in customerStore.customer.customer_documents"
            class="sm:flex sm:items-center sm:justify-between">
          <div class="sm:grow flex items-center text-sm">
            <!-- Icon -->
            <div class="w-8 h-8 flex items-center justify-center rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
              <fileIkon/>
            </div>
            <!-- Position -->
            <div>
              <div class="font-medium text-slate-800 dark:text-slate-100">{{ document.customer_document_type.name }} <span v-if="document.comment">- {{ document.comment }}</span></div>
              <div class="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
                <div>{{ document.expiry_date }}</div>
              </div>
            </div>
          </div>
          <!-- Tags -->
          <div class="sm:ml-2 mt-2 sm:mt-0">
            <ul class="flex flex-wrap sm:justify-end -m-1">
              <li class="m-1">
                <button @click="customerStore.removeDocument(document.id)" class="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">удалить</button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useCustomerStore } from "../../stores/customer.store.js"
import {onMounted, ref} from "vue";
import {Field, Form} from "vee-validate";
import * as Yup from "yup";

import fileIkon from '../../images/file.svg?component'
import ClientDatepicker from "./ClientDatepicker.vue";

const customerStore = useCustomerStore()
const documentTypes = ref([])
const expiry_date = ref('')
const comment = ref('')
const type = ref('')
const file = ref('')

function handleFileChange(event) {
  const fileInput = event.target;
  if (fileInput.files.length > 0) {
    file.value = fileInput.files[0];
  } else {
    file.value = null;
  }
}

async function onSubmit() {
  const values = {
    file: file.value,
    expiry_date: expiry_date.value,
    customer_document_type_id: type.value,
    comment: comment.value
  }

  customerStore.addDocument(values)
  file.value = ''
  expiry_date.value = ''
  type.value = ''
  comment.value = ''
}

const schema = Yup.object().shape({
  expiry_date: Yup.string(),
  comment: Yup.string(),
  type: Yup.string().required('Тип документа обязателен'),
});

onMounted(async () => {
  documentTypes.value = (await customerStore.getReferences())['customer_document_types']
})
</script>