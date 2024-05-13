<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div ref="contentArea" class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="relative flex h-full">

          <!-- Messages sidebar -->
          <MessagesSidebar :msgSidebarOpen="msgSidebarOpen" @close-msgsidebar="msgSidebarOpen = false" />

          <!-- Messages body -->
          <div class="grow flex flex-col md:translate-x-0 transition-transform duration-300 ease-in-out" :class="msgSidebarOpen ? 'translate-x-1/3' : 'translate-x-0'">
            <Suspense>
              <MessagesHeader :msgSidebarOpen="msgSidebarOpen" @toggle-msgsidebar="msgSidebarOpen = !msgSidebarOpen" />
            </Suspense>
            <Suspense>
              <MessagesBody />
            </Suspense>
          </div>
        </div>

        <ModalForReplyToDirect/>
      </main>

    </div> 

  </div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue'
    import Sidebar from '../partials/Sidebar.vue'
    import Header from '../partials/Header.vue'
    import MessagesSidebar from '../partials/comments/MessagesSidebar.vue'
    import MessagesHeader from '../partials/comments/MessagesHeader.vue'
    import MessagesBody from '../partials/comments/MessagesBody.vue'
    import MessagesFooter from '../partials/comments/MessagesFooter.vue'
    import ModalForReplyToDirect from "../components/ModalForReplyToDirect.vue";

    const sidebarOpen = ref(false)
    const msgSidebarOpen = ref(true)
    const contentArea = ref(null)

    const handleScroll = (top = true) => {
      contentArea.value.scrollTop = top ? 0 : 99999999
    }

    onMounted(() => {
      handleScroll()
    })

    watch(msgSidebarOpen, () => {
      msgSidebarOpen.value ? handleScroll() : handleScroll(false)
    })
</script>