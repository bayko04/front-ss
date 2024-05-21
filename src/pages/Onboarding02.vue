<template>
  <main class="bg-white dark:bg-slate-900">

    <div class="relative flex">

      <!-- Content -->
      <div class="w-full md:w-1/2">

        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">

          <div class="flex-1">

            <!-- Header -->
            <Header />
          </div>

          <div class="px-4 py-8">
            <div class="max-w-md mx-auto">

              <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Создание администратора компании ✨</h1>
                <div class="space-y-4 mb-8">
                  <!-- Name -->
                  <div>
                    <label class="block text-sm font-medium mb-1" for="name">Имя <span class="text-rose-500">*</span></label>
                    <input v-model="store.companyData.user.name" id="name" class="form-input w-full" type="text" />
                  </div>
                  <!-- Email Address -->
                  <div>
                    <label class="block text-sm font-medium mb-1" for="email">Почта <span class="text-rose-500">*</span></label>
                    <input v-model="store.companyData.user.email" id="email" class="form-input w-full" type="email" />
                  </div>
                  <!-- Password -->
                  <div>
                    <label class="block text-sm font-medium mb-1" for="password">Пароль <span class="text-rose-500">*</span></label>
                    <input v-model="store.companyData.user.password" id="password" class="form-input w-full" type="password" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="developer_token">Пароль разработчика<span class="text-rose-500">*</span></label>
                    <input v-model="store.companyData.developer_token" id="developer_token" class="form-input w-full" type="developer_token" />
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <router-link class="text-sm underline hover:no-underline" to="/onboarding01">&lt;- Назад</router-link>
                  <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" @click="execute">Зарегистрировать -&gt;</button>
                </div>
            </div>
          </div>

        </div>

      </div>

      <!-- Image -->
      <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
        <img class="object-cover object-center w-full h-full" src="../images/onboarding-image.jpg" width="760" height="1024" alt="Onboarding" />
        <img class="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src="../images/auth-decoration.png" width="218" height="224" alt="Authentication decoration" />
      </div>

    </div>

  </main>
</template>

<script setup>
import Header from "../partials/onboarding/header.vue";
import { useOnboardingStore } from "../stores/onboarding.store.js";
import router from "../router";

const store = useOnboardingStore();

async function execute() {
  const result = (await store.saveCompany());
  if(result) {
    router.push("/onboarding03");
  }
}
</script>