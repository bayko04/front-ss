<template>
  <div class="min-w-fit">
    <!-- Sidebar backdrop (mobile only) -->
    <div class="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200" :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'" aria-hidden="true"></div>

    <!-- Sidebar -->
    <div
      id="sidebar"
      ref="sidebar"
      class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-20 lg:w-20 lg:sidebar-expanded:!w-20 2xl:!w-20 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64'"
    >

      <!-- Sidebar header -->
      <div class="flex justify-between mb-10 pr-3 sm:px-2">
        <!-- Close button -->
        <button
          ref="trigger"
          class="lg:hidden text-slate-500 hover:text-slate-400"
          @click.stop="$emit('close-sidebar')"
          aria-controls="sidebar"
          :aria-expanded="sidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        <!-- Logo -->
        <router-link class="block" to="/">
          <img src="../images/logo2.png" class="w-14" alt="">
        </router-link>
      </div>

      <!-- Links -->
      <div class="space-y-8">
        <!-- Pages group -->
        <div>
          <ul class="mt-3">
            <!-- Chats -->
            <router-link to="/messages" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path class="fill-current" :class="isExactActive ? 'text-indigo-500' : 'text-slate-600'" d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z" />
                        <path class="fill-current" :class="isExactActive ? 'text-indigo-300' : 'text-slate-400'" d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Чаты</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Comments -->
            <router-link to="/comments" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                        <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                            <path class="fill-current" :class="isExactActive ? 'text-indigo-500' : 'text-slate-600'" d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z" />
                            <path class="fill-current" :class="isExactActive ? 'text-indigo-300' : 'text-slate-400'" d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                        </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Комментарии</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Customers -->
            <router-link to="/customers" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path class="fill-current" :class="currentRoute.fullPath.includes('customers') ? 'text-indigo-500' : 'text-slate-600'" d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z" />
                        <path class="fill-current" :class="currentRoute.fullPath.includes('customers') ? 'text-indigo-300' : 'text-slate-400'" d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z" />
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Клиенты</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>

              <!-- Calendar -->
              <router-link to="/calendar" custom v-slot="{ href, navigate, isExactActive }">
                  <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                      <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                          <div class="flex items-center">
                              <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                  <path class="fill-current" :class="isExactActive ? 'text-indigo-500' : 'text-slate-600'" d="M1 3h22v20H1z" />
                                  <path class="fill-current" :class="isExactActive ? 'text-indigo-300' : 'text-slate-400'" d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z" />
                              </svg>
                              <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Задачи</span>
                          </div>
                      </a>
                  </li>
              </router-link>
              <!-- Marketing -->
              <router-link to="/marketing/newsletters" custom v-slot="{ href, navigate, isExactActive }">
                  <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                      <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                          <div class="flex items-center">
                              <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                  <circle class="fill-current" :class="currentRoute.fullPath.includes('utility') ? 'text-indigo-300' : 'text-slate-400'" cx="18.5" cy="5.5" r="4.5" />
                                  <circle class="fill-current" :class="currentRoute.fullPath.includes('utility') ? 'text-indigo-500' : 'text-slate-600'" cx="5.5" cy="5.5" r="4.5" />
                                  <circle class="fill-current" :class="currentRoute.fullPath.includes('utility') ? 'text-indigo-500' : 'text-slate-600'" cx="18.5" cy="18.5" r="4.5" />
                                  <circle class="fill-current" :class="currentRoute.fullPath.includes('utility') ? 'text-indigo-300' : 'text-slate-400'" cx="5.5" cy="18.5" r="4.5" />
                              </svg>
                              <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Маркетинг</span>
                          </div>
                      </a>
                  </li>
              </router-link>
              <!-- Products -->
              <router-link to="/products/customers" custom v-slot="{ href, navigate, isExactActive }">
                  <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                      <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                          <div class="flex items-center justify-between">
                              <div class="grow flex items-center">
                                  <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                      <path class="fill-current" :class="currentRoute.fullPath.includes('ecommerce') ? 'text-indigo-300' : 'text-slate-400'" d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z" />
                                      <path class="fill-current" :class="currentRoute.fullPath.includes('ecommerce') ? 'text-indigo-600' : 'text-slate-700'" d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z" />
                                      <path class="fill-current" :class="currentRoute.fullPath.includes('ecommerce') ? 'text-indigo-500' : 'text-slate-600'" d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z" />
                                  </svg>
                                  <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Продукты</span>
                              </div>
                          </div>
                      </a>
                  </li>
              </router-link>
              <!-- Sales -->
              <router-link to="/transactions" custom v-slot="{ href, navigate, isExactActive }">
                  <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                      <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                          <div class="flex items-center justify-between">
                              <div class="grow flex items-center">
                                  <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                      <circle class="fill-current" :class="currentRoute.fullPath.includes('component') ? 'text-indigo-500' : 'text-slate-600'" cx="16" cy="8" r="8" />
                                      <circle class="fill-current" :class="currentRoute.fullPath.includes('component') ? 'text-indigo-300' : 'text-slate-400'" cx="8" cy="16" r="8" />
                                  </svg>
                                  <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Продажи</span>
                              </div>
                          </div>
                      </a>
                  </li>
              </router-link>
              <!-- Dashboard -->
              <router-link to="/" custom v-slot="{ href, navigate, isExactActive }">
                  <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                      <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                          <div class="flex items-center justify-between">
                              <div class="grow flex items-center">
                                  <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                      <path class="fill-current" :class="(currentRoute.fullPath === '/' || currentRoute.fullPath.includes('dashboard')) ? 'text-indigo-500' : 'text-slate-400'" d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                                      <path class="fill-current" :class="(currentRoute.fullPath === '/' || currentRoute.fullPath.includes('dashboard')) ? 'text-indigo-600' : 'text-slate-600'" d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                                      <path class="fill-current" :class="(currentRoute.fullPath === '/' || currentRoute.fullPath.includes('dashboard')) ? 'text-indigo-200' : 'text-slate-400'" d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />
                                  </svg>
                                  <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Аналитика</span>
                              </div>
                          </div>
                      </a>
                  </li>
              </router-link>
              <!-- AccessControl -->
              <router-link to="/community/users-tabs" custom v-slot="{ href, navigate, isExactActive }">
                  <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                      <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                          <div class="flex items-center justify-between">
                              <div class="grow flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock-heart" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                      <path class="fill-current" :class="currentRoute.fullPath.includes('community') ? 'text-indigo-500' : 'text-slate-600'" d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h10c.38 0 .734 .106 1.037 .29" />
                                      <path class="fill-current" :class="currentRoute.fullPath.includes('community') ? 'text-indigo-500' : 'text-slate-600'" d="M8 11v-4a4 4 0 1 1 8 0v4" />
                                      <path class="fill-current" :class="currentRoute.fullPath.includes('community') ? 'text-indigo-500' : 'text-slate-600'" d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" />
                                  </svg>
                                  <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Управление доступами</span>
                              </div>
                          </div>
                      </a>
                  </li>
              </router-link>
            <!-- AccountSettings -->
              <router-link to="/settings/account" custom v-slot="{ href, navigate, isExactActive }">
                  <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                      <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                          <div class="flex items-center justify-between">
                              <div class="grow flex items-center">
                                  <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                      <path class="fill-current" :class="currentRoute.fullPath.includes('settings') ? 'text-indigo-500' : 'text-slate-600'" d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z" />
                                      <path class="fill-current" :class="currentRoute.fullPath.includes('settings') ? 'text-indigo-300' : 'text-slate-400'" d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z" />
                                      <path class="fill-current" :class="currentRoute.fullPath.includes('settings') ? 'text-indigo-500' : 'text-slate-600'" d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z" />
                                      <path class="fill-current" :class="currentRoute.fullPath.includes('settings') ? 'text-indigo-300' : 'text-slate-400'" d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z" />
                                  </svg>
                                  <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Настройки аккаунта</span>
                              </div>
                          </div>
                      </a>
                  </li>
              </router-link>
              <!-- SystemSettings -->
              <router-link to="/systemSettings/requestStatus" custom v-slot="{ href, navigate, isExactActive }">
                  <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                      <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                          <div class="flex items-center justify-between">
                              <div class="grow flex items-center">
                                  <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                      <path class="fill-current" :class="isExactActive ? 'text-indigo-500' : 'text-slate-600'" d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z" />
                                      <path class="fill-current" :class="isExactActive ? 'text-indigo-300' : 'text-slate-400'" d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                                  </svg>
                                  <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Настройки системы</span>
                              </div>
                          </div>
                      </a>
                  </li>
              </router-link>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Sidebar',
  props: ['sidebarOpen'],
  components: {
  },
  setup(props, { emit }) {

    const trigger = ref(null)
    const sidebar = ref(null)

    const currentRoute = useRouter().currentRoute.value

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!sidebar.value || !trigger.value) return
      if (
        !props.sidebarOpen ||
        sidebar.value.contains(target) ||
        trigger.value.contains(target)
      ) return
      emit('close-sidebar')
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.sidebarOpen || keyCode !== 27) return
      emit('close-sidebar')
    } 

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })

    return {
      trigger,
      sidebar,
      currentRoute,
    }
  },
}
</script>