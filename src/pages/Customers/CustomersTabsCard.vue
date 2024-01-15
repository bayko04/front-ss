<template>
  <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    <div class="flex flex-col h-full">
      <!-- Card top -->
      <div class="grow p-5">
        <!-- Image + name -->
        <header>
          <div class="flex justify-center mb-2">
            <router-link class="relative inline-flex items-start" :to="{ name: 'customerProfile', params: { id: customer.id } }">
              <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true">
                <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                  <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                </svg>
              </div>
              <img class="rounded-full" :src="customer.image ?? 'https://i.playground.ru/p/YSmx3ZNjCuMtC4Dt7HCJcw.jpeg'" width="64" height="64" :alt="customer.name" />
            </router-link>
          </div>
          <div class="text-center">
            <router-link class="inline-flex text-slate-800 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white" :to="{ name: 'customerProfile', params: { id: customer.id } }">
              <h2 class="text-xl leading-snug justify-center font-semibold">{{customer.last_name}} {{customer.name}} {{customer.middle_name}}</h2>
            </router-link>
          </div>
          <div class="flex justify-center items-center" v-if="customer.citizenship"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1">-&gt;</span> <span>{{ customer.citizenship?.image }}</span></div>
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
            <svg class="w-4 h-4 fill-current shrink-0 mr-2" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
            </svg>
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