<template>
    <div class="flex justify-center">
        <div class="inline-flex items-center justify-center text-xs text-slate-600 font-medium px-2.5 py-1 bg-blue-100 border border-slate-200 rounded-lg my-5" style="opacity: 0.9;">
            {{ formatDate(message.date) }}:
            {{message.text}}
        </div>
    </div>
</template>
<script setup>
import {timestampToDate} from "../../helpers/date-format.js";

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

