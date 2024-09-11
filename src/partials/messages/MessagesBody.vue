<template>
  <div
      class="grow px-4 sm:px-6 md:px-5 py-6"
  >
    <div
        v-if="activeChat"
        v-for="message in activeChat.messages"
        :key="message.id"
        :ref="el => setMessagesRef(el, message.id)"
    >
      <!-- Date separator -->
      <div v-if="renderDivider(message.created_at)" class="flex justify-center">
        <div class="inline-flex items-center justify-center text-xs text-slate-600 font-medium px-2.5 py-1 bg-white border border-slate-200 rounded-full my-5">
          {{ timestampToDate(message.created_at) }}
        </div>
      </div>
        <!-- Check message type and render corresponding content -->
        <div v-if="message.type === 'log'" class="flex justify-center mb-4 last:mb-0">
            <StatusLogContent :message="message"/>
        </div>
        <div v-else-if="message.message_status_id !== 7" class="flex items-start mb-4 last:mb-0">
            <MessagesContent :message="message"/>
        </div>
    </div>
    <div ref="messagesBottomElement"></div>
  </div>
</template>

<script setup>
import { useMessangers } from "../../utils/messengers.js";
import MessagesContent from "./MessagesContent.vue";
import { onMounted, ref  } from "vue";
import { timestampToDate } from "../../helpers/date-format.js"
import StatusLogContent from "./StatusLogContent.vue";

const { activeChat } = useMessangers();
const messagesBottomElement = ref('')

const messagesRef = ref({})
const setMessagesRef = function (el, key) {
  messagesRef.value[key] = el
}

let date = ''
const renderDivider = (datetime) => {
  let newDate = timestampToDate(datetime)
  if(date !== newDate) {
    date = newDate
    return true
  }

  return false
}


onMounted(() => {
  window.messagesBottomElement = messagesBottomElement.value
  window.messagesRef = messagesRef.value;
});
</script>
