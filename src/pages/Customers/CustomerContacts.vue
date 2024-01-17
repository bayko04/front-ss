<template>
  <div>
    <h2 class="text-slate-800 dark:text-slate-100 font-semibold mb-2">Добавить контакт</h2>
    <div class="bg-white dark:bg-slate-800 mb-4">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <!-- Input Types -->
        <div>
          <div class="grid gap-5 md:grid-cols-9">

            <div class="col-span-2">
              <Field v-model="type" name="type" as="select" id="type" class="form-select w-full">
                <option value="" disabled selected hidden>Выберите тип</option>
                <option v-for="type in contactTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
              </Field>
              <div v-if="errors.type" class="text-xs mt-1 text-rose-500">{{ errors.type }}</div>
            </div>

            <div class="col-span-3">
              <!-- Start -->
              <div>
                <Field v-model="value" id="value" name="value" placeholder="Введите значение" class="form-input w-full" type="text" />
              </div>
              <div v-if="errors.value" class="text-xs mt-1 text-rose-500">{{ errors.value }}</div>
              <!-- End -->
            </div>

            <div class="col-span-3">
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

    <h2 class="text-slate-800 dark:text-slate-100 font-semibold mb-2">Контакты</h2>
    <div class="bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-sm shadow-sm">
      <ul class="space-y-3">
        <!-- Item -->
        <li
            v-for="contact in customerStore.customer.customer_contacts"
            class="sm:flex sm:items-center sm:justify-between">
          <div class="sm:grow flex items-center text-sm">
            <!-- Icon -->
            <div class="w-8 h-8 flex items-center justify-center rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
              <component :is="getMessengerComponent(contact.customer_contact_type.name)"></component>
            </div>
            <!-- Position -->
            <div>
              <div class="font-medium text-slate-800 dark:text-slate-100">{{ contact.value }}</div>
              <div class="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
                <div>{{ contact.customer_contact_type.name }}</div>
                <div class="text-slate-400 dark:text-slate-600">·</div>
                <div>{{ contact.comment }}</div>
              </div>
            </div>
          </div>
          <!-- Tags -->
          <div class="sm:ml-2 mt-2 sm:mt-0">
            <ul class="flex flex-wrap sm:justify-end -m-1">
              <li class="m-1">
                <button v-if="contact.is_main" class="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 shadow-sm bg-amber-500 text-white duration-150 ease-in-out">Основной</button>
                <button v-else @click="customerStore.setContactAsMain(contact.id)" class="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">Сделать основным</button>
              </li>
              <li class="m-1" v-if="!contact.is_main">
                <button @click="customerStore.removeContact(contact.id)" class="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">удалить</button>
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

import instagram from '../../images/chat/instagram-white.svg?component'
import messenger from '../../images/chat/messenger-white.svg?component'
import telegram from '../../images/chat/telegram-white.svg?component'
import whatsapp from '../../images/chat/whatsapp-white.svg?component'
import mail from '../../images/chat/mail-white.svg?component'
import contact from '../../images/chat/contact-white.svg?component'

const customerStore = useCustomerStore()
const contactTypes = ref([])
const value = ref('')
const comment = ref('')
const type = ref('')


const getMessengerComponent = (messengerName) => {
  switch (messengerName) {
    case 'instagram':
      return instagram;
    case 'messenger':
      return messenger;
    case 'telegram':
      return telegram;
    case 'whatsapp':
      return whatsapp;
    case 'mail':
      return mail;
    default:
      return contact;
  }
}

async function onSubmit() {
  const values = {
    value: value.value,
    comment: comment.value,
    customer_contact_type_id: type.value
  }

  customerStore.addContact(values)
  value.value = ''
  comment.value = ''
  type.value = ''
}

const schema = Yup.object().shape({
  value: Yup.string().required('Значение контакта обязателен').min(4, 'Должно быть не менее 2 символов').max(256, 'Должно быть не более 256 символов'),
  comment: Yup.string(),
  type: Yup.string().required('Тип контакта обязательно'),
});

onMounted(async () => {
  contactTypes.value = (await customerStore.getReferences())['customer_contact_types']
})
</script>