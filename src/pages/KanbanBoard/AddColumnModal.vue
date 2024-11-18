<template lang="">
  <div
    class="bg-white w-[400px] rounded-[12px] p-[20px] shadow-xl border fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-center"
  >
    <div class="flex flex-col gap-[15px]">
      <div class="flex flex-col gap-[5px] max-h-[150px] overflow-auto">
        <div
          v-for="column in columns"
          class="w-full bg-[#1e293bed] text-white rounded-[12px] py-[8px] text-[14px] shadow-xl"
        >
          {{ column.title }}
        </div>
      </div>

      <!-- add button -->
      <div class="flex flex-col gap-[10px]">
        <input
          v-model="newColumnTitle"
          placeholder="Название колонки"
          type="text"
          class="rounded-[8px] h-[30px] border-[1px] w-full"
        />
        <div class="flex gap-[10px] justify-center">
          <button
            @click="handleAddColumn"
            class="border rounded-[12px] p-[5px_10px] text-[14px] hover:bg-[#1e293bed] hover:text-white transition-all"
          >
            Добавить колонку
          </button>
          <button
            @click="handleCloseModal"
            class="border rounded-[12px] p-[5px_10px] text-[14px] hover:bg-[#1e293bed] hover:text-white transition-all"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddColumn",

  data() {
    return {
      newColumnTitle: "",
    };
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleAddColumn() {
      if (this.newColumnTitle.trim()) {
        this.$emit("add-column", this.newColumnTitle);
        this.newColumnTitle = "";
      }
    },
    handleCloseModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
