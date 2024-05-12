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

              <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Информация о компании? ✨</h1>
              <!-- Form -->
                <div class="space-y-3 mb-8">
                  <div>
                    <label class="block text-sm font-medium mb-1" for="company-name">Название компании<span class="text-rose-500">*</span></label>
                    <input v-model="store.companyData.company.name" id="company-name" class="form-input w-full" type="text" />
                  </div>
                </div>
                <div class="space-y-3 mb-8">
                  <div>
                    <h2 class="block text-sm font-medium mb-1">Специализация компании</h2>
                    <DropdownFull :options="referenceStore.sections"
                                  @update-value="(value) =>handleUpdateValue('section_id', value)"/>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <router-link class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" to="/onboarding02">Далее -&gt;</router-link>
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
  import Header from '../partials/onboarding/header.vue'
  import { useOnboardingStore } from "../stores/onboarding.store.js";
  import DropdownFull from "../components/DropdownFull.vue";
  import {onMounted, ref} from "vue";
  import {useReferencesStore} from "../stores/references.store.js";
  import {useAuthStore} from "../stores/auth.store.js";
  import router from "../router.js";

  const store = useOnboardingStore();
  const referenceStore = useReferencesStore()
  const authStore = useAuthStore();

  function handleUpdateValue(field, value) {
    store.companyData.company[field] = value
  }

  onMounted(() => {
    if(authStore?.userData?.user?.id) {
      router.push(`/`)
    }
    referenceStore.getSections()
  })
</script>