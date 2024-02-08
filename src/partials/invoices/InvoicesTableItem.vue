<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-sky-500">{{invoice.invoice}}</div>
    </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div class="font-medium text-sky-500">{{invoice.invoice}}</div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium" :class="totalColor(invoice.status)">{{invoice.total}}</div>
    </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div class="font-medium" :class="totalColor(invoice.status)">{{invoice.total}}</div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div class="font-medium" :class="totalColor(invoice.status)">{{invoice.total}}</div>
      </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5" :class="statusColor(invoice.status)">{{invoice.status}}</div>
    </td>    
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-slate-800 dark:text-slate-100">{{invoice.customer}}</div>
    </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div class="font-medium text-slate-800 dark:text-slate-100">{{invoice.customer}}</div>
      </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div>{{invoice.issueddate}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div>{{invoice.paiddate}}</div>
    </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div class="font-medium text-slate-800 dark:text-slate-100">{{invoice.customer}}</div>
      </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="space-x-1">
          <button class="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
                  title="Погашение">

              <router-link to="/portfolio/repay" class="btn bg-gray-300 hover:bg-gray-400 text-white">
                  <span class="sr-only">Repay</span>
                  <svg class="w-6 h-6 fill-current" viewBox="0 0 28 28">
                      <path fill="#4CAF50"
                            d="M5 16.6l-2.8-2.8c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l3.5 3.5c.2.2.4.3.7.3s.5-.1.7-.3l8.5-8.5c.4-.4.4-1 0-1.4s-1-.4-1.4 0L5 16.6z"/>
                  </svg>
              </router-link>
          </button>
        <button class="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full" title="Продление">

            <router-link to="/portfolio/prolongation" class="btn bg-gray-300 hover:bg-gray-400 text-white">
                <span class="sr-only">Prolongation</span>
                <svg class="w-6 h-6 fill-current" viewBox="0 0 28 28">
                    <path d="M12 7C6.48 7 2 11.48 2 17s4.48 10 10 10 10-4.48 10-10S17.52 7 12 7zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h2v5h-3V9h1z"/>
                </svg>
            </router-link>
        </button>
        <button class="text-rose-500 hover:text-rose-600 rounded-full" title="Частичное погашение">
            <router-link to="/portfolio/partrepayment" class="btn bg-gray-300 hover:bg-gray-400 text-white">
                <span class="sr-only">Part repayment</span>
                <svg class="w-6 h-6 fill-current" viewBox="0 0 28 28">
                    <circle cx="16" cy="16" r="12" stroke="yellow" stroke-width="2" fill="gold" />
                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="yellow" font-size="12">
                        1
                    </text>
                </svg>
            </router-link>
        </button>
          <button class="text-rose-500 hover:text-rose-600 rounded-full" title="Дополнительная выдача">
              <router-link to="/portfolio/addloan" class="btn bg-gray-300 hover:bg-gray-400 text-white">
                  <span class="sr-only">Additional Loan</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 32 32" stroke="blue">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                  </svg>
              </router-link>
          </button>
      </div>
    </td>
  </tr>  
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'InvoicesTableItem',
  props: ['invoice', 'value', 'selected'],
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

    const totalColor = (status) => {
      switch (status) {
        case 'Paid':
          return 'text-emerald-500'
        case 'Due':
          return 'text-amber-500'
        case 'Overdue':
          return 'text-rose-500'          
        default:
          return 'text-slate-500'
      }
    }    

    const statusColor = (status) => {
      switch (status) {
        case 'Paid':
          return 'bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400'
        case 'Due':
          return 'bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400'
        case 'Overdue':
          return 'bg-rose-100 dark:bg-rose-500/30 text-rose-500 dark:text-rose-400'          
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
      totalColor,
      statusColor,
      typeIcon,
    }
  },
}
</script>