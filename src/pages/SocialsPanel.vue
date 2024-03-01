<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="mb-8">
            <!-- Title -->
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Управление аккаунтами ✨</h1>
          </div>

          <!-- Content -->
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
            <div class="flex flex-col md:flex-row md:-mr-px">
              <div class="grow">

                <!-- Panel body -->
                <div class="p-6">
                  <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">Добавление нового аккаунта</h2>

                  <!-- Connected Apps cards -->
                  <section class="pb-6 border-b border-slate-200 dark:border-slate-700">
                    <div class="grid grid-cols-12 gap-6">
                      <div class="col-span-full xl:col-span-6 2xl:col-span-4 bg-white dark:bg-slate-800 shadow-md rounded-sm border border-slate-200 dark:border-slate-700">
                        <!-- Card content -->
                        <div class="flex flex-col h-full p-5">
                          <div class="grow">
                            <header class="flex items-center mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-whatsapp" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                                <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                              </svg>
                              <h3 class="text-lg text-slate-800 dark:text-slate-100 font-semibold">Whatsapp</h3>
                            </header>
                            <div class="text-sm">Lorem ipsum dolor sit amet eiusmod sed do eiusmod tempor.</div>
                          </div>
                          <!-- Card footer -->
                          <footer class="mt-4">
                            <div class="flex flex-wrap justify-between items-center">
                              <!-- Left side -->
                              <div class="flex space-x-3">
                                <div class="flex items-center text-slate-400 dark:text-slate-500">
                                  <svg class="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                                    <path d="M14.14 9.585a2.5 2.5 0 00-3.522 3.194c-.845.63-1.87.97-2.924.971a4.979 4.979 0 01-1.113-.135 4.436 4.436 0 01-1.343 1.682 6.91 6.91 0 006.9-1.165 2.5 2.5 0 002-4.547h.002zM10.125 2.188a2.5 2.5 0 10-.4 2.014 5.027 5.027 0 012.723 3.078c.148-.018.297-.028.446-.03a4.5 4.5 0 011.7.334 7.023 7.023 0 00-4.469-5.396zM4.663 10.5a2.49 2.49 0 00-1.932-1.234 4.624 4.624 0 01-.037-.516 4.97 4.97 0 011.348-3.391 4.456 4.456 0 01-.788-2.016A6.989 6.989 0 00.694 8.75c.004.391.04.781.11 1.166a2.5 2.5 0 103.86.584z" />
                                  </svg>
                                  <div class="text-sm text-slate-500 dark:text-slate-300">4K+</div>
                                </div>
                                <div class="flex items-center text-amber-500">
                                  <svg class="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                                    <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                  </svg>
                                  <div class="text-sm text-amber-600">4.7</div>
                                </div>
                              </div>
                              <!-- Right side -->
                              <button class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm flex items-center"
                                      @click="socialAuthInit('whatsapp')"
                              >
                                <svg class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                                  <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                                </svg>
                                <span>Добавить</span>
                              </button>
                            </div>
                          </footer>
                        </div>
                      </div>
                      <div class="col-span-full xl:col-span-6 2xl:col-span-4 bg-white dark:bg-slate-800 shadow-md rounded-sm border border-slate-200 dark:border-slate-700">
                        <!-- Card content -->
                        <div class="flex flex-col h-full p-5">
                          <div class="grow">
                            <header class="flex items-center mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                <path d="M16.5 7.5l0 .01" />
                              </svg>
                              <h3 class="text-lg text-slate-800 dark:text-slate-100 font-semibold">Instagram</h3>
                            </header>
                            <div class="text-sm">Lorem ipsum dolor sit amet eiusmod sed do eiusmod tempor.</div>
                          </div>
                          <!-- Card footer -->
                          <footer class="mt-4">
                            <div class="flex flex-wrap justify-between items-center">
                              <!-- Left side -->
                              <div class="flex space-x-3">
                                <div class="flex items-center text-slate-400 dark:text-slate-500">
                                  <svg class="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                                    <path d="M14.14 9.585a2.5 2.5 0 00-3.522 3.194c-.845.63-1.87.97-2.924.971a4.979 4.979 0 01-1.113-.135 4.436 4.436 0 01-1.343 1.682 6.91 6.91 0 006.9-1.165 2.5 2.5 0 002-4.547h.002zM10.125 2.188a2.5 2.5 0 10-.4 2.014 5.027 5.027 0 012.723 3.078c.148-.018.297-.028.446-.03a4.5 4.5 0 011.7.334 7.023 7.023 0 00-4.469-5.396zM4.663 10.5a2.49 2.49 0 00-1.932-1.234 4.624 4.624 0 01-.037-.516 4.97 4.97 0 011.348-3.391 4.456 4.456 0 01-.788-2.016A6.989 6.989 0 00.694 8.75c.004.391.04.781.11 1.166a2.5 2.5 0 103.86.584z" />
                                  </svg>
                                  <div class="text-sm text-slate-500 dark:text-slate-300">4K+</div>
                                </div>
                                <div class="flex items-center text-amber-500">
                                  <svg class="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                                    <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                  </svg>
                                  <div class="text-sm text-amber-600">4.7</div>
                                </div>
                              </div>
                              <!-- Right side -->
                              <button class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm flex items-center"
                                      @click="socialAuthInit('instagram')"
                              >
                                <svg class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                                  <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                                </svg>
                                <span>Добавить</span>
                              </button>
                            </div>
                          </footer>
                        </div>
                      </div>

                    </div>
                  </section>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>

    </div>

  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'

const sidebarOpen = ref(false)
const baseUrl = `${import.meta.env.VITE_API_URL}/auth/redirect`;

function registerSocialAuthEvent(register) {
  if (register)
    return window.addEventListener('message', handleAuth)
  return window.removeEventListener('message', handleAuth)
}

function handleAuth(userdata) {
  console.log(userdata)
}

function socialAuthInit(provider) {
  const width = 640
  const height = 660
  const left = window.screen.width / 2 - (width / 2)
  const top = window.screen.height / 2 - (height / 2)
  window.open(`${baseUrl}/${provider}`, 'Log In',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no,
      resizable=no, copyhistory=no, width=${width},height=${height},top=${top},left=${left}`)
}

onMounted(() => registerSocialAuthEvent(true))
onBeforeUnmount(() => registerSocialAuthEvent(false))
</script>