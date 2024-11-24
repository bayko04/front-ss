<template lang="">
  <div
    class="bg-white w-[400px] rounded-[12px] p-[20px] shadow-xl border fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-center"
  >
    <div
      class="absolute right-[-27px] top-[-23px] bg-white p-[4px] rounded-[50%] border"
    >
      <CloseModal class="" @click="handleCloseModal" />
    </div>
    <!-- add button -->
    <div class="flex flex-col gap-[10px]">
      <textarea
        v-model="newCardText"
        placeholder="Название карточку"
        type="text"
        class="rounded-[8px] border-[1px] w-full h-[100px]"
      ></textarea>
      <div class="flex gap-[10px]">
        <button
          @click="handleAddCard"
          class="border rounded-[12px] p-[5px_10px] text-[14px] hover:bg-[#1e293bed] hover:text-white transition-all"
        >
          Добавить карточку
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import CloseModal from "../../components/CloseModal.vue";

export default {
  name: "AddCardModal",
  components: {
    CloseModal,
  },

  data() {
    return {
      newCardText: "",
    };
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleAddCard() {
      if (this.newCardText.trim()) {
        this.$emit("add-card", this.newCardText);
        this.newCardText = "";
      }
    },
    handleCloseModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
