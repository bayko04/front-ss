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
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Добавление пользователья ✨</h1>
          </div>

          <div class="border-t border-slate-200 dark:border-slate-700">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
              <!-- Components -->
              <div class="space-y-8 mt-8">
                <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6">Основная информация</h2>

                <!-- Input Types -->
                <div>
                  <div class="grid gap-5 md:grid-cols-3">

                    <div>
                      <!-- Start -->
                      <div>
                        <label class="block text-sm font-medium mb-1" for="name">Имя <span class="text-rose-500">*</span></label>
                        <Field v-model="name" id="name" name="name" class="form-input w-full" type="text" />
                      </div>
                      <div v-if="errors.name" class="text-xs mt-1 text-rose-500">{{ errors.name }}</div>
                      <!-- End -->
                    </div>
                    <div>
                      <!-- Start -->
                      <div>
                        <label class="block text-sm font-medium mb-1" for="last_name">Фамилия <span class="text-rose-500">*</span></label>
                        <Field v-model="last_name" id="last_name" name="last_name" class="form-input w-full" type="text" />
                      </div>
                      <div v-if="errors.last_name" class="text-xs mt-1 text-rose-500">{{ errors.last_name }}</div>
                      <!-- End -->
                    </div>
                    <div>
                      <!-- Start -->
                      <div>
                        <label class="block text-sm font-medium mb-1" for="middle_name">Отчество</label>
                        <Field v-model="middle_name" id="middle_name" name="middle_name" class="form-input w-full" type="text" />
                      </div>
                      <div v-if="errors.middle_name" class="text-xs mt-1 text-rose-500">{{ errors.middle_name }}</div>
                      <!-- End -->
                    </div>

                    <div>
                      <!-- Start -->
                      <div>
                        <label class="block text-sm font-medium mb-1" for="inn">ИНН</label>
                        <Field v-model="inn" id="inn" name="inn" class="form-input w-full" type="number" />
                      </div>
                      <div v-if="errors.inn" class="text-xs mt-1 text-rose-500">{{ errors.inn }}</div>
                      <!-- End -->
                    </div>

                    <div>
                      <!-- Start -->
                      <div>
                        <label class="block text-sm font-medium mb-1" for="passport">Паспортные данные</label>
                        <Field v-model="passport" id="passport" name="passport" class="form-input w-full" type="text" />
                      </div>
                      <div v-if="errors.passport" class="text-xs mt-1 text-rose-500">{{ errors.passport }}</div>
                      <!-- End -->
                    </div>

                    <div>
                      <!-- Start -->
                      <div>
                        <label class="block text-sm font-medium mb-1" for="date_of_birth">Дата рождения</label>
                        <ClientDatepicker id="date_of_birth" :value="dateOfBirth" align="right" v-model="dateOfBirth"/>
                      </div>
                      <!-- End -->
                    </div>

                    <div>
                      <label class="block text-sm font-medium mb-1" for="citizenship_id">Гражданство</label>
                      <Field v-model="citizenship_id" name="citizenship_id" as="select" id="citizenship_id" class="form-select w-full" v-if="usersStore.userReferences && usersStore.userReferences.citizenships">
                        <option value="">Не выбрано</option>
                        <option v-for="citizenship in usersStore.userReferences.citizenships" :value="citizenship.id" :key="citizenship.id">{{ citizenship.name }}</option>
                      </Field>
                      <div v-if="errors.citizenship_id" class="text-xs mt-1 text-rose-500">{{ errors.citizenship_id }}</div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium mb-1" for="sex">Пол</label>
                      <Field v-model="sex" name="sex" as="select" id="sex" class="form-select w-full">
                        <option value="">Не выбрано</option>
                        <option value="m">Мужчина</option>
                        <option value="w">Женщина</option>
                      </Field>
                      <div v-if="errors.sex" class="text-xs mt-1 text-rose-500">{{ errors.sex }}</div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium mb-1" for="role">Роль пользователья</label>
                      <Field v-model="role" name="role" id="role" as="select" class="form-select w-full" v-if="usersStore.userReferences && usersStore.userReferences.roles">
                        <option v-for="role in usersStore.userReferences.roles" :value="role.name" :key="role.name">{{ role.name }}</option>
                      </Field>
                      <div v-if="errors.role" class="text-xs mt-1 text-rose-500">{{ errors.role }}</div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium mb-1" for="family_status">Семейное положение</label>
                      <Field v-model="family_status" name="family_status" id="family_status" as="select" class="form-select w-full">
                        <option value="">Не выбрано</option>
                        <option value="single">Холост/Вдова/Вдовец</option>
                        <option value="married">Женат/Замужем</option>
                      </Field>
                      <div v-if="errors.family_status" class="text-xs mt-1 text-rose-500">{{ errors.family_status }}</div>
                    </div>

                    <div>
                      <!-- Start -->
                      <div>
                        <label class="block text-sm font-medium mb-1" for="address">Адрес</label>
                        <Field v-model="address" id="address" name="address" class="form-input w-full" type="text" />
                      </div>
                      <div v-if="errors.address" class="text-xs mt-1 text-rose-500">{{ errors.address }}</div>
                      <!-- End -->
                    </div>

                    <div>
                      <!-- Start -->
                      <div>
                        <label class="block text-sm font-medium mb-1" for="comment">Примечание</label>
                        <Field v-model="comment" id="comment" name="comment" class="form-input w-full" type="text" />
                      </div>
                      <div v-if="errors.comment" class="text-xs mt-1 text-rose-500">{{ errors.comment }}</div>
                      <!-- End -->
                    </div>

                  </div>
                </div>

                <div>
                  <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6">Данные учетной записи</h2>
                  <div class="grid gap-5 md:grid-cols-3">
                    <div>
                      <!-- Start -->
                      <div>
                        <div class="flex items-center justify-between">
                          <label class="block text-sm font-medium mb-1" for="avatar">Аватар</label>
                          <Tooltip class="ml-2" bg="dark" size="md">
                            <div class="text-sm text-slate-200">Аватар для личного кабинета пользователья.</div>
                          </Tooltip>
                        </div>
                        <div class="relative mt-1">
                          <input
                              id="avatar"
                              class="hidden"
                              type="file"
                              @change="handleFileChange"
                          />
                          <label
                              for="avatar"
                              class="form-file w-full py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-rose-500 focus:ring focus:ring-rose-200 focus:ring-opacity-50 cursor-pointer"
                          >
                            Выберите файл
                          </label>
                          <span v-if="avatar?.name" class="block mt-2 text-sm text-gray-500">{{ avatar.name }}</span>
                        </div>
                      </div>
                      <!-- End -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <!-- Start -->
                <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Сохранить</button>
                <!-- End -->
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
import Tooltip from '../../components/Tooltip.vue'
import ClientDatepicker from "../../pages/Customers/ClientDatepicker.vue"
import * as Yup from "yup"
import { Form, Field } from 'vee-validate'
import router from '../../router.js'

const route = router?.currentRoute?.value

const sidebarOpen = ref(false)
const avatar = ref('')
const usersStore = useUsersStore()
const dateOfBirth = ref('');
const name = ref('')
const last_name = ref('')
const middle_name = ref('')
const inn = ref('')
const passport = ref('')
const citizenship_id = ref('')
const sex = ref('')
const role = ref('Сотрудник')
const family_status = ref('')
const address = ref('')
const comment = ref('')

onMounted(async () => {
  await usersStore.getReferences()
  await setCustomer()
})

function handleFileChange(event) {
  const fileInput = event.target;
  if (fileInput.files.length > 0) {
    avatar.value = fileInput.files[0];
  } else {
    avatar.value = null;
  }
}

async function setCustomer() {
  await usersStore.getUser(route.params.id)
  const user = usersStore.user
  dateOfBirth.value = user.date_of_birth ?? ''
  name.value = user.name ?? ''
  last_name.value = user.last_name ?? ''
  middle_name.value = user.middle_name ?? ''
  inn.value = user.inn ?? ''
  passport.value = user.passport ?? ''
  citizenship_id.value = user.citizenship_id ?? ''
  sex.value = user.sex ?? ''
  role.value = user.role ?? 'Сотрудник'
  family_status.value = user.family_status ?? ''
  address.value = user.address ?? ''
  comment.value = user.comment ?? ''
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
    role: role.value,
    date_of_birth: dateOfBirth.value,
    image: avatar.value,
    family_status: family_status.value,
    address: address.value,
    comment: comment.value,
  }
  usersStore.updateUser(values)
}

const schema = Yup.object().shape({
  name: Yup.string().required('Имя клиента обязательно').min(2, 'Должно быть не менее 2 символов').max(256, 'Должно быть не более 256 символов'),
  last_name: Yup.string().required('Фамилия клиента обязательно').min(2, 'Должно быть не менее 2 символов').max(256, 'Должно быть не более 256 символов'),
  middle_name: Yup.string(),
  inn: Yup.string(),
  passport: Yup.string(),
  citizenship_id: Yup.string(),
  sex: Yup.string(),
  role: Yup.string(),
  family_status: Yup.string(),
  comment: Yup.string(),
  address: Yup.string(),
});
</script>