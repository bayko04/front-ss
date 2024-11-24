<template lang="">
  <div
    class="bg-white w-[400px] rounded-[12px] p-[20px] shadow-xl border fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-center"
  >
    <!-- close modal -->
    <div
      class="absolute right-[-27px] top-[-23px] bg-white p-[4px] rounded-[50%] border"
    >
      <CloseModal class="" @click="handleCloseModal" />
    </div>
    <div class="flex flex-col gap-[15px]">
      <!-- Применяем ref для контейнера с колонками -->
      <div
        ref="columnsContainer"
        class="flex flex-col gap-[5px] max-h-[150px] overflow-auto"
      >
        <div
          v-for="column in columns"
          :key="column.id"
          class="w-full border border-[#1e293bed] text-black hover:bg-[#f4f4f4] border-[1px] rounded-[12px] py-[14px] text-[14px] shadow-xl relative"
        >
          {{ column.title }}
          <div
            @click="handleDeleteColumn(column.id)"
            class="absolute right-[10px] top-[50%] translate-y-[-50%] w-[20px] h-[20px] cursor-pointer"
          >
            <img
              class="w-full h-full object-cover"
              src="../../images/bin.svg?url"
              alt=""
            />
          </div>
        </div>
      </div>

      <div
        @click="showInput ? (showInput = false) : (showInput = true)"
        class="w-[30px] h-[30px] mx-[auto] cursor-pointer"
      >
        <img
          class="w-full h-full object-cover"
          src="../../images/plusIcon.svg?url"
          alt=""
        />
      </div>
      <!-- add button -->
      <div v-show="showInput" class="flex flex-col gap-[10px]">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseModal from "../../components/CloseModal.vue";
export default {
  name: "AddColumn",
  components: {
    CloseModal,
  },

  data() {
    return {
      newColumnTitle: "",
      showInput: false,
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
        this.$nextTick(() => {
          // После добавления новой колонки прокрутить вниз
          const container = this.$refs.columnsContainer;
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        });
      }
    },
    handleDeleteColumn(columnId) {
      this.$emit("delete-column", columnId);
    },
    handleCloseModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
