<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <DetailsDay
          v-if="detailsDay"
          :detailsDay="detailsDay"
          :detailsDateEvents="detailsDateEvents"
          :year="year"
          :month="month"
          :date="date"
          :setNewDate="setNewDate"
          :openModalForCreate="openModalForMiniApp"
          :mini="true"
          :sendRecommendedTasks="sendRecommendedTasks"
      />

      <ModalForMiniApp
        :task="task"
        :setRecommendedTask="setRecommendedTask"
        />

    </div> 

  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'

import { useTaskStore } from "../../stores/task.store.js";
import DetailsDay from "../../partials/calendar/DetailsDay.vue";
import router from '../../router.js'
import ModalForMiniApp from "../../partials/calendar/ModalForMiniApp.vue";
import { recomendedTaskModal } from "../../utils/modalVariables.js";

const route = router?.currentRoute?.value

const userId = route.query.userId
const year = ref(Number(route.query.year))
const month = ref(Number(route.query.month) - 1)
const date = ref(Number(route.query.date))
const key = route.query.key
const taskData = ref(null)
const task = ref({})

const taskStore = useTaskStore()
const detailsDay = ref(null)
const detailsDateEvents = ref([]);

function sendRecommendedTasks() {
  const recommendedTasks = detailsDateEvents.value.filter(event => event.isRecommendedTask)
  return taskStore.sendRecommended(recommendedTasks, key)
}

const setNewDate = function (newDate) {
  // Создаем объект Date с корректировкой
  const newFullDate = new Date(year.value, month.value, newDate);

  // Извлекаем корректированные значения года, месяца и дня
  year.value = newFullDate.getFullYear();
  month.value = newFullDate.getMonth(); // Месяцы в JavaScript идут с 0 (январь = 0)
  date.value = newFullDate.getDate();

  // Обновляем данные для нового дня
  setDetailsDay();
}

const setRecommendedTask = function (recommendedTask) {
  recommendedTask.isRecommendedTask = true
  recommendedTask.task_type = {color:'#FF9800'}
  detailsDateEvents.value.push(recommendedTask)

  task.value = {}
  recomendedTaskModal.value.status = 'close'
}

const openModalForMiniApp = function (hour, minutes) {
  const dateTime = new Date(year.value, month.value, date.value, hour, minutes);
  const dueDate = dateTime.toISOString()
  const endDate = new Date(dateTime.setMinutes(dateTime.getMinutes() + Number(taskData.value['additionalMinutes'] ?? 30))).toISOString()

  task.value = {
    "name": taskData.value['name'],
    "user_id": taskData.value['user_id'],
    "chat_id": taskData.value['chat_id'],
    "account_id": taskData.value['account_id'],
    "customer_request_id": taskData.value['customer_request_id'],
    "task_type_id": taskData.value['task_type_id'],
    "due_date": dueDate,
    "end_date": endDate,
  }

  console.log(task.value)

  recomendedTaskModal.value.status = 'open'
}

const setDetailsDay = async () => {
  detailsDateEvents.value = await taskStore.getTasksForUser(userId, month.value + 1, year.value, date.value)
  detailsDay.value = new Date(year.value, month.value, date.value)
}

const getTaskData = async function () {
  taskData.value = await taskStore.getDataByKey(key)
  console.log(taskData.value)
}

onMounted(() => {
  setDetailsDay()
  getTaskData()
})
</script>
