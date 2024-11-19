<template lang="">
  <div class="bg-white rounded-[12px] cursor-grab">
    <h5 class="text-sm text-[14px] rounded-[12px] border p-[8px_12px_4px]">
      {{ cardText }}
    </h5>
  </div>
</template>
<script>
export default {
  props: {
    cardText: {
      type: String,
      required: true,
    },
  },
};
</script>
