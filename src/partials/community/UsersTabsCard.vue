<template>
  <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    <div class="flex flex-col h-full">
      <!-- Card top -->
      <div class="grow p-5">
        <!-- Image + name -->
        <header>
          <div class="flex justify-center mb-2">
            <router-link class="relative inline-flex items-start" :to="{ name: 'userProfile', params: { id: user.id } }">
              <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true">
                <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                  <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                </svg>
              </div>
              <img class="rounded-full" :src="user.image ?? 'https://i.playground.ru/p/YSmx3ZNjCuMtC4Dt7HCJcw.jpeg'" width="64" height="64" :alt="user.name" />
            </router-link>
          </div>
          <div class="text-center">
            <div class="inline-flex text-slate-800 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white" :to="{ name: 'userProfile', params: { id: user.id } }">
              <h2 class="text-xl leading-snug justify-center font-semibold">{{user.name}}</h2>
            </div>
          </div>
          <div class="flex justify-center items-center"><span>{{ user.email }}</span></div>
        </header>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user } = defineProps(['user']);
</script>