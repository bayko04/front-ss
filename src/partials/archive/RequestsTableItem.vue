<template>
    <tr>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-medium text-slate-800 dark:text-slate-100">{{customerRequest.chat?.customer?.name ?? customerRequest.chat?.name}}</div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5" :class="statusColor(customerRequest.chat_status?.name)">{{customerRequest.chat_status?.name}}</div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-medium" :class="totalColor(customerRequest.price)">{{customerRequest.price}}</div>
        </td>

        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div>{{customerRequest.created_at}}</div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-medium text-slate-800 dark:text-slate-100">{{customerRequest.comment}}</div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
            <div class="space-x-1">
                <button class="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full">
                    <span class="sr-only">Edit</span>
                    <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                    </svg>
                </button>
                <button class="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full">
                    <span class="sr-only">Download</span>
                    <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <path d="M16 20c.3 0 .5-.1.7-.3l5.7-5.7-1.4-1.4-4 4V8h-2v8.6l-4-4L9.6 14l5.7 5.7c.2.2.4.3.7.3zM9 22h14v2H9z" />
                    </svg>
                </button>
                <button class="text-rose-500 hover:text-rose-600 rounded-full">
                    <span class="sr-only">Delete</span>
                    <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                        <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                    </svg>
                </button>
            </div>
        </td>
    </tr>
</template>

<script setup>

const { customerRequest } = defineProps(['customerRequest']);

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

</script>