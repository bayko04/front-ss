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
        <div v-if="['open'].includes(recomendedTaskModal.status)"
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
        <div v-if="['open'].includes(recomendedTaskModal.status)">
            <div id="file-modal"
                 class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
                 role="dialog" aria-modal="true">
                <div ref="modalContent"
                     class="bg-white dark:bg-slate-800 rounded shadow-lg overflow-auto max-w-lg w-full max-h-full">
                    <!-- Create task modal -->
                    <div>
                        <div class="h-[62%]">
                            <div class="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
                                <div class="flex justify-between items-center">
                                    <div class="font-semibold text-slate-800 dark:text-slate-100">Предложить другое время
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
                                    <label class="block text-sm font-medium mb-1" for="name">Название задачи<span class="text-red-500">*</span></label>
                                    <input v-model="task.name" id="name" class="form-input w-full"
                                           type="text">
                                </div>

                                <div class="mb-2">
                                    <label class="block text-sm font-medium mb-1" for="date">Дата и время начала</label>
                                    <TaskDatepicker :value="task.due_date" v-model="task.due_date"/>
                                </div>

                              <div class="mb-2">
                                <label class="block text-sm font-medium mb-1" for="date">Дата и время окончания</label>
                                <TaskDatepicker :value="task.end_date" v-model="task.end_date"/>
                              </div>

                                <div class="mb-2">
                                    <h2 class="block text-sm font-medium mb-1">Тип задачи<span class="text-red-500">*</span></h2>
                                    <DropdownFull :value="task?.task_type_id ?? referencesStore.taskTypes[0].id" :options="referencesStore.taskTypes"
                                                  @update-value="(value) =>handleUpdateValue('task_type_id', value)"/>
                                </div>
                                <div class="mb-2">
                                    <h2 class="block text-sm font-medium mb-1">Исполнитель<span class="text-red-500">*</span></h2>
                                    <DropdownFull :value="task?.user_id" :options="usersStore.users"
                                                  @update-value="(value) =>handleUpdateValue('user_id', value)"/>
                                </div>

                                <div class="mb-2">
                                    <label class="block text-sm font-medium mb-1" for="description">Описание</label>
                                    <textarea v-model="task.description"
                                              class="form-textarea mt-2 w-full h-32"
                                              placeholder="Описание задачи"></textarea>
                                </div>

                                <div class="mb-2">
                                    <div class="flex flex-wrap justify-end space-x-2">
                                        <button
                                            class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                                            @click.stop="closeModal()">Отмена
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
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { recomendedTaskModal } from "../../utils/modalVariables.js"
import {onMounted, onUnmounted, ref, toRefs} from "vue";
import TaskDatepicker from "./TaskDatepicker.vue";
import { useReferencesStore } from "../../stores/references.store.js";
import { useUsersStore} from "../../stores/user.store.js";
import DropdownFull from "../../components/DropdownFull.vue";

const modalContent = ref(null);
const usersStore = useUsersStore()
const referencesStore = useReferencesStore()

const props = defineProps(['task', 'setRecommendedTask']);
const { task, setRecommendedTask } = toRefs(props);

const closeModal = function() {
  task.value = {}
  recomendedTaskModal.value.status = false
}

function handleUpdateValue(field, value) {
    task.value[field] = value
}

const send = async function() {
  setRecommendedTask.value(task.value)
  recomendedTaskModal.value.status = 'close'
}

const clickHandler = ({ target }) => {
  if (recomendedTaskModal.value?.stayOpen || modalContent.value?.contains(target)) {
    recomendedTaskModal.value.stayOpen = false;
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
