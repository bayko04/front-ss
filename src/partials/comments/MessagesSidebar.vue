<template>
  <div
    id="messages-sidebar"
    class="absolute z-20 top-0 bottom-0 w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transition-transform duration-200 ease-in-out"
    :class="msgSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="sticky top-16 bg-white dark:bg-slate-900 overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-r border-slate-200 dark:border-slate-700 md:w-72 xl:w-80 h-[calc(100dvh-64px)]">

      <!-- #Marketing group -->
      <div>
        <!-- Group body -->
        <div class="px-5 py-4">
          <Suspense>
            <DirectMessages :msgSidebarOpen="msgSidebarOpen" @close-msgsidebar="$emit('close-msgsidebar')" />
          </Suspense>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import DirectMessages from './DirectMessages.vue'

const props = defineProps({
  msgSidebarOpen: Boolean,
});

</script>