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

                    <div class="sm:flex sm:justify-between sm:items-center mb-8">

                        <!-- Left: Title -->
                        <div class="mb-4 sm:mb-0">
                            <h1 class="test text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Продление залогового билета ✨</h1>
                        </div>

                    </div>

                    <div class="border-t border-slate-200 dark:border-slate-700">
                        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                            <!-- Components -->
                            <div class="space-y-8 mt-8">

                                <!-- Input Types -->
                                <div>
                                    <div class="grid gap-5 md:grid-cols-1">
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <p><strong>Погашение: </strong>123139/2 | Мээрим Жумагулова | Техника iphone x 512гб</p>
                                                <div></div>
                                            </div>
                                            <!-- End -->
                                        </div>
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <p><strong>Оценочная стоимость залога: </strong>50 000</p>
                                            </div>
                                            <!-- End -->
                                        </div>
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <p><strong>Выданная сумма: </strong>15 000</p>
                                            </div>
                                            <!-- End -->
                                        </div>
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <p><strong>Процентная ставка: </strong>0.35</p>
                                            </div>
                                            <!-- End -->
                                        </div>
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <p><strong>Количество дней: </strong>31</p>
                                            </div>
                                            <!-- End -->
                                        </div>
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <p><strong>Дата погашения: </strong>05.02.2024</p>
                                            </div>
                                            <!-- End -->
                                        </div>
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <p><strong>Сумма начисленных %: </strong>1627.5</p>
                                            </div>
                                            <!-- End -->
                                        </div>
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <p><strong>Сумма штрафов: </strong>720 (15000*0.6) x 8 дней</p>
                                            </div>
                                            <!-- End -->
                                        </div>
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <p><strong>Итого сумма % и штрафа: </strong>2347.5</p>
                                            </div>
                                            <!-- End -->
                                        </div>
                                    </div>
                                </div>

                                <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6">Выплата процентов и штрафов</h2>
                                <div>
                                    <div class="grid gap-5 md:grid-cols-3">

                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <label class="block text-sm font-medium mb-1" for="searchByName">Сумма поступления<span class="text-rose-500">*</span></label>
                                                <Field v-model="searchByName" id="searchByName" name="searchByName" class="form-input w-full" type="number" />
                                            </div>
                                            <!-- End -->
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium mb-1" for="citizenship_id">Валюта</label>
                                            <Field v-model="citizenship_id" name="citizenship_id" as="select" id="citizenship_id" class="form-select w-full" v-if="customerStore.customerReferences && customerStore.customerReferences.citizenships">
                                                <option value="">Сом</option>
                                                <option value="usd">Доллар</option>
                                            </Field>
                                            <div v-if="errors.citizenship_id" class="text-xs mt-1 text-rose-500">{{ errors.citizenship_id }}</div>
                                        </div>
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <label class="block text-sm font-medium mb-1" for="searchByName">Примечание</label>
                                                <Field v-model="searchByName" id="searchByName" name="searchByName" class="form-input w-full" type="text" />
                                            </div>
                                            <!-- End -->
                                        </div>

                                    </div>
                                </div>
                                <router-link to="/" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                    <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <span class="hidden xs:block ml-2">Добавить запись</span>
                                </router-link>

                                <!---------------->
                                <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6">Период продления залогового билета</h2>
                                <div>

                                    <div class="grid gap-5 md:grid-cols-4">

                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <label class="block text-sm font-medium mb-1" for="searchByName">Количество дней<span class="text-rose-500">*</span></label>
                                                <input id="searchByName" name="searchByName" class="form-input w-full" type="number" readonly value="30" />
                                            </div>
                                            <!-- End -->
                                        </div>
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <label class="block text-sm font-medium mb-1" for="searchByName">Процентная ставка<span class="text-rose-500">*</span></label>
                                                <input id="searchByName" name="searchByName" class="form-input w-full" type="number" readonly value="0.35"/>
                                            </div>
                                            <!-- End -->
                                        </div>
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <label class="block text-sm font-medium mb-1" for="searchByName">Сумма процента</label>
                                                <input id="searchByName" name="searchByName" class="form-input w-full" type="text" readonly value="1627.5"/>
                                            </div>
                                            <!-- End -->
                                        </div>
                                    </div>
                                    <div class="grid gap-5 md:grid-cols-4">
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <label class="block text-sm font-medium mb-1" for="extensionDate">Дата продления<span class="text-rose-500">*</span></label>
                                                <ClientDatepicker v-model="extensionDate" id="extensionDate" name="extensionDate" class="form-input w-full"/>
                                            </div>
                                            <!-- End -->
                                        </div>
                                        <div>
                                            <!-- Start -->
                                            <div>
                                                <label class="block text-sm font-medium mb-1" for="repaymentDate">Дата погашения<span class="text-rose-500">*</span></label>
                                                <ClientDatepicker v-model="repaymentDate" id="repaymentDate" name="repaymentDate" class="form-input w-full"/>
                                            </div>
                                            <!-- End -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-2">
                                <!-- Start -->
                                <button type="submit" class="btn bg-green-500 hover:bg-green-600 text-white">Продлить залоговый билет</button>
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
import { useCustomerStore } from '../../stores/customer.store.js'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import ClientDatepicker from "../Customers/ClientDatepicker.vue";
import Tooltip from '../../components/Tooltip.vue'
import * as Yup from "yup"
import { Form, Field } from 'vee-validate'
import SearchForm from "../../components/SearchForm.vue";

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