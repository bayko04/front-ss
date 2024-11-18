<template>
  <div
    class="bg-[#1e293bed] basis-[calc(25%-12px)] rounded-[12px] p-[0_10px] shrink-0"
  >
    <h3 class="font-semibold text-[16px] py-[15px] text-white">{{ title }}</h3>

    <!-- cards -->
    <div
      v-sortable="{ list: localCards, group: 'kanban' }"
      class="flex flex-col gap-[10px]"
    >
      <div v-for="(card, index) in localCards" :key="index">
        <KanbanCard :cardText="card.cardText" />
      </div>
    </div>

    <!-- column footer -->
    <div class="py-[15px]">
      <!-- add card -->
      <div class="text-white">
        <button class="text-[14px]" @click="isAddModal = true">
          Добавить карточку
        </button>
      </div>
    </div>

    <AddCardModal
      v-if="isAddModal"
      @close-modal="isAddModal = false"
      @add-card="addNewCard"
    />
  </div>
</template>

<script>
import KanbanCard from "./KanbanCard.vue";
import vSortable from "../../directives/v-sortable";
import AddCardModal from "./AddCardModal.vue";

export default {
  components: {
    KanbanCard,
    AddCardModal,
  },
  directives: {
    sortable: vSortable,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    cards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localCards: [...this.cards],
      isAddModal: false,
    };
  },
  watch: {
    cards: {
      handler(newCards) {
        this.localCards = [...newCards];
      },
      deep: true,
    },
  },
  methods: {
    // onDragEnd() {
    //   this.$emit("update-cards", this.localCards);
    // },
    addNewCard(newCardText) {
      // Добавление новой карточки
      this.localCards.push({ cardText: newCardText });
      this.$emit("update-cards", this.localCards);
      // Закрываем модальное окно после добавления карточки
      this.isAddModal = false;
    },
  },
};
</script>
