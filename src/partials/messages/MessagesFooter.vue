<template>
  <div class="sticky bottom-0">
    <div
      v-show="
        activeAccount &&
        activeChat &&
        (!activeAccount.ai_active ||
          activeChat.latest_customer_request.user_handle)
      "
    >
      <!-- wrapper -->
      <div class="">
        <div
          class="flex items-center gap-[10px] justify-center h-[60px] mb-[20px] max-md:px-[10px]"
        >
          <div
            v-show="activeChat"
            class="flex w-[85%] relative rounded-[10px] items-center justify-between bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-[10px] sm:px-6"
            :style="{ height: blockHeight }"
          >
            <div class="absolute top-[-60px] left-0 w-full">
              <div
                v-if="activeChat?.message?.reply_message"
                class="flex items-center justify-between bg-[#87cefabf] text-black rounded-lg rounded-b-none dark:bg-slate-800 border-l-[5px] border-gray-300 dark:border-blue-700 px-4 sm:px-6 md:px-5 h-16"
              >
                <span
                  v-if="activeChat?.message?.reply_message?.text"
                  class="overflow-hidden whitespace-no-wrap overflow-ellipsis line-clamp-1 max-w-[calc(100%-1.25rem)]"
                >
                  {{ activeChat?.message?.reply_message?.text }}
                </span>
                <span
                  v-else
                  class="overflow-hidden whitespace-no-wrap overflow-ellipsis line-clamp-1 max-w-[calc(100%-1.25rem)]"
                >
                  <span
                    v-if="
                      activeChat?.message?.reply_message?.attachments[0] &&
                      activeChat?.message?.reply_message?.attachments[0].name
                    "
                  >
                    {{
                      activeChat?.message?.reply_message?.attachments[0].name
                    }}
                  </span>
                  <span v-else> Без названия </span>
                </span>
                <button class="text-red-500" @click="removeReplyMessage()">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-x"
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
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="grow flex items-center mt-1 py-[5px]">
              <div
                class="mr-3 mb-1"
                v-if="!activeChat?.message.text && !recording"
              >
                <AddAttachments />
              </div>
              <div
                v-if="/* !recording && */ activeChat?.message"
                class="grow mr-3"
              >
                <textarea
                  placeholder="Message"
                  v-model="activeChat.message.text"
                  ref="textarea"
                  @input="handleInput"
                  @keydown="handleKeyDown"
                  id="message-input"
                  :style="{ height: textareaHeight }"
                  class="w-full resize-none rounded-[10px] bg-slate-100 dark:bg-slate-800 overflow-hidden border-transparent dark:border-transparent focus:border-transparent focus:ring-0 focus:outline-none placeholder-slate-500"
                  rows="1"
                ></textarea>
              </div>
              <div class="grow mr-3 hidden" v-show="recording">
                <div
                  id="audio"
                  class="w-full bg-slate-100 dark:bg-slate-800 border-transparent dark:border-transparent"
                ></div>
              </div>
              <button
                v-if="!recording"
                @click="openEmoji"
                class="shrink-0 text-slate-400 dark:text-slate-500 hover:text-slate-500 mr-3 mb-1 dark:hover:text-slate-400 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-mood-smile"
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
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 10l.01 0" />
                  <path d="M15 10l.01 0" />
                  <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
                </svg>
              </button>
              <button
                v-if="recording"
                @click="handleCancelRecording"
                class="shrink-0 text-slate-400 dark:text-slate-500 hover:text-slate-500 mr-3 mb-1 dark:hover:text-slate-400 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-trash w-6 h-6"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ff2825"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </div>
          </div>
          <!-- voice -->
          <div
            class="h-[60px] flex-[0_0_60px] bg-[white] rounded-[50%] text-center hover:bg-[#6366F1] cursor-pointer transition ease duration-300 group"
          >
            <button
              v-if="recording"
              @click="handleStopRecording"
              class="shadow-none h-[60px] w-full shrink-0 text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-player-stop w-full h-6 group-hover:stroke-[white]"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ff2825"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M5 5m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"
                />
              </svg>
            </button>
            <button
              v-else-if="
                !recording &&
                !activeChat?.message.text &&
                activeAccount?.messenger_id !== 3
              "
              @click="handleStartRecording"
              class="shadow-none h-[60px] w-full shrink-0 text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-microphone w-full h-6 group-hover:stroke-[white]"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z"
                />
                <path d="M5 10a7 7 0 0 0 14 0" />
                <path d="M8 21l8 0" />
                <path d="M12 17l0 4" />
              </svg>
            </button>
            <button
              v-else-if="
                !recording &&
                !activeChat?.message.text &&
                activeAccount?.messenger_id === 3
              "
              @click="handleStartRecording"
              class="shadow-none h-[60px] w-full shrink-0 text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-send-2 w-full group-hover:stroke-[white]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="rgb(99 102 241)"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z"
                />
                <path d="M6.5 12h14.5" />
              </svg>
            </button>
            <button
              v-if="!recording && activeChat?.message.text"
              @click="send()"
              type="submit"
              class="shadow-none h-[60px] w-full btn text-white whitespace-nowrap h-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-send-2 w-full group-hover:stroke-[white]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="rgb(99 102 241)"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z"
                />
                <path d="M6.5 12h14.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex items-center justify-between bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 sm:px-6 md:px-5"
      v-show="
        activeAccount &&
        activeChat &&
        activeAccount.ai_active &&
        !activeChat.latest_customer_request.user_handle
      "
    >
      <ul class="mb-4 mt-4 text-center">
        <p class="text-lg font-bold text-red-600 dark:text-red-400">
          Сейчас отвечает нейросеть. Чтобы начать отвечать, переключите на
          менеджера.
        </p>
        <div class="flex justify-center mt-4">
          <div
            @click="handleUser()"
            class="flex items-center justify-center cursor-pointer bg-blue-600 text-white py-1.5 px-2 rounded-lg hover:bg-blue-700 transition duration-300 w-48"
          >
            <img
              :src="managerIcon"
              alt="Image description"
              class="w-4 h-4 filter invert"
            />
            <span class="text-sm font-medium ml-2">Переключить</span>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import AddAttachments from "./AddAttachments.vue";
import { useMessangers } from "../../utils/messengers.js";
import { emojiModal } from "../../utils/modalVariables.js";
import { onMounted, ref } from "vue";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.js";
import managerIcon from "../../images/chat/manager.svg?url";
import { useCustomerRequestStore } from "../../stores/customer-request.store.js";

const {
  activeChat,
  saveMessage,
  removeReplyMessage,
  sendFiles,
  activeAccount,
} = await useMessangers();
const textareaHeight = ref("auto");
const textarea = ref(null);
const blockHeight = ref("auto");
const recording = ref(false);
const wavesurfer = ref(null);
const record = ref(null);
const isRecordingCancelled = ref(false);

const customerRequestStore = useCustomerRequestStore();

onMounted(() => {
  wavesurfer.value = WaveSurfer.create({
    container: "#audio",
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
  });

  record.value = wavesurfer.value.registerPlugin(
    RecordPlugin.create({ mimeType: "audio/webm;codecs=opus" })
  );

  record.value.on("record-end", (blob) => {
    if (!isRecordingCancelled.value) {
      activeChat.value.message.attachments = [blobToFile(blob)];
      sendFiles(activeChat.value.message);
    }
  });
});

async function handleUser(event) {
  await customerRequestStore.handleUser(
    activeChat.value.latest_customer_request.id
  );
  activeChat.value.latest_customer_request.user_handle = true;
}

const blobToFile = function (blob) {
  return new File(
    [blob],
    "audio." + (blob.type.split(";")[0].split("/")[1] || "webm"),
    {
      type: blob.type,
    }
  );
};

// start recording.
const handleStartRecording = () => {
  isRecordingCancelled.value = false;
  recording.value = true;
  record.value.startRecording();
};

// start recording.
const handleStopRecording = () => {
  recording.value = false;
  record.value.stopRecording();
};

// stop recording without sending.
const handleCancelRecording = () => {
  recording.value = false;
  isRecordingCancelled.value = true;
  if (record.value) {
    record.value.stopRecording();
    wavesurfer.value.destroy();
  }
};

const send = function () {
  saveMessage();
  textareaHeight.value = "auto";
  blockHeight.value = "auto";
};
const handleInput = (event) => {
  adjustTextareaHeight();
  adjustBlockHeight();
};

const adjustTextareaHeight = () => {
  textareaHeight.value = "auto";
  textareaHeight.value = `${textarea.value.scrollHeight}px`;
};

const adjustBlockHeight = () => {
  blockHeight.value = "auto";
  blockHeight.value = `${blockHeight.value.scrollHeight}px`;
};

const handleKeyDown = (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    send();
  }
};

const openEmoji = function () {
  emojiModal.value.stayOpen = true;
  emojiModal.value.status = true;
};
</script>
