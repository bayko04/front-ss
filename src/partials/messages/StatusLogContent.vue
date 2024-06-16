<template>
    <div class="flex justify-center">
        <div class="inline-flex items-center justify-center text-xs text-slate-600 font-medium px-2.5 py-1 bg-blue-100 border border-slate-200 rounded-lg my-5" style="opacity: 0.9;">
            {{ timestampToTime(message.created_at) }}: {{message.text}}
        </div>
    </div>
</template>
<script setup>
import { timestampToTime } from "../../helpers/date-format.js";


const { message } = defineProps(['message']);

</script>

