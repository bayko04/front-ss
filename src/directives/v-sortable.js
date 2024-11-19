// src/directives/v-sortable.js
import Sortable from "sortablejs";

export default {
  mounted(el, binding) {
    const options = {
      group: binding.value.group || "shared",
      animation: 150,
      onEnd: (evt) => {
        const movedItem = binding.value.list.splice(evt.oldIndex, 1)[0];
        binding.value.list.splice(evt.newIndex, 0, movedItem);
      },
    };
    Sortable.create(el, options);
  },
};
