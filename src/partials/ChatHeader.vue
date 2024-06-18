<template>
  <header class="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 -mb-px">

        <!-- Header: Left side -->
        <div class="flex">


        </div>
        <div class="flex items-center space-x-3">
          <Suspense>
            <HeaderButtons/>
          </Suspense>
        </div>


        </div>

      </div>
  </header>
</template>

<script>
import { ref } from 'vue'

import SearchModal from '../components/ModalSearch.vue'
import Notifications from '../components/DropdownNotifications.vue'
import Help from '../components/DropdownHelp.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import UserMenu from '../components/DropdownProfile.vue'
import HeaderButtons from "../partials/messages/HeaderButtons.vue"
import WorkSessionButton from "./settings/WorkSessionButton.vue";

export default {
  name: 'Header',
  props: ['sidebarOpen'],
  components: {
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
    return {
      searchModalOpen,
    }
  }
}
</script>