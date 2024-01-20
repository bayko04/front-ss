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
            <img class="rounded-full border-4 border-white dark:border-slate-900" :src="usersStore.user.image" width="128" height="128" alt="Avatar" />
          </div>

          <!-- Actions -->
          <div class="flex space-x-2 sm:mb-2">
            <button class="p-1.5 shrink-0 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm">
              <svg class="w-4 h-1 fill-current text-slate-400" viewBox="0 0 16 4">
                <circle cx="8" cy="2" r="2" />
                <circle cx="2" cy="2" r="2" />
                <circle cx="14" cy="2" r="2" />
              </svg>
            </button>
            <router-link :to="`/users/update/${usersStore.user.id}`" class="p-1.5 shrink-0 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm">
              <Edit/>
            </router-link>
            <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
              {{ usersStore.user.role }}
            </button>
          </div>

        </div>

      </div>

      <!-- Header -->
      <header class="text-center sm:text-left mb-6">
        <!-- Name -->
        <div class="inline-flex items-start mb-2">
          <h1 class="text-2xl text-slate-800 dark:text-slate-100 font-bold">{{usersStore.user.last_name}} {{usersStore.user.name}} {{usersStore.user.middle_name}}</h1>
          <svg class="w-4 h-4 fill-current shrink-0 text-amber-500 ml-2" viewBox="0 0 16 16">
            <path d="M13 6a.75.75 0 0 1-.75-.75 1.5 1.5 0 0 0-1.5-1.5.75.75 0 1 1 0-1.5 1.5 1.5 0 0 0 1.5-1.5.75.75 0 1 1 1.5 0 1.5 1.5 0 0 0 1.5 1.5.75.75 0 1 1 0 1.5 1.5 1.5 0 0 0-1.5 1.5A.75.75 0 0 1 13 6ZM6 16a1 1 0 0 1-1-1 4 4 0 0 0-4-4 1 1 0 0 1 0-2 4 4 0 0 0 4-4 1 1 0 1 1 2 0 4 4 0 0 0 4 4 1 1 0 0 1 0 2 4 4 0 0 0-4 4 1 1 0 0 1-1 1Z" />
          </svg>
        </div>
        <!-- Bio -->
        <div class="text-sm mb-3">{{usersStore.user.comment}}</div>
        <!-- Meta -->
        <div class="flex flex-wrap justify-center sm:justify-start space-x-4">
          <div class="flex items-center" v-if="usersStore.user.address">
            <svg class="w-4 h-4 fill-current shrink-0 text-slate-400 dark:text-slate-500" viewBox="0 0 16 16">
              <path d="M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z" />
            </svg>
            <span class="text-sm font-medium whitespace-nowrap text-slate-500 dark:text-slate-400 ml-2">{{usersStore.user.address}}</span>
          </div>
        </div>
      </header>

      <!-- Tabs -->
      <div class="relative mb-6">
        <div class="absolute bottom-0 w-full h-px bg-slate-200 dark:bg-slate-700" aria-hidden="true"></div>
        <ul class="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
          <li class="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8" @click="tabName = 'contact'">
            <button
                class="block pb-3"
                :class="tabName === 'contact' ? 'text-indigo-500 whitespace-nowrap border-b-2 border-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap'"
            >Контакты</button>
          </li>
          <li class="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8"  @click="tabName = 'document'">
            <button
                class="block pb-3"
                :class="tabName === 'document' ? 'text-indigo-500 whitespace-nowrap border-b-2 border-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap'"
            >Документы</button>
          </li>
        </ul>
      </div>

      <!-- Profile content -->
        <div class="flex flex-col xl:flex-row xl:space-x-16">

        <!-- Main content -->
        <div class="flex-1 space-y-5 mb-8 xl:mb-0">

          <!--    contacts    -->
          <div v-if="tabName === 'contact'">
            <UserContacts/>
          </div>
          <div v-else-if="tabName === 'document'">
            <UserDocuments/>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="xl:min-w-56 xl:w-56 space-y-3">
          <div class="text-sm">
            <h3 class="font-medium text-slate-800 dark:text-slate-100">Title</h3>
            <div>Senior Product Designer</div>
          </div>
          <div class="text-sm">
            <h3 class="font-medium text-slate-800 dark:text-slate-100">Location</h3>
            <div>Milan, IT - Remote</div>
          </div>
          <div class="text-sm">
            <h3 class="font-medium text-slate-800 dark:text-slate-100">Email</h3>
            <div>carolinmcneail@acme.com</div>
          </div>
          <div class="text-sm">
            <h3 class="font-medium text-slate-800 dark:text-slate-100">Birthdate</h3>
            <div>4 April, 1987</div>
          </div>
          <div class="text-sm">
            <h3 class="font-medium text-slate-800 dark:text-slate-100">Joined Acme</h3>
            <div>7 April, 2017</div>
          </div>
        </aside>

      </div>

    </div>

  </div>
</template>

<script setup>
import {ref} from "vue"
import UserContacts from "./UserContacts.vue"
import UserDocuments from "./UserDocuments.vue"
import { useUsersStore } from "../../stores/user.store.js"
import Edit from '../../images/edit.svg'

const usersStore = useUsersStore()
const tabName = ref('contact')

</script>