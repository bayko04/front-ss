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
        <div v-if="['info', 'create-update', 'completing', 'deleting'].includes(createTaskModal.status)"
             class="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity" aria-hidden="true"></div>
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
        <div v-if="['info', 'create-update', 'completing', 'deleting'].includes(createTaskModal.status)">

            <div id="file-modal"
                 class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
                 role="dialog" aria-modal="true">
                <div ref="modalContent"
                     class="bg-white dark:bg-slate-800 rounded shadow-lg overflow-auto max-w-lg w-full max-h-full">
                    <!-- Create task modal -->
                    <div v-show="createTaskModal.status === 'create-update'">
                        <div class="h-[62%]">
                            <div class="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
                                <div class="flex justify-between items-center">
                                    <div class="font-semibold text-slate-800 dark:text-slate-100"><span
                                        v-if="taskStore.task.id">Редактирование</span><span
                                        v-else>Добавить</span> задачу
                                    </div>
                                    <button
                                        class="text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400"
                                        @click.stop="closeModal()">
                                        <div class="sr-only">Close</div>
                                        <svg class="w-4 h-4 fill-current">
                                            <path
                                                d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <!-- Modal content -->
                            <div class="px-5 py-4 flex flex-col h-full">
                                <div class="mb-2">
                                    <label class="block text-sm font-medium mb-1" for="name">Название задачи</label>
                                    <input v-model="taskStore.task.name" id="name" class="form-input w-full"
                                           type="text">
                                </div>

                                <div class="mb-2">
                                    <label class="block text-sm font-medium mb-1" for="date">Дата и время задачи</label>
                                    <TaskDatepicker :value="taskStore.task.due_date" v-model="taskStore.task.due_date"/>
                                </div>

                                <div class="mb-2">
                                    <h2 class="block text-sm font-medium mb-1">Тип задачи</h2>
                                    <DropdownFull :options="referencesStore.taskTypes"
                                                  @update-value="(value) =>handleUpdateValue('task_type_id', value)"/>
                                </div>
                                <div class="mb-2">
                                    <h2 class="block text-sm font-medium mb-1">Исполнитель</h2>
                                    <DropdownFull :options="usersStore.users"
                                                  @update-value="(value) =>handleUpdateValue('user_id', value)"/>
                                </div>

                                <div class="mb-2">
                                    <label class="block text-sm font-medium mb-1" for="description">Описание</label>
                                    <textarea v-model="taskStore.task.description"
                                              class="form-textarea mt-2 w-full h-32"
                                              placeholder="Описание задачи"></textarea>
                                </div>
                                <div v-if="taskStore.task.is_completed">
                                    <div class="mb-2">
                                        <label class="block text-sm font-medium mb-1" for="result">Результат</label>
                                        <textarea v-model="taskStore.task.result" class="form-textarea mt-2 w-full h-32"
                                                  placeholder="Результат выполнения задачи"></textarea>
                                    </div>
                                    <label class="block text-sm font-medium mb-1" for="date">Дата и время завершения
                                        задачи</label>
                                    <TaskDatepicker :value="taskStore.task.completed_at"
                                                    v-model="taskStore.task.completed_at"/>
                                </div>
                                <div class="mb-2">
                                    <div class="flex flex-wrap justify-end space-x-2">
                                        <button
                                            class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                                            @click.stop="cancel()">Отмена
                                        </button>
                                        <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                                                @click="send()">
                                            Сохранить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Task info modal -->
                    <div v-show="createTaskModal.status === 'info'">
                        <div class="h-[55%]">
                            <div class="m-1.5">
                                <div class="p-5 space-y-4">
                                    <div class="flex">
                                        <!-- Icon -->
                                        <div class="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-500/30 mr-2">
                                            <svg class="w-4 h-4 fill-current text-indigo-500" viewBox="0 0 16 16">
                                                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
                                            </svg>
                                        </div>
                                        <!-- Modal header -->
                                        <div class="mb-1 flex-grow">
                                            <div class="text-lg font-semibold text-slate-800 dark:text-slate-100">
                                                {{ taskStore.task.name }}
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Modal content -->
                                    <div class="text-sm mb-10 space-y-4">
                                        <template v-if="taskStore.task">
                                            <p class="mb-2"><strong>Описание:</strong> {{ taskStore.task.description }}</p>
                                            <p class="mb-2"><strong>Автор:</strong> {{ taskStore.task.author?.name }}</p>
                                            <p class="mb-2"><strong>Исполнитель:</strong> {{ taskStore.task.user?.name }}</p>
                                            <p class="mb-2"><strong>Дата и время создания:</strong> {{ taskStore.task.created_at }}</p>
                                            <p class="mb-2"><strong>Дата и время выполнения:</strong> {{ taskStore.task.due_date }}</p>
                                            <p class="mb-2"><strong>Тип задачи:</strong> {{ taskStore.task.task_type?.name }}</p>
                                            <p class="mb-2"><strong>Статус:</strong> {{ taskStore.task.is_completed ? 'Завершен' : 'Незавершен' }}</p>
                                        </template>
                                        <template v-if="taskStore.task.is_completed">
                                            <div class="mb-2">
                                                <strong>Результат:</strong>
                                                <div class="border border-gray-300 rounded p-2">{{ taskStore.task.result }}</div>
                                            </div>
                                            <div v-if="taskStore.task.completed_at" class="mb-2">
                                                <strong>Дата и время завершения:</strong>
                                                <div class="border border-gray-300 rounded p-2">{{ taskStore.task.completed_at }}</div>
                                            </div>
                                        </template>
                                    </div>

                                    <!-- Modal footer -->
                                    <div class="flex flex-wrap justify-end space-x-2">
                                        <button @click.stop="closeModal()" class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">Закрыть</button>
                                        <button @click.stop="editTask()" class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">Редактировать</button>
                                        <button v-if="!taskStore.task.is_completed" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click.stop="completingTask()">Завершить задачу</button>
                                        <button class="btn-sm bg-red-500 hover:bg-red-600 text-white" @click.stop="deletingTask()">Удалить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Task completing modal -->
                    <div v-show="createTaskModal.status === 'completing'">
                        <div class="h-[50%]">
                            <div class="m-1.5">
                                <div class="px-5 py-4">
                                    <div class="text-sm">
                                        <div class="font-medium text-slate-800 dark:text-slate-100 mb-3">Ураа,
                                            результат! 🙌
                                        </div>
                                    </div>
                                    <div class="mt-4">
                                            <textarea v-model="taskStore.task.result"
                                                      class="form-textarea mt-2 w-full h-32"
                                                      placeholder="Результат выполнения задачи"></textarea>
                                    </div>
                                    <label class="block text-sm font-medium mb-1" for="date">Дата и время завершения
                                        задачи</label>
                                    <TaskDatepicker :value="taskStore.task.completed_at"
                                                    v-model="taskStore.task.completed_at"/>
                                </div>
                                <!-- Modal footer -->
                                <div class="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
                                    <div class="flex flex-wrap justify-end space-x-2">
                                        <button @click="cancel()"
                                                class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">
                                            Отмена
                                        </button>
                                        <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                                                @click="complet()">
                                            Сохранить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Task deleting modal -->
                    <div v-show="createTaskModal.status === 'deleting'">
                        <div class="h-[50%]">
                            <div class="p-5 flex space-x-4">
                                <!-- Icon -->
                                <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100 dark:bg-rose-500/30">
                                    <svg class="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
                                        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
                                    </svg>
                                </div>
                                <div>
                                    <!-- Modal header -->
                                    <div class="mb-2">
                                        <div class="text-lg font-semibold text-slate-800 dark:text-slate-100">
                                            Удалить задачу?</div>
                                    </div>
                                    <!-- Modal content -->
                                    <div class="text-sm mb-10">
                                        <div class="space-y-2">
                                            <p>Данные этой задачи будут удалены безвозвратно.</p>
                                        </div>
                                    </div>
                                    <!-- Modal footer -->
                                    <div class="flex flex-wrap justify-end space-x-2">
                                        <button @click="cancel()" class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">Отмена</button>
                                        <button @click.stop="deleteTask()" class="btn-sm bg-rose-500 hover:bg-rose-600 text-white">Да, удалить</button>
                                    </div>
                                </div>
                            </div>

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
import DropdownFull from "../../components/DropdownFull.vue";

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

function handleUpdateValue(field, value) {
    taskStore.task[field] = value
}

const cancel = function() {
  if(taskStore.task.id) {
    createTaskModal.value.status = 'info'
  } else {
    closeModal()
  }
}

const editTask = function() {
  createTaskModal.value.status = 'create-update'
}

const completingTask = function() {
  createTaskModal.value.status = 'completing'
}

const complet = async function() {
  taskStore.task.is_completed = true
  await taskStore.createOrUpdateTask()
  createTaskModal.value.status = 'info'
}

const deletingTask = function() {
  createTaskModal.value.status = 'deleting'
}

const deleteTask = async function() {
  await taskStore.deleteTask()
  createTaskModal.value.status = false
}

const send = async function() {
  if (!taskStore.task.id && customerRequestStore.customerRequest?.id) {
    taskStore.task.customer_request_id = customerRequestStore.customerRequest.id
  }
  await taskStore.createOrUpdateTask()
  createTaskModal.value.status = 'info'
}

const clickHandler = ({ target }) => {
  if (createTaskModal.value?.stayOpen || modalContent.value?.contains(target)) {
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
