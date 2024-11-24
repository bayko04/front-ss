<template lang="">
  <main class="h-[100vh]">
    <div class="container">
      <div class="flex justify-between">
        <h1
          class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold"
        >
          Kanban Board ✨
        </h1>

        <!-- add column -->
        <div class="">
          <button
            @click="isAddModal = true"
            class="bg-indigo-500 text-[16px] text-white p-[8px_15px] rounded-[12px]"
          >
            Добавить колонку
          </button>
        </div>
      </div>
      <!-- dashboard -->
      <div class="mt-[60px]">
        <!-- columns -->
        <div
          class="flex flex-nowrap gap-[12px] overflow-auto pb-[20px] custom-scrollbar items-start"
        >
          <KanbanColumn
            v-for="(column, index) in columns"
            :key="index"
            :cards="column.cards"
            :title="column.title"
          />
        </div>
      </div>
    </div>
    <AddColumnModal
      v-if="isAddModal"
      :columns="columns"
      @add-column="addNewColumn"
      @close-modal="isAddModal = false"
      @update-cards="updateColumnCards(index, $event)"
      @delete-column="removeColumnById"
    />
  </main>
</template>
<script>
import KanbanCard from "./KanbanCard.vue";
import KanbanColumn from "./KanbanColumn.vue";
import AddColumnModal from "./AddColumnModal.vue";

export default {
  components: {
    KanbanCard,
    KanbanColumn,
    AddColumnModal,
  },
  data() {
    return {
      columns: [
        {
          id: 1,
          title: "To Do",
          cards: [
            {
              cardText:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam pariatur sint minima inventore porro repudiandae ab nisi eligendi ipsa architecto, facere voluptates suscipit beatae quas doloremque eos facilis atque soluta.",
            },
            {
              cardText:
                "Lorem ipsum dolor, sit amet consectetu sint minima inventore porro repudiandae ab nisi eligendi ipsa architecto, facere voluptates suscipit beatae quas doloremque eos facilis atque soluta.",
            },
            {
              cardText: "Lorem ipsum dolor, sit amet consectetur adipisita.",
            },
          ],
        },
        {
          id: 2,
          title: "In Progress",
          cards: [
            {
              cardText:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam",
            },
          ],
        },
        {
          id: 3,
          title: "Review",
          cards: [
            {
              cardText:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam pariatur sint minima inventore porro repudiandae ab nisi eligendi ipsa archite",
            },
            {
              cardText:
                "Lorem ipsum dolor, sit aa inventore porro repudiandae ab nisi eligendi ipsa archite",
            },
            {
              cardText:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam pariatur sint minima inventore porro repudiandae ab nisi eligendi ipsa archite",
            },
          ],
        },
        {
          id: 4,
          title: "Done",
          cards: [
            {
              cardText:
                "Lorem ipisicing elit. Quisquam pariatur sint minima inventore porro repudiandae ab nisi eligendi ipsa archite",
              cardText:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam pariatur sint minima inventore porro repudiandae ab nisi eligendi ipsa archite",
              cardText:
                "Lorem ipsum dolor, sit amet cae ab nisi eligendi ipsa archite",
            },
          ],
        },
        {
          id: 5,
          title: "Backlog",
          cards: [],
        },
        {
          id: 6,
          title: "On Hold",
          cards: [],
        },
      ],

      isAddModal: false,
    };
  },
  methods: {
    addNewColumn(newTitle) {
      const newColumn = {
        id: this.columns.length + 1,
        title: newTitle,
        cards: [],
      };
      this.columns.push(newColumn);
    },
    updateColumnCards(index, updatedCards) {
      // Обновляем конкретную колонку, используя индекс
      this.columns[index].cards = updatedCards;
    },
    removeColumnById(columnId) {
      const index = this.columns.findIndex((column) => column.id === columnId);

      if (index !== -1) {
        this.columns.splice(index, 1);
      }
    },
  },
};
</script>
<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 12px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 3px solid #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
