<template>
  <header class="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 -mb-px">

        <!-- Header: Left side -->
        <div class="flex">
     

          <!-- Hamburger button -->
          <button class="text-slate-500 hover:text-slate-600 lg:hidden" @click.stop="$emit('toggle-sidebar')" aria-controls="sidebar" :aria-expanded="sidebarOpen">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>

        </div>
        <div class="flex items-center space-x-3 hidden lg:flex">
          <Suspense>
            <HeaderButtons/>
          </Suspense>
        </div>

        <!-- Header: Right side -->
        <div class="flex items-center space-x-3">
          <h3 class="text-[14px] bg-indigo-500 text-white rounded-[6px] p-[5px_10px]">{{ balance.balance || 0 }}с</h3>
<!--          <Notifications align="right" />-->
<!--          <Help align="right" />-->
<!--          <ThemeToggle />-->
          <WorkSessionButton />
          <!-- Divider -->
          <hr class="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
          <UserMenu align="right" />

        </div>

      </div>
    </div>
    <div class="block lg:hidden flex justify-center items-center">
      <ChatHeader :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    </div>

  </header>
</template>

<script >
import { ref, onMounted } from 'vue'

import SearchModal from '../components/ModalSearch.vue'
import Notifications from '../components/DropdownNotifications.vue'
import Help from '../components/DropdownHelp.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import UserMenu from '../components/DropdownProfile.vue'
import HeaderButtons from "../partials/messages/HeaderButtons.vue"
import WorkSessionButton from "./settings/WorkSessionButton.vue";
import ChatHeader from "./ChatHeader.vue";
import { useBillingStore } from '../stores/billing.store.js'





export default {
  name: 'Header',
  props: ['sidebarOpen'],
  components: {
    ChatHeader,
    WorkSessionButton,
    HeaderButtons,
    SearchModal,
    Notifications,
    Help,
    ThemeToggle,
    UserMenu,
  },

  setup() {
    const searchModalOpen = ref(false)
    const billingStore = useBillingStore()
    const balance = ref({})

    onMounted(async () => {
      balance.value = await billingStore.getBalance()
      console.log(balance._value.balance)
    })
    
    return {
      searchModalOpen,
      balance
    }  
  }  
}

</script>
