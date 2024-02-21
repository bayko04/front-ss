<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="mb-8">
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Добавление клиента ✨</h1>
          </div>

          <div class="border-t border-slate-200 dark:border-slate-700">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <!-- Components -->
            <div class="space-y-8 mt-8">
              <!-- Input Types -->
              <div class="mx-auto max-w-lg">
                <div class="grid gap-5 md:grid-cols-1">

                    <div>
                        <!-- Start -->
                        <div>
                            <label class="block text-sm font-medium mb-1" for="name">Полное имя клиента <span
                                    class="text-rose-500">*</span></label>
                            <Field v-model="name" id="name" name="name" class="form-input w-full" type="text"/>
                        </div>
                        <div v-if="errors.name" class="text-xs mt-1 text-rose-500">{{ errors.name }}</div>
                        <!-- End -->
                    </div>

                    <div>
                        <!-- Start -->
                        <div>
                            <label class="block text-sm font-medium mb-1" for="inn">Email</label>
                            <Field v-model="inn" id="inn" name="inn" class="form-input w-full" type="text"/>
                        </div>
                        <div v-if="errors.inn" class="text-xs mt-1 text-rose-500">{{ errors.inn }}</div>
                        <!-- End -->
                    </div>

                    <div>
                        <!-- Start -->
                        <div>
                            <label class="block text-sm font-medium mb-1" for="phone">№ телефона</label>
                            <Field v-model="phone" id="phone" name="phone" class="form-input w-full" type="number"/>
                        </div>
                        <!-- End -->
                    </div>

                    <div>
                        <!-- Start -->
                        <div>
                            <label class="block text-sm font-medium mb-1" for="passport">Примечание</label>
                            <Field v-model="passport" id="passport" name="passport" class="form-input w-full"
                                   type="text"/>
                        </div>
                        <div v-if="errors.passport" class="text-xs mt-1 text-rose-500">{{ errors.passport }}</div>
                        <!-- End -->
                    </div>
                </div>
                  <br>
                  <div class="mt-2">
                      <!-- Start -->
                      <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Сохранить</button>
                      <!-- End -->
                  </div>
              </div>
            </div>

            </Form>
          </div>

        </div>     
      </main>

    </div> 

  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import { useCustomerStore } from '../../stores/customer.store.js'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import Tooltip from '../../components/Tooltip.vue'
import ClientDatepicker from "./ClientDatepicker.vue"
import * as Yup from "yup"
import { Form, Field } from 'vee-validate'

const sidebarOpen = ref(false)
const avatar = ref('')
const customerStore = useCustomerStore()
const dateOfBirth = ref('');
const name = ref('')
const last_name = ref('')
const middle_name = ref('')
const inn = ref('')
const passport = ref('')
const citizenship_id = ref('')
const sex = ref('')
const customer_status_id = ref('')
const login = ref('')
const password = ref('')
const family_status = ref('')
const address = ref('')
const comment = ref('')

onMounted(async () => {
  await customerStore.getReferences()
})

function handleFileChange(event) {
  const fileInput = event.target;
  if (fileInput.files.length > 0) {
    avatar.value = fileInput.files[0];
  } else {
    avatar.value = null;
  }
}

async function onSubmit() {
  const values = {
    name: name.value,
    last_name: last_name.value,
    middle_name: middle_name.value,
    inn: inn.value,
    passport: passport.value,
    citizenship_id: citizenship_id.value,
    sex: sex.value,
    customer_status_id: customer_status_id.value,
    login: login.value,
    password: password.value,
    date_of_birth: dateOfBirth.value,
    image: avatar.value,
    family_status: family_status.value,
    address: address.value,
    comment: comment.value,
  }
  customerStore.addCustomer(values)
}

const schema = Yup.object().shape({
  name: Yup.string().required('Имя клиента обязательно').min(2, 'Должно быть не менее 2 символов').max(256, 'Должно быть не более 256 символов'),
  last_name: Yup.string().required('Фамилия клиента обязательно').min(2, 'Должно быть не менее 2 символов').max(256, 'Должно быть не более 256 символов'),
  middle_name: Yup.string(),
  inn: Yup.string(),
  passport: Yup.string(),
  citizenship_id: Yup.string(),
  sex: Yup.string(),
  customer_status_id: Yup.string(),
  family_status: Yup.string(),
  comment: Yup.string(),
  address: Yup.string(),
  login: Yup.string().required('Логин клиента обязательно').min(4, 'Должно быть не менее 4 символов').max(256, 'Должно быть не более 256 символов'),
  password: Yup.string().required('Пароль клиента обязательно').min(4, 'Должно быть не менее 4 символов').max(256, 'Должно быть не более 256 символов'),
});
</script>