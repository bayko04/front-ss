<template>
    <div class="flex h-[100dvh] overflow-hidden">
  
      <!-- Sidebar -->
      <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />
  
      <!-- Content area -->
      <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
  
        <!-- Site header -->
        <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
  
        <main>
            <router-view />
        </main>

      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Sidebar from '../../partials/Sidebar.vue'
  import Header from '../../partials/Header.vue'

  const sidebarOpen = ref(false)
  </script>
  