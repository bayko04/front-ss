<template>
  <div class="grow flex flex-col md:translate-x-0 transition-transform duration-300 ease-in-out translate-x-0" v-if="customerStore.customer">

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
            <img class="rounded-full" src="#" width="128" height="128" alt="Avatar" />
          </div>

          <!-- Actions -->
          <div class="flex space-x-2 sm:mb-2">
            <router-link :to="`/customers/update/${customerStore.customer.id}`" class="p-1.5 shrink-0 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm">
              <Edit/>
            </router-link>
          </div>

        </div>

      </div>

      <!-- Header -->
      <header class="text-center sm:text-left mb-6">
        <!-- Name -->
        <div class="inline-flex items-start mb-2">
          <h1 class="text-2xl text-slate-800 dark:text-slate-100 font-bold">{{customerStore.customer.last_name}} {{customerStore.customer.name}} {{customerStore.customer.middle_name}}</h1>
          <svg class="w-4 h-4 fill-current shrink-0 text-amber-500 ml-2" viewBox="0 0 16 16">
            <path d="M13 6a.75.75 0 0 1-.75-.75 1.5 1.5 0 0 0-1.5-1.5.75.75 0 1 1 0-1.5 1.5 1.5 0 0 0 1.5-1.5.75.75 0 1 1 1.5 0 1.5 1.5 0 0 0 1.5 1.5.75.75 0 1 1 0 1.5 1.5 1.5 0 0 0-1.5 1.5A.75.75 0 0 1 13 6ZM6 16a1 1 0 0 1-1-1 4 4 0 0 0-4-4 1 1 0 0 1 0-2 4 4 0 0 0 4-4 1 1 0 1 1 2 0 4 4 0 0 0 4 4 1 1 0 0 1 0 2 4 4 0 0 0-4 4 1 1 0 0 1-1 1Z" />
          </svg>
        </div>
        <!-- Bio -->
        <div class="text-sm mb-3">{{customerStore.customer.comment}}</div>
        <!-- Meta -->
        <div class="flex flex-wrap justify-center sm:justify-start space-x-4">
          <div class="flex items-center" v-if="customerStore.customer.email">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail w-4 h-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
              <path d="M3 7l9 6l9 -6" />
            </svg>
            <span class="text-sm font-medium whitespace-nowrap text-slate-500 dark:text-slate-400 ml-2">{{customerStore.customer.email}}</span>
          </div>
        </div>
        <div class="flex flex-wrap justify-center sm:justify-start space-x-4">
          <div class="flex items-center" v-if="customerStore.customer.phone">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone w-4 w-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            </svg>
            <span class="text-sm font-medium whitespace-nowrap text-slate-500 dark:text-slate-400 ml-2">{{customerStore.customer.phone}}</span>
          </div>
        </div>
      </header>

      <!-- Tabs -->
      <div class="relative mb-6">
        <div class="absolute bottom-0 w-full h-px bg-slate-200 dark:bg-slate-700" aria-hidden="true"></div>
        <ul class="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
          <li class="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8" @click="tabName = 'general'">
            <button
                class="block pb-3"
                :class="tabName === 'general' ? 'text-indigo-500 whitespace-nowrap border-b-2 border-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap'"
            >Основная информация</button>
          </li>
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
          <!-- Work History -->
          <div v-if="tabName === 'general'">
            <h2 class="text-slate-800 dark:text-slate-100 font-semibold mb-2">История</h2>
            <div class="bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-sm shadow-sm">
              <ul class="space-y-3">

                <!-- Item -->
                <li class="sm:flex sm:items-center sm:justify-between">
                  <div class="sm:grow flex items-center text-sm">
                    <!-- Icon -->
                    <div class="w-8 h-8 rounded-full shrink-0 bg-amber-500 my-2 mr-3">
                      <svg class="w-8 h-8 fill-current text-amber-50" viewBox="0 0 32 32">
                        <path d="M21 14a.75.75 0 0 1-.75-.75 1.5 1.5 0 0 0-1.5-1.5.75.75 0 1 1 0-1.5 1.5 1.5 0 0 0 1.5-1.5.75.75 0 1 1 1.5 0 1.5 1.5 0 0 0 1.5 1.5.75.75 0 1 1 0 1.5 1.5 1.5 0 0 0-1.5 1.5.75.75 0 0 1-.75.75Zm-7 10a1 1 0 0 1-1-1 4 4 0 0 0-4-4 1 1 0 0 1 0-2 4 4 0 0 0 4-4 1 1 0 0 1 2 0 4 4 0 0 0 4 4 1 1 0 0 1 0 2 4 4 0 0 0-4 4 1 1 0 0 1-1 1Z" />
                      </svg>
                    </div>
                    <!-- Position -->
                    <div>
                      <div class="font-medium text-slate-800 dark:text-slate-100">Senior Product Designer</div>
                      <div class="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
                        <div>Remote</div>
                        <div class="text-slate-400 dark:text-slate-600">·</div>
                        <div>April, 2020 - Today</div>
                      </div>
                    </div>
                  </div>
                  <!-- Tags -->
                  <div class="sm:ml-2 mt-2 sm:mt-0">
                    <ul class="flex flex-wrap sm:justify-end -m-1">
                      <li class="m-1">
                        <button class="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">Marketing</button>
                      </li>
                      <li class="m-1">
                        <button class="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">+4</button>
                      </li>
                    </ul>
                  </div>
                </li>

                <!-- Item -->
                <li class="sm:flex sm:items-center sm:justify-between">
                  <div class="sm:grow flex items-center text-sm">
                    <!-- Icon -->
                    <div class="w-8 h-8 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                      <svg class="w-8 h-8 fill-current text-indigo-50" viewBox="0 0 32 32">
                        <path d="M8.994 20.006a1 1 0 0 1-.707-1.707l4.5-4.5a1 1 0 0 1 1.414 0l3.293 3.293 4.793-4.793a1 1 0 1 1 1.414 1.414l-5.5 5.5a1 1 0 0 1-1.414 0l-3.293-3.293L9.7 19.713a1 1 0 0 1-.707.293Z" />
                      </svg>
                    </div>
                    <!-- Position -->
                    <div>
                      <div class="font-medium text-slate-800 dark:text-slate-100">Product Designer</div>
                      <div class="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
                        <div>Milan, IT</div>
                        <div class="text-slate-400 dark:text-slate-600">·</div>
                        <div>April, 2018 - April 2020</div>
                      </div>
                    </div>
                  </div>
                  <!-- Tags -->
                  <div class="sm:ml-2 mt-2 sm:mt-0">
                    <ul class="flex flex-wrap sm:justify-end -m-1">
                      <li class="m-1">
                        <button class="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">Marketing</button>
                      </li>
                      <li class="m-1">
                        <button class="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">+4</button>
                      </li>
                    </ul>
                  </div>
                </li>

                <!-- Item -->
                <li class="sm:flex sm:items-center sm:justify-between">
                  <div class="sm:grow flex items-center text-sm">
                    <!-- Icon -->
                    <div class="w-8 h-8 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                      <svg class="w-8 h-8 fill-current text-indigo-50" viewBox="0 0 32 32">
                        <path d="M8.994 20.006a1 1 0 0 1-.707-1.707l4.5-4.5a1 1 0 0 1 1.414 0l3.293 3.293 4.793-4.793a1 1 0 1 1 1.414 1.414l-5.5 5.5a1 1 0 0 1-1.414 0l-3.293-3.293L9.7 19.713a1 1 0 0 1-.707.293Z" />
                      </svg>
                    </div>
                    <!-- Position -->
                    <div>
                      <div class="font-medium text-slate-800 dark:text-slate-100">Product Designer</div>
                      <div class="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
                        <div>Milan, IT</div>
                        <div class="text-slate-400 dark:text-slate-600">·</div>
                        <div>April, 2018 - April 2020</div>
                      </div>
                    </div>
                  </div>
                  <!-- Tags -->
                  <div class="sm:ml-2 mt-2 sm:mt-0">
                    <ul class="flex flex-wrap sm:justify-end -m-1">
                      <li class="m-1">
                        <button class="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">Marketing</button>
                      </li>
                      <li class="m-1">
                        <button class="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">+4</button>
                      </li>
                    </ul>
                  </div>
                </li>

              </ul>
            </div>
          </div>

          <!--    contacts    -->
          <div v-else-if="tabName === 'contact'">
            <customer-contacts/>
          </div>
          <div v-else-if="tabName === 'document'">
            <customer-documents/>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import {ref} from "vue"
import CustomerContacts from "./CustomerContacts.vue"
import CustomerDocuments from "./CustomerDocuments.vue"
import {useCustomerStore} from "../../stores/customer.store.js"
import Edit from '../../images/edit.svg'

const customerStore = useCustomerStore()
const tabName = ref('general')

</script>