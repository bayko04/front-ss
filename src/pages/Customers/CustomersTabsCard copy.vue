<template>
  <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    <div class="flex flex-col h-full">
      <!-- Card top -->
      <div class="grow p-5">
        <!-- Image + name -->
        <header>
          <div class="text-center">
            <router-link class="inline-flex text-slate-800 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white" :to="{ name: 'customerProfile', params: { id: customer.id } }">
              <h2 class="text-xl leading-snug justify-center font-semibold">{{customer.name}}</h2>
            </router-link>
          </div>
        </header>
        <!-- Bio -->
        <div class="text-center mt-2" v-if="customer.comment">
          <div class="text-sm">{{ customer.comment }}</div>
        </div>
      </div>
      <!-- Card footer -->
      <div class="border-t border-slate-200 dark:border-slate-700">
        <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" :to="{ name: 'customerProfile', params: { id: customer.id } }">
          <div class="flex items-center justify-center">
            <span>Открыть</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const { customer } = defineProps(['customer']);
</script>