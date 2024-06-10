<template>
  <div class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    <header class="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
      <h2 class="font-semibold text-slate-800 dark:text-slate-100">Статусы обращений</h2>
    </header>
    <div class="px-5 py-3">
      <div class="text-3xl font-bold text-slate-800 dark:text-slate-100">{{dashboardStore.customerRequests?.totalRequests}} обращений</div>
    </div>
    <!-- Chart built with Chart.js 3 -->
    <!-- Change the height attribute to adjust the chart height -->
    <PieChart v-if="dashboardStore.statusOfReferences.labels.length" :data="dashboardStore.statusOfReferences" width="389" height="220" />
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import PieChart from '../../charts/PieChart.vue'
import {useDashboardStore} from "../../stores/dashboard.store.js";

// Import utilities
import { tailwindConfig } from '../../utils/Utils'

export default {
  name: 'FintechCard09',
  components: {
    PieChart,
  },
  setup() {
    const dashboardStore = useDashboardStore()


    onMounted(async () => {
      await dashboardStore.getStatusOfReferences()
    })

    return {
      dashboardStore
    } 
  }
}
</script>