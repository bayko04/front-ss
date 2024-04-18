<template>
    <!-- With Underline -->
    <div>
        <!-- Start -->
        <div class="relative mb-2">
            <div class="absolute bottom-0 w-full h-px bg-slate-200 dark:bg-slate-700" aria-hidden="true"></div>
            <ul class="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
                <li @click="chatSortStatus = 1" class="px-0 sm:px-3 lg:px-8 flex items-start">
                    <a class="block pb-3"
                       :class="chatSortStatus === 1 ? 'text-indigo-500 whitespace-nowrap border-b-2 border-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap'"
                       href="#0">Мои</a>
                    <span class="text-xs inline-flex font-medium"
                          :class="chatSortStatus === 1 ? 'bg-indigo-400 text-white rounded-full text-center leading-5 px-2 ml-2' : 'bg-gray-400 text-white rounded-full text-center leading-5 px-2 ml-2'"
                    >{{mine}}</span>
                </li>
                <li @click="chatSortStatus = 2" class="px-4 sm:px-6 lg:px-0 flex items-start">
                    <a class="block pb-3"
                       :class="chatSortStatus === 2 ? 'text-indigo-500 whitespace-nowrap border-b-2 border-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap'"
                       href="#0">В очереди</a>
                    <span class="text-xs inline-flex font-medium"
                          :class="chatSortStatus === 2 ? 'bg-indigo-400 text-white rounded-full text-center leading-5 px-2 ml-2' : 'bg-gray-400 text-white rounded-full text-center leading-5 px-2 ml-2'"
                    >{{queue}}</span>
                </li>
                <li @click="chatSortStatus = 3" class="px-4 sm:px-6 lg:px-4 flex items-start">
                    <a class="block pb-3"
                       :class="chatSortStatus === 3 ? 'text-indigo-500 whitespace-nowrap border-b-2 border-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap'"
                       href="#0">Все</a>
                    <span class="text-xs inline-flex font-medium"
                          :class="chatSortStatus === 3 ? 'bg-indigo-400 text-white rounded-full text-center leading-5 px-2 ml-2' : 'bg-gray-400 text-white rounded-full text-center leading-5 px-2 ml-2'"
                    >{{activeAccount?.chats.length}}</span>
                </li>
            </ul>
        </div>
        <!-- End -->
    </div>
</template>

<script setup>
    import { useMessangers } from "../../utils/messengers.js"
    import {computed} from "vue";
    import {useAuthStore} from "../../stores/auth.store.js";
    const {chatSortStatus, activeAccount} = await useMessangers()
    const authStore = useAuthStore()
    const mine = computed(() => {
      let count = 0
      activeAccount.value?.chats?.forEach((chat) => {
        if(chat.latest_customer_request.user_id === authStore.userData.user.id
            && chat.latest_customer_request.chat_status_id != 1) {
          count ++
        }
      })

      return count
    });
    const queue = computed(() => {
      let count = 0
      activeAccount.value?.chats?.forEach((chat) => {
        if(chat.latest_customer_request.chat_status_id === 1) {
          count ++
        }
      })

      return count
    });
</script>