<template>
  <main v-if="detailsDay !== undefined" class="grow">
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div class="bg-white shadow rounded-lg p-4">

        <h1 class="text-2xl font-bold text-center mb-4">
          <button

              class="mr-2 btn px-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed"
              @click="setNewDate(date - 1)"
          >
            <span class="sr-only">Previous month</span><wbr />
            <svg class="h-4 w-4 fill-current" viewBox="0 0 16 16">
              <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
            </svg>
          </button>
            {{ formatDateToDMY(detailsDay) }}
          <button
              class="ml-2 btn px-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed"
              @click="setNewDate(date + 1)"
          >
            <span class="sr-only">Next month</span><wbr />
            <svg class="h-4 w-4 fill-current" viewBox="0 0 16 16">
              <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
            </svg>
          </button>
        </h1>
        <div class="flex flex-col items-center justify-center w-full text-center" v-if="mini">
          <button @click.stop="send()" class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
            Отправить
          </button>
          <!-- Блок для отображения сообщения об ошибке, он будет находиться ниже кнопки -->
          <p v-if="errorMessage" class="mt-2 text-red-500">{{ errorMessage }}</p>
        </div>
        <div class="grid grid-cols-4 gap-0">
          <div class="col-span-1 text-center font-semibold">Время</div>
          <div class="col-span-3 text-center font-semibold">События</div>
        </div>
        <div class="border-gray-300 border-b">
          <div v-for="(hour, index) in hours">

            <div :class="mergeRow(index) ? 'border-t-0' : ''" class="grid grid-cols-6 gap-0 border border-gray-300 border-b-0">
              <!-- Время -->
              <div class="col-span-1 row-span-2 time-slot border-t border-r border-gray-300 flex items-center justify-center">
                <div class="text-sm font-bold">{{hour}}</div>
              </div>

              <!-- События для текущего часа -->
              <div v-if="getEventsForHour(index).length" class="col-span-5 time-slot grid grid-rows-2 w-full">
                <div v-for="(currentEvent, key) in getEventsForHour(index)" class="border border-t" :key="key">
                  <div
                      :class="[
                          'rounded-lg p-4',
                          getColspanAndOffsetClass(currentEvent, index)['class'],
                          isDarkColor(currentEvent.task_type.color) ? 'text-white' : 'text-black',
                        ]"
                      :style="{ backgroundColor: currentEvent.task_type.color }"
                  >
                    <div v-if="mergeRow(index) !== true">
                      <!-- Название события -->
                      <div class="font-bold text-lg text-center">{{currentEvent.name}}</div>

                      <div class="text-sm text-center">
                        {{ formatDate(currentEvent.due_date) }} - {{ formatDate(currentEvent.end_date) }}
                      </div>

                      <!-- Описание события -->
                      <div class="text-sm text-center">{{currentEvent.description}} {{getColspanAndOffsetClass(currentEvent, index)['rowNumber']}}</div>
                    </div>
                  </div>
                </div>
                <div v-if="getEventsForHour(index).length === 1 && getColspanAndOffsetClass(getEventsForHour(index)[0], index)['rows'] === 1" @click.stop="handleRowClick(index, getColspanAndOffsetClass(getEventsForHour(index)[0], index)['rowNumber'] === 1 ? 2 : 1)" class="row-span-1 min-h-full flex justify-center border border-t-2 items-center text-black cursor-pointer">
                  <button class="text-sm">{{index}} : {{ getColspanAndOffsetClass(getEventsForHour(index)[0], index)['rowNumber'] === 1 ? '30' : '00' }} - Свободное время</button>
                </div>
              </div>

              <!-- Пустое время, если нет событий -->
              <div v-else class="col-span-5 time-slot grid grid-rows-2 w-full">
                  <div @click.stop="handleRowClick(index, 1)" class="row-span-1 min-h-full flex justify-center items-center text-black cursor-pointer">
                    <button class="text-sm">{{index}}:00 - Свободное время</button>
                  </div>
                  <div @click.stop="handleRowClick(index, 2)" class="row-span-1 min-h-full border-gray-300 border-t flex justify-center items-center text-black cursor-pointer">
                    <button class="text-sm">{{index}}:30 - Свободное время</button>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import {computed, ref, toRefs} from "vue";

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
const errorMessage = ref("");
const props = defineProps(['detailsDay', 'detailsDateEvents', 'year', 'month', 'date', 'setNewDate', 'openModalForCreate', 'mini', 'sendRecommendedTasks']);
const { detailsDay, detailsDateEvents, year, month, setNewDate, date, openModalForCreate, mini, sendRecommendedTasks } = toRefs(props);

function send() {
  if (recommendedTasksCount.value < 1 || recommendedTasksCount.value > 5) {
    errorMessage.value = "Количество задач должно быть не менее 1 и не более 5.";
  } else {
    errorMessage.value = ""; // Очистка сообщения об ошибке, если проверка пройдена
    sendRecommendedTasks.value();
  }
}

function formatDateToDMY(date) {
  const day = String(date.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Получаем месяц (прибавляем 1) и добавляем ведущий ноль
  const year = date.getFullYear(); // Получаем год

  return `${day}-${month}-${year}`; // Форматируем строку
}

function handleRowClick(hour, rowNumber) {
  let minutes = rowNumber === 1 ? 0 : 30;

  openModalForCreate.value(hour, minutes)
}

function formatDate(date) {
  const eventDate = new Date(date);
  return eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

function isDarkColor(color) {
  const rgb = hexToRgb(color);
  if (!rgb) return false;

  // Используем формулу для расчёта яркости
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness < 128; // Если яркость меньше 128, считаем цвет тёмным
}

function hexToRgb(hex) {
  // Проверяем правильность HEX-цвета и преобразуем его в RGB
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const mergeRow = function(index) {
  if(index === 0) return false

  const latestEvents = getEventsForHour(index - 1)

  if(latestEvents.length === 0) return false

  const currentEvents = getEventsForHour(index)

  if(currentEvents.length === 0) return false

  if(latestEvents[latestEvents.length-1].id === currentEvents[0].id) return true
}

const getColspanAndOffsetClass = function (currentEvent, hour) {
  const durationMinutes = getEventDurationInMinutes(currentEvent, hour);
  const startOffsetMinutes = getEventStartOffsetInMinutes(currentEvent, hour);
  // Определяем, какое количество строк занимает событие
  const rowSpan = Math.ceil(durationMinutes / 30); // Каждые 30 минут - одна строка
  const startOffsetClass = startOffsetMinutes >= 30 ? 'row-start-2' : 'row-start-1'; // Смещение по времени
  return {
    'class': startOffsetClass + ' row-span-' + rowSpan,
    'rows': rowSpan,
    'rowNumber': startOffsetMinutes >= 30 ? 2 : 1
  }
}

// Функция для определения продолжительности события в минутах в текущем часе
const getEventDurationInMinutes = (currentEvent, hour) => {
  const eventStart = new Date(currentEvent.due_date);
  const eventEnd = new Date(currentEvent.end_date);
  const currentHourStart = new Date(year.value, month.value, detailsDay.value.getDate(), hour, 0, 0);
  const currentHourEnd = new Date(currentHourStart);
  currentHourEnd.setHours(currentHourEnd.getHours() + 1);

  const start = eventStart < currentHourStart ? currentHourStart : eventStart;
  const end = eventEnd > currentHourEnd ? currentHourEnd : eventEnd;

  return (end - start) / (1000 * 60); // Продолжительность в минутах
};

// Функция для расчета начала события в рамках часа (в минутах)
const getEventStartOffsetInMinutes = (event, hour) => {
  const eventStart = new Date(event.due_date);
  const currentHourStart = new Date(year.value, month.value, detailsDay.value.getDate(), hour, 0, 0);

  return Math.max((eventStart - currentHourStart) / (1000 * 60), 0); // Смещение в минутах
};

const recommendedTasksCount = computed(() => {
  return detailsDateEvents.value.filter(event => event.isRecommendedTask).length;
});

const getEventsForHour = (hour) => {
  // Устанавливаем временные границы для текущего часа
  const currentHourStart = new Date(year.value, month.value, detailsDay.value.getDate(), hour, 0, 0);
  const currentHourEnd = new Date(currentHourStart);
  currentHourEnd.setHours(currentHourEnd.getHours() + 1);

  // Фильтруем события, которые пересекаются с этим часом
  return detailsDateEvents.value.filter(event => {
    const eventStart = new Date(event.due_date); // начало события
    const eventEnd = new Date(event.end_date);   // конец события

    // Проверяем пересечение события с текущим часовым интервалом
    return (eventStart < currentHourEnd && eventEnd > currentHourStart);
  });
};

</script>
