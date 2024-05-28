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
          <div class="sm:flex sm:justify-between sm:items-center mb-4">

            <!-- Left: Title -->
            <div class="flex flex-row mb-4 sm:mb-0">
              <!-- Previous month button -->
              <button
                  class="mr-2 btn px-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed"
                  :disabled="month === 0 ? true : false"
                  @click="prevMonth()"
              >
                <span class="sr-only">Previous month</span><wbr />
                <svg class="h-4 w-4 fill-current" viewBox="0 0 16 16">
                  <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
                </svg>
              </button>

              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold"><span>{{`${monthNames[month]} ${year}`}}</span> ✨</h1>

              <!-- Next month button -->
              <button
                  class="ml-2 btn px-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed"
                  :disabled="month === 11 ? true : false"
                  @click="nextMonth()"
              >
                <span class="sr-only">Next month</span><wbr />
                <svg class="h-4 w-4 fill-current" viewBox="0 0 16 16">
                  <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                </svg>
              </button>

            </div>

            <!-- Right: Actions -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <!-- Create event button -->
              <button @click.stop="newTaskModal()" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path
                      d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                </svg>
                <span class="hidden xs:block ml-2">Добавить задачу</span>
              </button>

            </div>

          </div>

          <!-- Filters and view buttons -->
          <div class="sm:flex sm:justify-between sm:items-center mb-4">

          <!-- Filters  -->
            <div class="mb-4 sm:mb-0 mr-2">
              <ul class="flex flex-wrap items-center -m-1">
                <li class="m-1" v-for="taskType in referencesStore.taskTypes">
                  <button
                      class="btn-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-400">
                    <div class="w-1 h-3.5 shrink-0" :style="{ backgroundColor: taskType.color }"></div>
                    <span class="ml-1.5">{{ taskType.name }}</span>
                  </button>
                </li>
              </ul>
            </div>

          </div>

          <!-- Calendar table -->
          <div class="bg-white dark:bg-slate-800 rounded-sm shadow overflow-hidden">

            <!-- Days of the week -->
            <div class="grid grid-cols-7 gap-px border-b border-slate-200 dark:border-slate-700">
              <div class="px-1 py-3" v-for="(day, index) in dayNames" :key="index">
                <div class="text-slate-500 text-sm font-medium text-center lg:hidden">{{day.substring(0,3)}}</div>
                <div class="text-slate-500 dark:text-slate-400 text-sm font-medium text-center hidden lg:block">{{day}}</div>
              </div>
            </div>

            <!-- Day cells -->
            <div class="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-700">
              <!-- Diagonal stripes pattern -->
              <svg class="sr-only">
                <defs>
                  <pattern id="stripes" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(135)">
                    <line class="stroke-current text-slate-200 dark:text-slate-700 opacity-50" x1="0" y="0" x2="0" y2="5" stroke-width="2" />
                  </pattern>
                </defs>
              </svg>
              <!-- Empty cells (previous month) -->
              <div class="bg-slate-50 dark:bg-slate-800 h-20 sm:h-28 lg:h-36" v-for="(blankday, index) in startingBlankDays" :key="index">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  <rect width="100%" height="100%" fill="url(#stripes)" />
                </svg>
              </div>
              <!-- Days of the current month -->
              <div class="relative bg-white dark:bg-slate-800 h-auto sm:min-h-28 lg:min-h-36 overflow-hidden" v-for="(day, index) in daysInMonth" :key="index">
                <div class="h-full flex flex-col justify-between">
                  <!-- Events -->
                  <div class="grow flex flex-col relative p-0.5 sm:p-1.5 overflow-hidden">
                    <button
                      class="relative w-full text-left mb-1"
                      v-for="(task, index) in getEvents(day)"
                      @click.stop="openTaskModal(task)"
                      :key="index"
                    >
                      <div class="px-2 py-0.5 rounded overflow-hidden" :style="{ backgroundColor: task.task_type.color }">
                        <!-- Event name -->
                        <div class="text-xs font-semibold truncate">{{task.name}}</div>
                        <!-- Event time -->
                        <div class="text-xs uppercase truncate hidden sm:block">
                          <!-- Start date -->
                          <span>{{task.due_date}}</span>
                        </div>
                      </div>
                    </button>
                    <div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white dark:from-slate-800 to-transparent pointer-events-none" aria-hidden="true"></div>
                  </div>
                  <!-- Cell footer -->
                  <div class="flex justify-between items-center p-0.5 sm:p-1.5">
                    <!-- More button (if more than 2 events) -->
                    <button
                      v-if="getEvents(day).length > 2"
                      class="text-xs text-slate-500 dark:text-slate-300 font-medium whitespace-nowrap text-center sm:py-0.5 px-0.5 sm:px-2 border border-slate-200 dark:border-slate-700 rounded"
                    >
                      <span class="md:hidden">+</span><span>{{getEvents(day).length - 2}}</span> <span class="hidden md:inline">больше</span>
                    </button>
                    <!-- Day number -->
                    <button class="inline-flex ml-auto w-6 h-6 items-center justify-center text-xs sm:text-sm dark:text-slate-300 font-medium text-center rounded-full hover:bg-indigo-100 dark:hover:bg-slate-600" :class="{'text-indigo-500': isToday(day) }">{{day}}</button>
                  </div>
                </div>
              </div>
              <!-- Empty cells (next month) -->
              <div class="bg-slate-50 dark:bg-slate-800 h-20 sm:h-28 lg:h-36" v-for="(blankday, index) in endingBlankDays" :key="index">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  <rect width="100%" height="100%" fill="url(#stripes)" />
                </svg>
              </div>
            </div>
          </div>

          <Suspense>
            <ModalForNewTask/>
          </Suspense>
        </div>
      </main>

    </div> 

  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import { useTaskStore } from "../stores/task.store.js";
import { useAuthStore } from "../stores/auth.store.js";
import { useReferencesStore } from "../stores/references.store.js";
import ModalBlank from "../components/ModalBlank.vue";
import { createTaskModal } from "../utils/modalVariables.js"
import ModalForNewTask from "../partials/calendar/ModalForNewTask.vue";

export default {
  name: 'Calendar',
  components: {
    ModalForNewTask,
    ModalBlank,
    Sidebar,
    Header,
  },
  setup() {
    const today = new Date()
    const sidebarOpen = ref(false)
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    const month = ref(today.getMonth())
    const year = ref(today.getFullYear())
    const daysInMonth = ref([])
    const startingBlankDays = ref([])
    const endingBlankDays = ref([])
    const taskStore = useTaskStore()
    const authStore = useAuthStore()
    const referencesStore = useReferencesStore()

    const isToday = (date) => {
      const day = new Date(year.value, month.value, date)
      return today.toDateString() === day.toDateString() ? true : false
    }

    const getEvents = (date) => {
      return taskStore.tasks.filter(e => new Date(e.due_date).toDateString() === new Date(year.value, month.value, date).toDateString())
    }

    const getDays = () => {
      const days = new Date(year.value, month.value + 1, 0).getDate()

      // starting empty cells (previous month)
      const startingDayOfWeek = new Date(year.value, month.value).getDay()
      let startingBlankDaysArray = []
      for (let i = 1; i <= startingDayOfWeek; i++) {
        startingBlankDaysArray.push(i)
      }

      // ending empty cells (next month)
      const endingDayOfWeek = new Date(year.value, month.value + 1, 0).getDay()
      let endingBlankDaysArray = []
      for (let i = 1; i < 7 - endingDayOfWeek; i++) {
        endingBlankDaysArray.push(i)
      }                    

      // current month cells
      let daysArray = []
      for (let i = 1; i <= days; i++) {
        daysArray.push(i)
      }

      startingBlankDays.value = startingBlankDaysArray
      endingBlankDays.value = endingBlankDaysArray
      daysInMonth.value = daysArray
    }

    const eventColor = (color) => {
      switch (color) {
        case 'sky':
          return 'text-white bg-sky-500';
        case 'indigo':
          return 'text-white bg-indigo-500';
        case 'yellow':
          return 'text-white bg-amber-500';
        case 'emerald':
          return 'text-white bg-emerald-500';
        case 'red':
          return 'text-white bg-rose-400';
        default:
          return '';
      }
    }

    const nextMonth = () => {
      if (month.value === 11) {
        month.value = 0
        year.value++
      } else {
        month.value++
      }
      getDays()
      taskStore.getTasksForUser(authStore.userData.user.id, month.value + 1, year.value)
    }

    const prevMonth = () => {
      if (month.value === 0) {
        month.value = 11
        year.value--
      } else {
        month.value--
      }
      getDays()
      taskStore.getTasksForUser(authStore.userData.user.id, month.value + 1, year.value)
    }

    function openTaskModal(task) {
      taskStore.task = task
      createTaskModal.value.status = 'info'
    }

    function newTaskModal() {
      createTaskModal.value.status = 'create-update'
    }

    onMounted(() => {
      getDays()
      referencesStore.getTaskTypes()
      taskStore.getTasksForUser(authStore.userData.user.id, month.value + 1, year.value)
    })

    return {
      sidebarOpen,
      monthNames,
      dayNames,
      month,
      year,
      daysInMonth,
      startingBlankDays,
      endingBlankDays,
      isToday,
      getEvents,
      getDays,
      eventColor,
      taskStore,
      referencesStore,
      nextMonth,
      prevMonth,
      openTaskModal,
      newTaskModal,
    }
  }
}
</script>