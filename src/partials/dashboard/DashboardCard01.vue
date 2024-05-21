<template>
  <div class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    <div class="px-5 pt-5">
      <header class="flex justify-between items-start mb-2">
        <!-- Icon -->
        <img src="../../images/icon-01.svg" width="32" height="32" alt="Icon 01" />
        <EditMenu align="right" class="relative inline-flex">
          <li>
            <a class="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" href="#0">Option 1</a>
          </li>
          <li>
            <a class="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" href="#0">Option 2</a>
          </li>
          <li>
            <a class="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" href="#0">Remove</a>
          </li>
        </EditMenu>
      </header>
      <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Количество обращений</h2>
<!--      <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">сом</div>-->
      <div class="flex items-start">
        <div class="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{{dashboardStore.customerRequests.totalRequests}}</div>
        <div class="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">+19%</div>
      </div>
    </div>
    <!-- Chart built with Chart.js 3 -->
    <div class="grow max-sm:max-h-[128px] xl:max-h-[128px]">
      <!-- Change the height attribute to adjust the chart height -->
      <LineChart v-if="chartData.labels.length" :data="chartData" width="389" height="128" />
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import LineChart from '../../charts/LineChart01.vue'
import EditMenu from '../../components/DropdownEditMenu.vue'
import {useDashboardStore} from "../../stores/dashboard.store.js";

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils'

export default {
  name: 'DashboardCard01',
  components: {
    LineChart,
    EditMenu,
  },
  setup() {

    const dashboardStore = useDashboardStore()
    const chartData = ref({
      labels:  [],
      datasets: [
        // Indigo line
        {
          data: [],
          fill: true,
          backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
          borderColor: tailwindConfig().theme.colors.indigo[500],
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
        },
      ],
    })

    onMounted(async () => {
      await dashboardStore.getNumberOfReferences()
      chartData.value.labels = dashboardStore.customerRequests.labels
      chartData.value.datasets[0].data = dashboardStore.customerRequests.datasets
    })

    return {
      chartData,
      dashboardStore
    }
  }
}
</script>