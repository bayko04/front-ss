<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '../stores/auth.store.js';

const schema = Yup.object().shape({
  email: Yup.string().email('Не правильный формат почты').required('Email адрес не заполнен'),
  password: Yup.string().required('Пароль не заполнена')
});

async function onSubmit(values) {
  const authStore = useAuthStore();
  const { email, password } = values;
  await authStore.login(email, password);
}
</script>
<template>
  <main class="bg-white dark:bg-slate-900">

    <div class="relative flex">

      <!-- Content -->
      <div class="w-full md:w-1/2">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">

          <div class="flex-1">
            <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <!-- Logo -->
              <router-link class="block" to="/">
                <img src="../images/logo2.png" class="w-14" alt="">
              </router-link>
            </div>
          </div>          

          <div class="max-w-sm mx-auto w-full px-4 py-8">
            <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">С возвращением! ✨</h1>
            <!-- Form -->
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
              <div class="space-y-4">
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="email">Email адрес <span class="text-rose-500">*</span></label>
                    <Field id="email" name="email" type="email" class="form-input w-full" :class="{ 'border-rose-300': errors.email }" />
                  </div>
                  <div v-if="errors.email" class="text-xs mt-1 text-rose-500">{{ errors.email }}</div>
                </div>
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="password">Пароль <span class="text-rose-500">*</span></label>
                    <Field id="password" name="password" type="password" class="form-input w-full" autoComplete="on" :class="{ 'border-rose-300': errors.password }" />
                  </div>
                  <div v-if="errors.password" class="text-xs mt-1 text-rose-500">{{ errors.password }}</div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-6">
                <div class="mr-1">
                  <button class="text-sm underline hover:no-underline">Забыли пароль?</button>
                </div>
                <button :disabled="isSubmitting" class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Войти</button>
              </div>
            </Form>
          </div>

        </div>
      </div>

      <!-- Image -->
      <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
        <img class="object-cover object-center w-full h-full" src="../images/auth-image.jpg" width="760" height="1024" alt="Authentication" />
        <img class="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src="../images/auth-decoration.png" width="218" height="224" alt="Authentication decoration" />
      </div>

    </div>

  </main>
</template>