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
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Настройки учетной записи ✨</h1>
          </div>

          <!-- Content --> 
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
            <div class="flex flex-col md:flex-row md:-mr-px">
              <SettingsSystem />
              <AccountPanel />
            </div>
          </div>

        </div>
      </main>

    </div> 

  </div>
</template>

<script>
import { ref } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import SettingsSystem from '../../partials/settings/SettingsSystem.vue'
import AccountPanel from '../../partials/settings/AccountPanel.vue'

export default {
    name: 'Account',
    components: {
        Sidebar,
        Header,
        SettingsSystem,
        AccountPanel,
    },
  setup() {

    const sidebarOpen = ref(false)

    return {
      sidebarOpen,
    }  
  }
}
</script>