<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">Типы задач </h2>
      <div class="grid gap-5 md:grid-cols-1">
        <div>
          <div class="flex mb-4">
            <input v-model="form.name" class="form-input mr-2" type="text" placeholder="Введите новый статус ">
            <button @click="save()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Добавить</button>
          </div>
          <div class="table w-full">
            <div v-for="(item, index) in referencesStore.taskTypes" :key="index" class="table-row">
              <div v-if="!item.editing" class="table-cell py-1">{{ item.name }}</div>
              <td v-if="item.editing"><input type="text" v-model="item.name" ref="editInput" @click="focusInput" autofocus></td>
              <div class="table-cell py-1 px-2">
                <button v-if="!item.editing" @click="editItem(item)"
                        class="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600">
                  <svg class="w-4 h-4 fill-current text-slate-500 dark:text-slate-400 shrink-0"
                       viewBox="0 0 16 16">
                    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"/>
                  </svg>
                </button>
                <button v-if="item.editing" @click="saveChanges(item)" class="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600">
                  <svg class="w-4 h-4 text-green-500 shrink-0" viewBox="0 0 16 16" style="fill: green;">
                    <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
                  </svg>
                </button>
              </div>
              <div class="table-cell py-1 px-2">
                <input type="color" class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                       :value="item.color" title="Choose your color" @input="saveColor($event, item)">
              </div>
              <div class="table-cell py-1 px-2">
                <button v-if="!item.editing && referencesStore.taskTypes.length > 1" @click="deleteTaskType(item)"
                        class="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600">
                  <svg class="w-4 h-4 fill-current text-rose-500 shrink-0" viewBox="0 0 16 16">
                    <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/>
                  </svg>
                </button>
                <button v-if="item.editing" @click="cancelEdit(item)"
                        class="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600">
                  <svg class="w-4 h-4 fill-current text-red-600 shrink-0" viewBox="0 0 24 24">
                    <path stroke="#FF0000" stroke-width="2" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue';
import {useReferencesStore} from "../../stores/references.store.js";

const referencesStore = useReferencesStore()

let form = reactive({
  name: ''
});

function save() {
  referencesStore.setOrUpdateTaskType(form)
  form.name = ''
}

function saveChanges(item) {
  referencesStore.setOrUpdateTaskType(item)
  item.editing = false;
}

function deleteTaskType(item) {
  referencesStore.deleteTaskType(item.id)
}

function editItem(item) {
  item.editing = true;
  setTimeout(() => {
    focusInput();
  }, 0);
}

function focusInput() {
  // Программно устанавливаем фокус на текстовом поле
  const input = ref.editInput.value;
  input.focus();
}

function cancelEdit(item) {
  item.editing = false;
}

function saveColor(event, item) {
  item.color = event.target.value; // Добавляем выбранный цвет в объект "item"
  referencesStore.setOrUpdateTaskType(item);
  item.editing = false;
}

onMounted(() => {
  referencesStore.getTaskTypes()
})
</script>