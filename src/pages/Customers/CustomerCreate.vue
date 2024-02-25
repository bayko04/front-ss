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
                            <Field v-model="email" id="inn" name="inn" class="form-input w-full" type="text"/>
                        </div>
                        <div v-if="errors.email" class="text-xs mt-1 text-rose-500">{{ errors.email }}</div>
                        <!-- End -->
                    </div>

                    <div>
                        <!-- Start -->
                        <div>
                            <label class="block text-sm font-medium mb-1" for="phone">№ телефона</label>
                            <Field v-model="phone" id="phone" name="phone" class="form-input w-full" type="text"/>
                        </div>
                      <!-- End -->
                    </div>

                    <div>
                        <!-- Start -->
                        <div>
                            <label class="block text-sm font-medium mb-1" for="passport">Примечание</label>
                            <Field v-model="comment" id="passport" name="passport" class="form-input w-full"
                                   type="text"/>
                        </div>
                        <div v-if="errors.comment" class="text-xs mt-1 text-rose-500">{{ errors.comment }}</div>
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
import * as Yup from "yup"
import { Form, Field } from 'vee-validate'
import router from '../../router.js'

const route = router?.currentRoute?.value
const sidebarOpen = ref(false)
const customerStore = useCustomerStore()
const name = ref('')
const phone = ref('')
const email = ref('')
const comment = ref('')
const id = ref(undefined)

onMounted(async () => {
  await customerStore.getReferences()
  await setCustomer()
})

async function setCustomer() {
  if (route.params.id) {
    const customer = await customerStore.getCustomer(route.params.id)
    name.value = customer.name
    phone.value = customer.phone
    email.value = customer.email
    comment.value = customer.comment
    id.value = customer.id
  }
}

async function onSubmit() {
  const values = {
    name: name.value,
    phone: phone.value,
    comment: comment.value,
    email: email.value,
  }
  if (id.value) {
    values.id = id.value
  }
  customerStore.addOrUpdateCustomer(values)
}

const schema = Yup.object().shape({
  name: Yup.string().required('Имя клиента обязательно').min(2, 'Должно быть не менее 2 символов').max(256, 'Должно быть не более 256 символов'),
  email: Yup.string().email('Введите корректный email'),
  comment: Yup.string(),
  phone: Yup.string(),
});
</script>