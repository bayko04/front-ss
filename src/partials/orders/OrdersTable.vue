<template>
  <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
    <header class="px-5 py-4">
      <h2 class="font-semibold text-slate-800 dark:text-slate-100">Все операции <span class="text-slate-400 dark:text-slate-500 font-medium">442</span></h2>
    </header>
    <div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full dark:text-slate-300 divide-y divide-slate-200 dark:divide-slate-700">
          <!-- Table header -->
          <thead class="text-xs uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-slate-200 dark:border-slate-700">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">№ операции</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Дата</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Принято от</div>
              </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Основание</div>
                </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Сумма</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Статус</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Гражданство</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Тип операции</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <Order
            v-for="order in orders"
            :key="order.id"
            :order="order"
            v-model:selected="selected"
            :value="order.id"
          />
        </table>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import Order from './OrdersTableItem.vue'

import Image01 from '../../images/icon-01.svg?url'
import Image02 from '../../images/icon-02.svg?url'
import Image03 from '../../images/icon-03.svg?url'

export default {
  name: 'OrdersTable',
  components: {
    Order,
  },  
  props: ['selectedItems'],
  setup(props, { emit }) {

    const selectAll = ref(false)
    const selected = ref([])

    const checkAll = () => {
      selected.value = []
      if (!selectAll.value) {
        selected.value = orders.value.map(order => order.id)
      }
    }
    
    watch(selected, () => {
      selectAll.value = orders.value.length === selected.value.length ? true : false
      emit('change-selection', selected.value)
    })    
    
    const orders = ref([
      {
        id: '0',
        image: Image01,
        order: '#123567',
        date: '23/01/2024',
        customer: 'Айдан Абдылдаев',
        total: '73000',
        status: 'Выполнено',
        items: '1',
        location: '🇰🇬 Kyrgyzstan, (KGZ)',
        type: 'Приход',
        description: 'Погашение залога'
      },
      {
        id: '1',
        image: Image01,
        order: '#779912',
        date: '20/01/2024',
        customer: 'Мээрим Жумагулова',
        total: '28500',
        status: 'Выполнено',
        items: '2',
        location: '🇰🇬 Kyrgyzstan, (KG)',
        type: 'Приход',
        description: 'Частичное погашение %. Залог золото 34гр 585'
      },
      {
        id: '2',
        image: Image02,
        order: '#889924',
        date: '20/01/2024',
        customer: 'Алишер Хусенов',
        total: '34000',
        status: 'Выполнено',
        items: '2',
        location: '🇹🇯 Tajikistan (TJ)',
        type: 'Приход',
        description: 'Оплата % и штрафов'
      },
      {
        id: '3',
        image: Image01,
        order: '#897726',
        date: '19/01/2024',
        customer: 'Шерзод Юлдашев',
        total: '7300',
        status: 'В процессе',
        items: '1',
        location: '🇺🇿 Uzbekistan (UZ)',
        type: 'Приход',
        description: 'Погашение %. Залог Монитор LCD 32'
      },
      {
        id: '4',
        image: Image03,
        order: '#123567',
        date: '19/01/2024',
        customer: 'Бакыт Сагынбаев',
        total: '18000',
        status: 'Возврат',
        items: '1',
        location: '🇰🇬 Kyrgyzstan, (KG)',
        type: 'Приход',
        description: 'Возврат залога. Решил отказаться от залога, отменили операцию'
      },
      {
        id: '5',
        image: Image01,
        order: '#896644',
        date: '18/01/2024',
        customer: 'Айдар Токтобеков',
        total: '27900',
        status: 'Выполнено',
        items: '1',
        location: '🇰🇬 Kyrgyzstan, (KG)',
        type: 'Расход',
        description: 'Выдача денежных средств под залог Принтер струйный Epson L1800'
      },
      {
        id: '6',
        image: Image03,
        order: '#136988',
        date: '17/01/2024',
        customer: 'Александр Сухов',
        total: '32000',
        status: 'Выполнено',
        items: '1',
        location: '🇷🇺 Russia (RU)',
        type: 'Расход',
        description: 'Выдача под залог'
      },
      {
        id: '7',
        image: Image03,
        order: '#442206',
        date: '16/01/2024',
        customer: 'Эрназар Адбрахманов',
        total: '11000',
        status: 'Выполнено',
        items: '2',
        location: '🇰🇬 Kyrgyzstan, (KG)',
        type: 'Приход',
        description: 'Погашение %'
      },
      {
        id: '8',
        image: Image02,
        order: '#764321',
        date: '15/01/2024',
        customer: 'Гульжамал Асылбекова',
        total: '8000',
        status: 'В процессе',
        items: '2',
        location: '🇰🇬 Kyrgyzstan, (KG)',
        type: 'Расход',
        description: 'Выдача под залог'
      },
      {
        id: '9',
        image: Image01,
        order: '#908764',
        date: '15/01/2024',
        customer: 'Нурсултан Сарыбаев',
        total: '3500',
        status: 'Выполнено',
        items: '1',
        location: '🇰🇬 Kyrgyzstan, (KG)',
        type: 'Приход',
        description: 'Оплатил %'
      }
    ])

    return {
      selectAll,
      selected,
      checkAll,
      orders,
    }
  }
}
</script>