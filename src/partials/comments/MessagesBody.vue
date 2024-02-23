<template>
  <div
      class="grow px-4 sm:px-6 md:px-5 py-6"
  >
    <div
        v-if="activeCommentsChat"
        v-for="comment in activeCommentsChat.comments"
        :key="comment.id"
        :ref="el => setMessagesRef(el, comment.id)"
    >
      <div class="flex items-start mb-4 last:mb-0">
        <MessagesContent :comment="comment"/>
      </div>
      <div
          v-if="comment.replies"
          v-for="reply in comment.replies"
      >
        <div class="flex items-start mb-4 ml-10 last:mb-0">
          <MessagesContent :comment="reply"/>
        </div>
      </div>
    </div>
    <div ref="messagesBottomElement"></div>
  </div>
</template>

<script setup>
import { useMessangers } from "../../utils/messengers.js";
import MessagesContent from "./MessagesContent.vue";
import { onMounted, ref  } from "vue";

const { activeCommentsChat } = useMessangers();
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