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

          <!-- Welcome banner -->
          <WelcomeBanner />
          
          <!-- Dashboard actions -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <!-- Left: Avatars -->
            <DashboardAvatars />

            <!-- Right: Actions -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

              <!-- Datepicker built with flatpickr -->
              <Datepicker @changeDates="selectDates" align="right" />
            </div>

          </div>

          <!-- Cards -->
          <div class="grid grid-cols-12 gap-6">

            <!-- Line chart (Acme Plus) -->
            <DashboardCard01 />
            <FintechCard09 />
            <AnalyticsCard01 />

          </div>

        </div>
      </main>

    </div> 

  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import WelcomeBanner from '../partials/dashboard/WelcomeBanner.vue'
import DashboardAvatars from '../partials/dashboard/DashboardAvatars.vue'
import FilterButton from '../components/DropdownFilter.vue'
import Datepicker from '../components/Datepicker.vue'
import DashboardCard01 from '../partials/dashboard/DashboardCard01.vue'
import DashboardCard02 from '../partials/dashboard/DashboardCard02.vue'
import DashboardCard03 from '../partials/dashboard/DashboardCard03.vue'
import DashboardCard04 from '../partials/dashboard/DashboardCard04.vue'
import DashboardCard05 from '../partials/dashboard/DashboardCard05.vue'
import DashboardCard06 from '../partials/dashboard/DashboardCard06.vue'
import DashboardCard07 from '../partials/dashboard/DashboardCard07.vue'
import DashboardCard08 from '../partials/dashboard/DashboardCard08.vue'
import DashboardCard09 from '../partials/dashboard/DashboardCard09.vue'
import DashboardCard10 from '../partials/dashboard/DashboardCard10.vue'
import DashboardCard11 from '../partials/dashboard/DashboardCard11.vue'
import FintechCard09 from "../partials/fintech/FintechCard09.vue";
import AnalyticsCard01 from "../partials/analytics/AnalyticsCard01.vue";
import {useDashboardStore} from "../stores/dashboard.store.js";
import {timestampToDate} from "../helpers/date-format.js";

export default {
  name: 'Dashboard',
  components: {
      AnalyticsCard01,
      FintechCard09,
    Sidebar,
    Header,
    WelcomeBanner,
    DashboardAvatars,
    FilterButton,
    Datepicker,
    DashboardCard01,
    DashboardCard02,
    DashboardCard03,
    DashboardCard04,
    DashboardCard05,
    DashboardCard06,
    DashboardCard07,
    DashboardCard08,
    DashboardCard09,
    DashboardCard10,
    DashboardCard11,    
  },
  setup() {
    const dashboardStore = useDashboardStore()
    const dateFrom = ref('')
    const dateTo = ref('')

    const sidebarOpen = ref(false)

    function selectDates(dates) {
      dateFrom.value = timestampToDate(dates[0])
      dateTo.value = timestampToDate(dates[1])
      dashboardStore.getStatusOfReferences(dateFrom.value, dateTo.value)
    }

    return {
      sidebarOpen,
      dashboardStore,
      selectDates
    }  
  }
}
</script>