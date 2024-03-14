<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div @scroll="scrolling" ref="contentArea" class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
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
            <Suspense>
              <MessagesFooter />
            </Suspense>
          </div>

          <Suspense>
            <CustomerInfo/>
          </Suspense>
        </div>

        <Suspense>
          <ModalBasicForChatFiles/>
        </Suspense>
        <Suspense>
          <ModalForChatDropdawn/>
        </Suspense>
        <Suspense>
          <ModalForChatEmoji/>
        </Suspense>
        <ModalForClosingChat/>
        <ModalContactsSearchForChat/>
        <ModalForNewChat/>
        <Suspense>
          <ModalForNewTask/>
        </Suspense>
      </main>

    </div> 

  </div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue'
    import Sidebar from '../partials/Sidebar.vue'
    import Header from '../partials/Header.vue'
    import MessagesSidebar from '../partials/messages/MessagesSidebar.vue'
    import MessagesHeader from '../partials/messages/MessagesHeader.vue'
    import MessagesBody from '../partials/messages/MessagesBody.vue'
    import MessagesFooter from '../partials/messages/MessagesFooter.vue'
    import ModalBasicForChatFiles from "../components/ModalBasicForChatFiles.vue";
    import ModalForChatDropdawn from "../components/ModalForChatDropdawn.vue";
    import ModalForChatEmoji from "../components/ModalForChatEmoji.vue";
    import ModalForClosingChat from "../partials/messages/ModalForClosingChat.vue";
    import { useMessangers } from "../utils/messengers.js"
    import CustomerInfo from "../partials/messages/CustomerInfo.vue";
    import ModalContactsSearchForChat from "../partials/messages/ModalContactsSearchForChat.vue";
    import ModalForNewChat from "../components/ModalForNewChat.vue";
    import ModalForNewTask from "../partials/calendar/ModalForNewTask.vue";

    const sidebarOpen = ref(false)
    const msgSidebarOpen = ref(true)
    const contentArea = ref(null)
    const { getMessages } = useMessangers()

    const handleScroll = (top = true) => {
      contentArea.value.scrollTop = top ? 0 : 99999999
    }
    const scrolling = async (e) => {
      const scrollHeight = e.target.scrollHeight
      const scrollTop = e.target.scrollTop
      if (scrollTop === 0) {
        await getMessages()
        e.target.scrollTop = e.target.scrollHeight - scrollHeight
      }
    }

    onMounted(() => {
      handleScroll()
    })

    watch(msgSidebarOpen, () => {
      false
    })
</script>