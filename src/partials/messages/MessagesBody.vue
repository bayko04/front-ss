<template>
  <div
      class="grow px-4 sm:px-6 md:px-5 py-6"
  >
    <div ref="messagesBottomElement"></div>
    <div
        v-if="activeChat"
        class="flex items-start mb-4 last:mb-0"
        v-for="message in activeChat.messages"
        :key="message.id"
        :ref="el => setMessagesRef(el, message.id)"
    >
      <MessagesContent :message="message"/>
    </div>
    <div ref="messagesBottomElement"></div>
  </div>
</template>

<script setup>
import { useMessangers } from "../../utils/messengers.js";
import MessagesContent from "./MessagesContent.vue";
import { onMounted, ref  } from "vue";

const { activeChat, getMessages } = useMessangers();
const messagesBottomElement = ref('')

const messagesRef = ref({})
const setMessagesRef = function (el, key) {
  messagesRef.value[key] = el
}

onMounted(() => {
  window.messagesBottomElement = messagesBottomElement.value
  window.messagesRef = messagesRef.value;
});
</script>