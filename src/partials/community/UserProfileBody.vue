<template>
  <div class="grow flex flex-col md:translate-x-0 transition-transform duration-300 ease-in-out translate-x-0" v-if="usersStore.user">

    <!-- Profile background -->
    <div class="relative h-56 bg-slate-200 dark:bg-slate-900">
      <img class="object-cover h-full w-full" src="../../images/profile-bg.jpg" width="979" height="220" alt="Profile background" />
    </div>

    <!-- Content -->
    <div class="relative px-4 sm:px-6 pb-8">

      <!-- Pre-header -->
      <div class="-mt-16 mb-6 sm:mb-3">

        <div class="flex flex-col items-center sm:flex-row sm:justify-between sm:items-end">

          <!-- Avatar -->
          <div class="inline-flex -ml-1 -mt-1 mb-4 sm:mb-0">
            <img class="asd rounded-full border-4 border-white dark:border-slate-900" :src="usersStore.user.image" width="128" height="128" alt="Avatar" />
          </div>

          <!-- Actions -->
          <div class="flex space-x-2 sm:mb-2">
            <router-link :to="`/users/update/${usersStore.user.id}`" class="p-1.5 shrink-0 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm">
              <Edit/>
            </router-link>
            <button @click="deleteUser(usersStore.user.id)" class="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600">
              <svg class="w-4 h-4 fill-current text-rose-500 shrink-0" viewBox="0 0 16 16">
                <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/>
              </svg>
            </button>
          </div>

        </div>

      </div>

      <!-- Header -->
      <header class="text-center sm:text-left mb-6">
        <!-- Name -->
        <div class="inline-flex items-start mb-2">
          <h1 class="text-2xl text-slate-800 dark:text-slate-100 font-bold">{{usersStore.user.name}}</h1>
          <svg class="w-4 h-4 fill-current shrink-0 text-amber-500 ml-2" viewBox="0 0 16 16">
            <path d="M13 6a.75.75 0 0 1-.75-.75 1.5 1.5 0 0 0-1.5-1.5.75.75 0 1 1 0-1.5 1.5 1.5 0 0 0 1.5-1.5.75.75 0 1 1 1.5 0 1.5 1.5 0 0 0 1.5 1.5.75.75 0 1 1 0 1.5 1.5 1.5 0 0 0-1.5 1.5A.75.75 0 0 1 13 6ZM6 16a1 1 0 0 1-1-1 4 4 0 0 0-4-4 1 1 0 0 1 0-2 4 4 0 0 0 4-4 1 1 0 1 1 2 0 4 4 0 0 0 4 4 1 1 0 0 1 0 2 4 4 0 0 0-4 4 1 1 0 0 1-1 1Z" />
          </svg>
        </div>

        <div class="flex flex-wrap justify-center sm:justify-start space-x-4">
          <div class="flex items-center">
            <svg class="w-4 h-4 fill-current shrink-0 text-slate-400 dark:text-slate-500" viewBox="0 0 16 16">
              <path d="M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z" />
            </svg>
            <span class="text-sm font-medium whitespace-nowrap text-slate-500 dark:text-slate-400 ml-2">{{usersStore.user.email}}</span>
          </div>
        </div>
      </header>

    </div>

  </div>
</template>

<script setup>
import { useUsersStore } from "../../stores/user.store.js"
import Edit from '../../images/edit.svg'

const usersStore = useUsersStore()

function deleteUser(id) {
  usersStore.deleteUser(id);
}
</script>