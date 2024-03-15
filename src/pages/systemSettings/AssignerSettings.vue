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
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Автоматическое назначение ответственных ✨</h1>
          </div>

          <!-- Content --> 
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
            <div class="flex flex-col md:flex-row md:-mr-px">
              <SettingsSystem />
              <div class="grow">
                <!-- Panel body -->
                <div class="p-6 space-y-6">
                  <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">Автоматическое назначение отвественных</h2>

                  <!-- Toggle Switch -->
                  <div>
                    <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6">Toggle Switch</h2>
                    <div class="flex flex-wrap items-center -m-3">

                      <div class="m-3 w-24">
                        <!-- Start -->
                        <div class="flex items-center mt-5">
                          <div class="form-switch">
                            <input type="checkbox" id="toggle1" class="sr-only" v-model="toggle1" true-value="On" false-value="Off" />
                            <label class="bg-slate-400 dark:bg-slate-700" for="toggle1">
                              <span class="bg-white shadow-sm" aria-hidden="true"></span>
                              <span class="sr-only">Toggle</span>
                            </label>
                          </div>
                          <div class="text-sm text-slate-400 dark:text-slate-500 italic ml-2">{{toggle1}}</div>
                        </div>
                        <!-- End -->
                      </div>

                      <div class="m-3 w-24">
                        <!-- Start -->
                        <div class="flex items-center mt-5">
                          <div class="form-switch">
                            <input type="checkbox" id="toggle2" class="sr-only" v-model="toggle2" true-value="On" false-value="Off" />
                            <label class="bg-slate-400 dark:bg-slate-700" for="toggle2">
                              <span class="bg-white shadow-sm" aria-hidden="true"></span>
                              <span class="sr-only">Toggle</span>
                            </label>
                          </div>
                          <div class="text-sm text-slate-400 dark:text-slate-500 italic ml-2">{{toggle2}}</div>
                        </div>
                        <!-- End -->
                      </div>

                      <div class="m-3 w-32">
                        <!-- Start -->
                        <div class="flex items-center mt-5">
                          <div class="form-switch">
                            <input type="checkbox" id="toggle3" class="sr-only" v-model="toggle3" true-value="On" false-value="Off" disabled />
                            <label class="bg-slate-400 dark:bg-slate-700" for="toggle3">
                              <span class="bg-white shadow-sm" aria-hidden="true"></span>
                              <span class="sr-only">Toggle</span>
                            </label>
                          </div>
                          <div class="text-sm text-slate-400 dark:text-slate-500 italic ml-2">Disabled</div>
                        </div>
                        <!-- End -->
                      </div>

                    </div>
                  </div>
                </div>
              </div>
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
import SettingsSidebar from '../../partials/settings/SettingsSidebar.vue'
import InterestRatePanel from '../../partials/settings/InterestRatePanel.vue'
import SettingsSystem from '../../partials/settings/SettingsSystem.vue'

export default {
  name: 'Account',
  components: {
    Sidebar,
    Header,
    SettingsSidebar,
    InterestRatePanel,
      SettingsSystem
  },
  setup() {

    const sidebarOpen = ref(false)

    return {
      sidebarOpen,
    }  
  }
}
</script>