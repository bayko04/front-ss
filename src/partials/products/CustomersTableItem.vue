<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="flex items-center">
        <label class="inline-flex">
          <span class="sr-only">Select</span>
          <input :id="product.id" class="form-checkbox" type="checkbox" :value="value" @change="check" :checked="checked" />
        </label>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="flex items-center relative">
        <button>
          <svg class="w-4 h-4 shrink-0 fill-current" :class="product.fav ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'" viewBox="0 0 16 16">
            <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
          </svg>
        </button>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="flex items-center">
        <div class="w-10 h-10 shrink-0 mr-2 sm:mr-3">
          <img class="rounded-full" :src="product.image" width="40" height="40" :alt="product.name" />
        </div>
        <div class="font-medium text-slate-800 dark:text-slate-100">{{product.tour_name}}</div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{product.description}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{product.price}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-center">{{product.currency}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left font-medium text-sky-500">{{product.tour_type}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left font-medium text-emerald-500">{{product.tour_status}}</div>
    </td>
  </tr>  
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'CustomerTableItem',
  props: ['product', 'value', 'selected'],
  setup(props, context) {
    const checked = false

    function check() {
      let updatedSelected = [...props.selected]
      if (this.checked) {
        updatedSelected.splice(updatedSelected.indexOf(props.value), 1)
      } else {
        updatedSelected.push(props.value)
      }
      context.emit('update:selected', updatedSelected)
    }

    return {
      check,
      checked,
    }
  },
}
</script>