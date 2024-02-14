<template>
  <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
    <header class="px-5 py-4">
      <h2 class="font-semibold text-slate-800 dark:text-slate-100">Залоговые билеты <span class="text-slate-400 dark:text-slate-500 font-medium">67</span></h2>
    </header>
    <div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full dark:text-slate-300">
          <!-- Table header -->
          <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
            <tr>

              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">№</div>
              </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">№ залогового билета</div>
                </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Сумма кредита</div>
              </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Ставка %</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Сумма %</div>
                </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Статус</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Клиент</div>
              </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Залоговое имущество</div>
                </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Дата выдачи</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Дата окончания</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Действия</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
            <Invoice
              v-for="invoice in invoices"
              :key="invoice.id"
              :invoice="invoice"
              v-model:selected="selected"
              :value="invoice.id"
            />
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import Invoice from './InvoicesTableItem.vue'

export default {
  name: 'InvoicesTable',
  components: {
    Invoice,
  },  
  props: ['selectedItems'],
  setup(props, { emit }) {

    const selectAll = ref(false)
    const selected = ref([])

    const checkAll = () => {
      selected.value = []
      if (!selectAll.value) {
        selected.value = invoices.value.map(invoice => invoice.id)
      }
    }
    
    watch(selected, () => {
      selectAll.value = invoices.value.length === selected.value.length ? true : false
      emit('change-selection', selected.value)
    })    
    
    const invoices = ref([
      {
        id: '0',
        invoice: '567',
        number: '7493720/3',
        total: '75,000',
        percent: '0.25',
        sum: '5625',
        status: 'Просрочен',
        customer: 'Айдан Абдылдаев',
        collateral: 'Часы золото 585',
        issueddate: '22/07/2023',
        paiddate: '22/07/2023',
        type: 'Subscription',
      },
      {
        id: '1',
        invoice: '912',
        number: '123139/2',
        total: '128,000',
        percent: '0.30',
        sum: '11520',
        status: 'Активный',
        customer: 'Мээрим Жумагулова',
        collateral: 'Авто',
        issueddate: '19/07/2023',
        paiddate: '20/08/2023',
        type: 'Subscription',
      },
      {
        id: '2',
        invoice: '924',
        number: '1238499/2',
        total: '23,000',
        percent: '0.25',
        sum: '1725',
        status: 'Активный',
        customer: 'Алишер Хусенов',
        collateral: 'Телефон',
        issueddate: '17/07/2023',
        paiddate: '19/08/2023',
        type: 'One-time',
      },
      {
        id: '3',
        invoice: '726',
        number: '908139/7',
        total: '35,000',
        percent: '0.35',
        sum: '3675',
        status: 'Продажа',
        customer: 'Шерзод Юлдашев',
        collateral: 'Монитор',
        issueddate: '04/07/2023',
        paiddate: '05/08/2023',
        type: 'Subscription',
      },
      {
        id: '4',
        invoice: '567',
        number: '568747139/3',
        total: '129,000',
        percent: '0.25',
        sum: '9675',
        status: 'Продажа',
        customer: 'Бакыт Сагынбаев',
        collateral: 'Авто',
        issueddate: '04/07/2023',
        paiddate: '05/08/2023',
        type: 'Subscription',
      },
      {
        id: '5',
        invoice: '644',
        number: '5804139/2',
        total: '15,000',
        percent: '0.20',
        sum: '900',
        status: 'Активный',
        customer: 'Айдар Токтобеков',
        collateral: 'Телефон',
        issueddate: '04/07/2023',
        paiddate: '05/08/2023',
        type: 'One-time',
      },
      {
        id: '6',
        invoice: '988',
        number: '65758139/4',
        total: '65,000',
        percent: '0.23',
        sum: '3675',
        status: 'Не активный',
        customer: 'Александр Сухов',
        collateral: 'Золото 12гр 585',
        issueddate: '01/07/2023',
        paiddate: '01/08/2023',
        type: 'One-time',
      },
      {
        id: '7',
        invoice: '206',
        number: '48373/3',
        total: '42,500',
        percent: '0.28',
        sum: '3570',
        status: 'Просрочен',
        customer: 'Эрназар Адбрахманов',
        collateral: 'Компьютер',
        issueddate: '22/06/2023',
        paiddate: '23/07/2023',
        type: 'Subscription',
      },
      {
        id: '8',
        invoice: '321',
        number: '123139/2',
        total: '12,000',
        percent: '0.20',
        sum: '720',
        status: 'Активный',
        customer: 'Гульжамал Асылбекова',
        collateral: 'Монитор',
        issueddate: '21/06/2023',
        paiddate: '29/07/2023',
        type: 'One-time',
      },
      {
        id: '9',
        invoice: '764',
        number: '897139/4',
        total: '111,500',
        percent: '0.35',
        sum: '11707',
        status: 'Продажа',
        customer: 'Нурсултан Сарыбаев',
        collateral: 'Авто',
        issueddate: '17/06/2023',
        paiddate: '18/07/2023',
        type: 'Subscription',
      }
    ])

    return {
      selectAll,
      selected,
      checkAll,
      invoices,
    }
  }
}
</script>