<template>
  <div>
    <div class="flex items-start mb-4 last:mb-0 w-[calc(100%-30px)] gap-[10px]">
      <div class="flex flex-row items-center flex-[0_0_40px]">
        <img
          v-if="message.user_id"
          class="rounded-full mr-4"
          :src="message.user?.image"
          width="40"
          height="40"
          alt="User 01"
        />
        <img
          v-else
          class="rounded-full mr-4"
          :src="activeChat?.image"
          width="40"
          height="40"
          alt="User 01"
        />
      </div>
      <div class="relative group flex-col">
        <div class="text-xs text-slate-500 font-medium ml-2 mr-2">
          {{ message.user?.name }}
        </div>
        <!-- <div class="bg-[red] p-[5px]"> -->
        <div
          v-if="message.reply_message"
          :class="
            message.user_id
              ? ' rounded-tl-none bg-indigo-500 p-[5px] rounded-t-lg'
              : '  rounded-tl-none bg-white p-[5px] rounded-t-lg'
          "
        >
          <div
            v-if="message.reply_message"
            @click="scrollToMessage(message.reply_message.id)"
            :class="
              message.user_id
                ? 'cursor-pointer rounded-lg px-[16px] flex w-full items-center justify-between bg-white dark:bg-slate-800 border-l-4 border-gray-300 dark:border-blue-700 px-[5px]  h-[40px]'
                : 'cursor-pointer text-[black] border rounded-lg px-[16px] flex w-full items-center justify-between bg-white dark:bg-slate-800 border-l-4 border-gray-300 dark:border-blue-700 px-[5px]  h-[40px]'
            "
          >
            <!-- sm:px-6 md:px-5 -->
            <span
              v-if="message.reply_message.text"
              class="overflow-hidden text-[12px] whitespace-no-wrap overflow-ellipsis line-clamp-1 min-w-[100px] )]"
            >
              {{ message.reply_message.text }}
            </span>
            <span
              v-else
              class="overflow-hidden whitespace-no-wrap overflow-ellipsis line-clamp-1 min-w-[100px]]"
            >
              <span
                v-if="
                  message.reply_message?.attachments[0] &&
                  message?.reply_message?.attachments[0].name
                "
              >
                {{ message?.reply_message?.attachments[0].name }}
              </span>
              <span v-else> Без названия </span>
            </span>
            <!-- </div> -->
          </div>
        </div>
        <!-- double fornow -->
        <div v-else class="p-[0px]">
          <div
            v-if="message.reply_message"
            @click="scrollToMessage(message.reply_message.id)"
            :class="
              message.user_id
                ? 'cursor-pointer rounded-lg px-[16px] flex w-full items-center justify-between bg-white dark:bg-slate-800 border-l-4 border-gray-300 dark:border-blue-700 px-[5px]  h-[40px]'
                : 'cursor-pointer text-white rounded-lg px-[16px] flex w-full items-center justify-between bg-indigo-500 dark:bg-slate-800 border-l-4 border-gray-300 dark:border-blue-700 px-[5px]  h-[30px]'
            "
          >
            <!-- sm:px-6 md:px-5 -->
            <span
              v-if="message.reply_message.text"
              class="overflow-hidden text-[12px] whitespace-no-wrap overflow-ellipsis line-clamp-1 min-w-[100px]]"
            >
              {{ message.reply_message.text }}
            </span>
            <span
              v-else
              class="overflow-hidden whitespace-no-wrap overflow-ellipsis line-clamp-1 min-w-[100px]]"
            >
              <span
                v-if="
                  message.reply_message?.attachments[0] &&
                  message?.reply_message?.attachments[0].name
                "
              >
                {{ message?.reply_message?.attachments[0].name }}
              </span>
              <span v-else> Без названия </span>
            </span>
          </div>
        </div>

        <!-- referral -->
        <div
          v-if="
            message.referral &&
            (message.referral.body || message.referral.thumbnail_url)
          "
          class="cursor-pointer flex flex-col w-full items-start bg-gray-100 dark:bg-slate-800 border-t border-l-4 border-gray-300 dark:border-blue-700 px-4 sm:px-6 md:px-5 py-2"
        >
          <span
            v-if="message.referral.body"
            class="whitespace-normal overflow-hidden overflow-ellipsis"
          >
            {{ message.referral.body }}
          </span>
          <img
            v-if="message.referral.thumbnail_url"
            class="rounded-lg shadow-md mt-2"
            :src="message.referral.thumbnail_url"
            width="240"
            height="180"
            alt="Chat image"
          />
        </div>

        <!--          text message -->
        <div
          v-if="message.text"
          class="whitespace-pre-wrap text-sm rounded-lg shadow-md mb-1 p-3 w-full min-w-[100px]"
          :class="[
            message.user_id
              ? 'bg-indigo-500 text-white rounded-tl-none border-transparent'
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border-slate-200 dark:border-slate-700',
            message.reply_message
              ? 'rounded-t-none'
              : 'rounded-t-lg rounded-tl-none',
          ]"
          @click="(event) => openModal(event, message)"
        >
          {{ message.text }}
        </div>

        <div class="flex items-center flex-row">
          <img
            v-if="message.type === 'story' && !imageError"
            @error="handleImageError"
            class="rounded-lg shadow-md mb-1"
            :src="message?.url"
            width="240"
            height="180"
            alt="История недоступна"
          />
          <img v-if="message.type === 'story' && !imageError" @error="handleImageError"
               class="rounded-lg shadow-md mb-1" :src="message?.url" width="240" height="180" alt="История"/>
          <video v-else-if="imageError"
                 controls
                 class="rounded-lg shadow-md mb-1"
                 :src="message?.url"
                 width="240"
                 height="180">
            Ваш браузер не поддерживает элемент видео.
          </video>

          <!--          image message -->
          <img
            v-if="message.type === 'image' && message?.attachments[0]"
            class="rounded-lg shadow-md mb-1"
            :src="message?.attachments[0].path"
            width="240"
            height="180"
            alt="Chat image"
          />
          <!--          audio message -->
          <AudioPlayer
            v-else-if="message.type === 'audio'"
            :audioPath="message?.attachments[0].path"
          />
          <!--          video message -->
          <VideoPlayer
            v-else-if="message.type === 'video'"
            :videoPath="message?.attachments[0].path"
          />
          <!--          file message -->
          <div
            v-else-if="
              message.type === 'file' ||
              message.type === 'document' ||
              message.type === 'media'
            "
            class="flex text-sm rounded-lg border shadow-md mb-1 p-3 min-w-[100px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-file-check"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path
                d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
              />
              <path d="M9 15l2 2l4 -4" />
            </svg>
            <span
              v-if="message?.attachments[0] && message?.attachments[0].name"
            >
              {{ message?.attachments[0].name }}
            </span>
            <span v-else class="mr-2">Без имени</span>
          </div>
          <!--          end message types -->
          <div v-if="message.errors" class="m-4">
            <div class="flex items-center space-x-2">
              <!-- Start -->
              <Tooltip size="md" bg="light">
                <div class="ml-2 text-xs">{{ message.errors }}</div>
              </Tooltip>
            </div>
          </div>
          <MessageFileLink
            v-else-if="
              message?.attachments &&
              message?.attachments.length &&
              message?.attachments[0].path
            "
            :message="message"
          />
          <!-- Icon -->
          <button
            v-if="!message.errors"
            @click="(event) => setReplyMessage(message)"
            class="max-md:hidden absolute top-[calc(100%-70px)] p-[15px] right-[-50px] opacity-[0] group-hover:opacity-[0.1] focus:outline-none"
          >
            <!-- <svg class="w-3 h-3 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
            </svg> -->
            <img
              class="w-[20px]"
              src="../../images/reply-message.svg?url"
              alt=""
            />
          </button>
        </div>
        <MessageStatus :message="message" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMessangers } from "../../utils/messengers.js";
import { checkedMessageData } from "../../utils/modalVariables.js";
import { useAuthStore } from "../../stores/auth.store.js";
import AudioPlayer from "./AudioPlayer.vue";
import VideoPlayer from "./VideoPlayer.vue";
import { onMounted, ref } from "vue";
import MessageStatus from "./MessageStatus.vue";
import MessageFileLink from "./MessageFileLink.vue";
import Tooltip from "../../components/RedTooltip.vue";

const { activeChat, markAsRead, scrollToMessage, setReplyMessage } =
  useMessangers();
const authStore = useAuthStore();
const { message } = defineProps(["message"]);
const modalStyle = ref({
  position: "absolute",
  left: `0px`,
  top: `0px`,
});

// console.log(message);

const imageError = ref(false);
function handleImageError() {
  imageError.value = true;
}

function openModal(event, message) {
  calculateModalPosition(event);
  checkedMessageData.value = {
    message: message,
    style: modalStyle.value,
    stayOpen: true,
  };
}

let longPressTimer = null;

function startLongPress(message) {
  // Начинаем таймер на 1.5 секунды (1500 мс)
  longPressTimer = setTimeout(() => {
    handleLongPress(message);
  }, 1500);
}

function stopLongPress() {
  // Очищаем таймер, если пользователь отпустил нажатиe до 1.5 секунд
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
}

function handleLongPress(message) {
  // Действие, которое будет выполняться при долгом нажатии
  openModal(event, message);
}

function calculateModalPosition() {
  const buttonRect = event.target.getBoundingClientRect();
  const windowWidth = window.innerWidth;

  // Определите, насколько близко к правому краю кнопка
  const distanceToRight = windowWidth - (buttonRect.right + window.scrollX);

  const modalLeft = buttonRect.left + window.scrollX;
  modalStyle.value = {
    position: "absolute",
    left: `${modalLeft}px`,
    top: `${buttonRect.bottom + window.scrollY}px`,
  };
}
onMounted(() => {
  if (message.message_status_id === 3) {
    markAsRead(message);
  }
});
</script>
