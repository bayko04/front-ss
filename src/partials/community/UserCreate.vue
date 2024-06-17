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
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Добавление пользователя ✨</h1>
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
                        <label class="block text-sm font-medium mb-1" for="name">Имя<span class="text-rose-500">*</span></label>
                        <Field v-model="name" id="name" name="name" class="form-input w-full" type="text"/>
                      </div>
                      <div v-if="errors.name" class="text-xs mt-1 text-rose-500">{{ errors.name }}</div>
                      <!-- End -->
                    </div>

                    <div>
                      <!-- Start -->
                      <div>
                        <label class="block text-sm font-medium mb-1" for="inn">Email<span class="text-rose-500">*</span></label>
                        <Field v-model="email" id="email" name="email" class="form-input w-full" type="email"/>
                      </div>
                      <div v-if="errors.email" class="text-xs mt-1 text-rose-500">{{ errors.email }}</div>
                      <!-- End -->
                    </div>

                    <div>
                      <!-- Start -->
                      <div>
                        <label class="block text-sm font-medium mb-1" for="password">Пароль<span class="text-rose-500">*</span></label>
                        <Field v-model="password" id="password" name="password" class="form-input w-full" type="password"/>
                      </div>
                      <div v-if="errors.password" class="text-xs mt-1 text-rose-500">{{ errors.password }}</div>
                      <!-- End -->
                    </div>

                    <div>
                      <!-- Start -->
                      <div>
                        <label class="block text-sm font-medium mb-1" for="role">Роль<span class="text-rose-500">*</span></label>
                        <Field v-model="role" id="role" as="select" name="role" class="form-select w-full">
                          <option value="1">Администратор</option>
                          <option value="2">Пользователь</option>
                        </Field>
                      </div>
                      <div v-if="errors.role" class="text-xs mt-1 text-rose-500">{{ errors.role }}</div>
                      <!-- End -->
                    </div>

                  </div>
                  <br>
                  <div class="mt-4">
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
import { useUsersStore } from '../../stores/user.store.js'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import * as Yup from "yup"
import { Form, Field } from 'vee-validate'
import router from "../../router.js";

const route = router?.currentRoute?.value
const sidebarOpen = ref(false)
const usersStore = useUsersStore()
const name = ref('')
const email = ref('')
const password = ref('')
const role = ref(2)
const id = ref(undefined)

onMounted(async () => {
  await setUser()
})

async function setUser() {
  if (route.params.id) {
    const user = await usersStore.getUser(route.params.id)
    name.value = user.name
    email.value = user.email
    role.value = user.email
    id.value = user.id
  }
}

async function onSubmit() {
  const values = {
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value,
  }
  usersStore.addUser(values)
}

const schema = Yup.object().shape({
  name: Yup.string().required('Имя пользователья обязательно').min(2, 'Должно быть не менее 2 символов').max(256, 'Должно быть не более 256 символов'),
  email: Yup.string().required('Email пользователья обязательно').min(4, 'Должно быть не менее 4 символов').max(256, 'Должно быть не более 256 символов'),
  password: Yup.string().required('Пароль пользователья обязательно').min(4, 'Должно быть не менее 4 символов').max(256, 'Должно быть не более 256 символов'),
});
</script>