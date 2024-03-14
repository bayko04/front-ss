<template>
  <div>
      {{ formatDate(message.date) }} статус:
      {{message.text}}
  </div>

</template>
<script setup>
const { message } = defineProps(['message']);

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0'); // добавляем ведущий ноль, если день < 10
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // добавляем ведущий ноль, если месяц < 10
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0'); // добавляем ведущий ноль, если часы < 10
    const minutes = date.getMinutes().toString().padStart(2, '0'); // добавляем ведущий ноль, если минуты < 10

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}
</script>

