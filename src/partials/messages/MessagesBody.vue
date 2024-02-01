<template>
  <div
      class="grow px-4 sm:px-6 md:px-5 py-6"

  >
    <div
        v-if="activeChat"
        class="flex items-start mb-4 last:mb-0"
        v-for="message in activeChat.messages"
        :key="message.id"
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

const { activeChat } = useMessangers();
const messagesBottomElement = ref('')

onMounted(() => {
  window.messagesBottomElement = messagesBottomElement.value;
});
</script>