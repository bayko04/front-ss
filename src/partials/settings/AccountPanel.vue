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
          <button class="btn border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm text-indigo-500">Установить новый пароль</button>
        </div>
      </section>
    </div>
    <!-- Panel footer -->
    <footer>
      <div class="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
        <div class="flex self-end">
          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Сохранить изменения</button>
        </div>
      </div>
    </footer>
  </div>  
</template>

<script setup>
import { useAuthStore } from "../../stores/auth.store.js";

const authStore = useAuthStore()

</script>