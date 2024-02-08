<template>
  <tbody class="text-sm">
    <!-- Row -->
    <tr>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="flex items-center text-slate-800">
          <div class="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-full mr-2 sm:mr-3">
            <img class="ml-1" :src="order.image" width="20" height="20" :alt="order.order" />
          </div>
          <div class="font-medium text-sky-500">{{order.order}}</div>
        </div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div>{{order.date}}</div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="font-medium text-slate-800 dark:text-slate-100">{{order.customer}}</div>
      </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-medium text-slate-800 dark:text-slate-100">{{order.description}}</div>
        </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="text-left font-medium text-emerald-500">{{order.total}}</div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5" :class="statusColor(order.status)">{{order.status}}</div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="text-left">{{order.location}}</div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="flex items-center">
          <div v-html="typeIcon(order.type)"></div>
          <div>{{order.type}}</div>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'OrdersTableItem',
  props: ['order', 'value', 'selected'],
  setup(props, context) {
    const checked = computed(() => props.selected.includes(props.value))

    function check() {
      let updatedSelected = [...props.selected]
      if (this.checked) {
        updatedSelected.splice(updatedSelected.indexOf(props.value), 1)
      } else {
        updatedSelected.push(props.value)
      }
      context.emit('update:selected', updatedSelected)
    }

    const descriptionOpen = ref(false)

    const statusColor = (status) => {
      switch (status) {
        case 'Выполнено':
          return 'bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400'
        case 'Возврат':
          return 'bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400'
        default:
          return 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
      }
    }
    
    const typeIcon = (type) => {
      switch (type) {
        case 'Subscription':
          return (
            `<svg class="w-4 h-4 fill-current text-slate-400 dark:text-slate-500 shrink-0 mr-2" viewBox="0 0 16 16">
              <path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" />
            </svg>`            
          )
        default:
          return (
            `<svg class="w-4 h-4 fill-current text-slate-400 dark:text-slate-500 shrink-0 mr-2" viewBox="0 0 16 16">
              <path d="M11.4 0L10 1.4l2 2H8.4c-2.8 0-5 2.2-5 5V12l-2-2L0 11.4l3.7 3.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3l3.7-3.7L7.4 10l-2 2V8.4c0-1.7 1.3-3 3-3H12l-2 2 1.4 1.4 3.7-3.7c.4-.4.4-1 0-1.4L11.4 0z" />
            </svg>`
          )
      }
    }

    return {
      check,
      checked,
      statusColor,
      typeIcon,
      descriptionOpen,
    }
  },
}
</script>