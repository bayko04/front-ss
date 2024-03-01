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

              <div class="text-center">
                <svg class="inline-flex w-16 h-16 fill-current mb-6" viewBox="0 0 64 64">
                  <circle class="text-emerald-100 dark:text-emerald-400/30" cx="32" cy="32" r="32" />
                  <path class="text-emerald-500 dark:text-emerald-400" d="m28.5 41-8-8 3-3 5 5 12-12 3 3z" />
                </svg>
                <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-8">Ваша компания успешно зарегистрирована. 🙌</h1>
                <router-link class="btn bg-indigo-500 hover:bg-indigo-600 text-white" to="/">Начать работать -&gt;</router-link>
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

<script>

import Header from "../partials/onboarding/header.vue";

export default {
  name: 'Onboarding03',
  components: {Header},
}
</script>