<template>
  <div class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    <header class="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
      <h2 class="font-semibold text-slate-800 dark:text-slate-100">Статусы обращений</h2>
    </header>
    <div class="px-5 py-3">
      <div class="text-3xl font-bold text-slate-800 dark:text-slate-100">{{dashboardStore.customerRequests.totalRequests}} обращений</div>
    </div>
    <!-- Chart built with Chart.js 3 -->
    <!-- Change the height attribute to adjust the chart height -->
    <PieChart v-if="chartData.labels.length" :data="chartData" width="389" height="220" />
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
    const chartData = ref({
      labels: [],
      datasets: [
        {
          label: 'Количество обращений',
          data: [],
          backgroundColor: [
            tailwindConfig().theme.colors.emerald[400],
            tailwindConfig().theme.colors.amber[400],
            tailwindConfig().theme.colors.sky[400],
            tailwindConfig().theme.colors.indigo[500],
            tailwindConfig().theme.colors.purple[500],
            tailwindConfig().theme.colors.yellow[500],
            tailwindConfig().theme.colors.orange[500],
            tailwindConfig().theme.colors.blue[500],
          ],
          hoverBackgroundColor: [
            tailwindConfig().theme.colors.emerald[500],
            tailwindConfig().theme.colors.amber[500],
            tailwindConfig().theme.colors.sky[500],
            tailwindConfig().theme.colors.indigo[600],
            tailwindConfig().theme.colors.purple[600],
            tailwindConfig().theme.colors.yellow[600],
            tailwindConfig().theme.colors.orange[600],
            tailwindConfig().theme.colors.blue[600],
          ],
          borderWidth: 0,
        },
      ],
    })

    onMounted(async () => {
      await dashboardStore.getStatusOfReferences()
      chartData.value.labels = dashboardStore.statusRequests.statusName
      chartData.value.datasets[0].data = dashboardStore.statusRequests.count
      await dashboardStore.getNumberOfReferences()
    })

    return {
      chartData,
      dashboardStore
    } 
  }
}
</script>