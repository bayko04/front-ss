<template>
  <!-- Modal backdrop -->
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-out duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="createTaskModal.status" class="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity" aria-hidden="true"></div>
  </transition>
  <!-- Modal dialog -->
  <transition
    enter-active-class="transition ease-in-out duration-200"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in-out duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div v-show="createTaskModal.status" id="file-modal" class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6" role="dialog" aria-modal="true">
      <div ref="modalContent" class="bg-white dark:bg-slate-800 rounded shadow-lg overflow-auto max-w-lg w-full max-h-full h-[70%]">
        <!-- Modal header -->
        <div class="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
          <div class="flex justify-between items-center">
            <div class="font-semibold text-slate-800 dark:text-slate-100">Добавление задачи</div>
            <button class="text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400" @click.stop="closeModal()">
              <div class="sr-only">Close</div>
              <svg class="w-4 h-4 fill-current">
                <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="h-[80%]">
          <!-- Modal content -->
          <div class="px-5 py-4 flex flex-col h-full">
            <div class="mt-4">
              <label class="block text-sm font-medium mb-1" for="name">Название задачи</label>
              <input v-model="taskStore.task.name" id="name" class="form-input w-full" type="text">
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium mb-1" for="date">Дата  и время задачи</label>
              <TaskDatepicker v-model="taskStore.task.due_date"/>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium mb-1" for="type">Тип задачи</label>
              <select id="type" class="form-select w-full" v-model="taskStore.task.task_type_id">
                <option v-for="taskType in referencesStore.taskTypes" :key="taskType.id" :value="taskType.id">{{ taskType.name }}</option>
              </select>
            </div>
            <div class="mt-4">
              <label class="block text-sm font-medium mb-1" for="user">Исполнитель</label>
              <select id="user" class="form-select w-full" v-model="taskStore.task.user_id">
                <option v-for="user in usersStore.users" :key="user.id" :value="user.id">{{ user.name }}</option>
              </select>
            </div>
            <div class="mt-4">
              <label class="block text-sm font-medium mb-1" for="description">Описание</label>
              <textarea v-model="taskStore.task.description" class="form-textarea mt-2 w-full h-32" placeholder="Описание задачи"></textarea>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="px-5 py-4 border-t border-slate-200 dark:border-slate-700 max-h-[300px] mt-4">
            <div class="flex flex-wrap justify-end space-x-2">
              <button class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" @click.stop="closeModal()">Отмена</button>
              <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="send()">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useMessangers } from "../../utils/messengers.js"
import { createTaskModal } from "../../utils/modalVariables.js"
import {onMounted, onUnmounted, ref} from "vue";
import TaskDatepicker from "./TaskDatepicker.vue";
import { useTaskStore } from "../../stores/task.store.js";
import { useReferencesStore } from "../../stores/references.store.js";
import { useUsersStore} from "../../stores/user.store.js";
import { useCustomerRequestStore } from "../../stores/customer-request.store.js";

const { activeChat } = await useMessangers()
const modalContent = ref(null);
const taskStore = useTaskStore()
const usersStore = useUsersStore()
const referencesStore = useReferencesStore()
const customerRequestStore = useCustomerRequestStore()

const closeModal = function() {
  taskStore.task = {}
  createTaskModal.value.status = false
}

const send = async function() {
  taskStore.task.customer_request_id = customerRequestStore.customerRequest.id
  await taskStore.createOrUpdateTask()
  closeModal()
}

const clickHandler = ({ target }) => {
  if (createTaskModal.value.stayOpen || modalContent.value.contains(target)) {
    createTaskModal.value.stayOpen = false;
    return;
  }

  closeModal();
};

onMounted(() => {
  document.addEventListener("click", clickHandler);
  referencesStore.getTaskTypes()
  usersStore.getUsers()
});

onUnmounted(() => {
  document.removeEventListener("click", clickHandler);
});
</script>
