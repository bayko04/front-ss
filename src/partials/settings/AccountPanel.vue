<template>
  <div class="grow" v-if="authStore.userData">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">Мой профиль</h2>
      <!-- Picture -->
      <section>
        <div class="flex items-center">
          <div class="mr-4">
            <img class="w-20 h-20 rounded-full" :src="authStore.userData.user.image" width="80" height="80" alt="User upload" />
          </div>
        </div>
      </section>
      <!-- Business Profile -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">{{ authStore.userData.user.last_name }} {{ authStore.userData.user.name }} {{ authStore.userData.user.middle_name }}</h3>
      </section>
      <!-- Password -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">Пароль</h3>
        <div class="text-sm">Рекомендуется каждые 30 дней менять пароль.</div>
        <div class="mt-5">
          <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div class="flex">
              <Field v-model="password" id="password" name="password" class="form-input mr-2" type="password"/>
              <button type="submit" class="btn border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm text-indigo-500">Установить новый пароль</button>
            </div>
            <div v-if="errors.password" class="text-xs mt-1 text-rose-500">{{ errors.password }}</div>
          </Form>
        </div>
      </section>
    </div>
  </div>  
</template>

<script setup>
import { useAuthStore } from "../../stores/auth.store.js";
import {Field, Form} from "vee-validate";
import {ref} from "vue";
import * as Yup from "yup";

const authStore = useAuthStore()
const password = ref('')
const onSubmit = () => {
  authStore.updatePassword(password.value)
}

const schema = Yup.object().shape({
  password: Yup.string().required('Пароль пользователья обязательно').min(4, 'Должно быть не менее 4 символов').max(256, 'Должно быть не более 256 символов'),
});

</script>