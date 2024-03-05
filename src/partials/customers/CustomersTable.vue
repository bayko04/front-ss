<template>
  <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
    <header class="px-5 py-4">
      <h2 class="font-semibold text-slate-800 dark:text-slate-100">All Customers <span class="text-slate-400 dark:text-slate-500 font-medium">248</span></h2>
    </header>
    <div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full dark:text-slate-300">
          <!-- Table header -->
          <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                <div class="flex items-center">
                  <label class="inline-flex">
                    <span class="sr-only">Select all</span>
                    <input class="form-checkbox" type="checkbox" v-model="selectAll" @click="checkAll" />
                  </label>
                </div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                <span class="sr-only">Favourite</span>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Наименование</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Описание</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Категория</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold">Дата добавления</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Статус</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Связанные продукты</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold">Отзывы и рейтинг</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <span class="sr-only">Menu</span>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
            <Customer
              v-for="customer in customers"
              :key="customer.id"
              :customer="customer"
              v-model:selected="selected"
              :value="customer.id"
            />
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import Customer from './CustomersTableItem.vue'

import Image01 from '../../images/11.jpg'
import Image02 from '../../images/11.jpg'
import Image03 from '../../images/11.jpg'
import Image04 from '../../images/11.jpg'
import Image05 from '../../images/11.jpg'
import Image06 from '../../images/11.jpg'
import Image07 from '../../images/11.jpg'
import Image08 from '../../images/11.jpg'
import Image09 from '../../images/11.jpg'
import Image10 from '../../images/11.jpg'

export default {
  name: 'CustomersTable',
  components: {
    Customer,
  },  
  props: ['selectedItems'],
  setup(props, { emit }) {

    const selectAll = ref(false)
    const selected = ref([])

    const checkAll = () => {
      selected.value = []
      if (!selectAll.value) {
        selected.value = customers.value.map(customer => customer.id)
      }
    }
    
    watch(selected, () => {
      selectAll.value = customers.value.length === selected.value.length ? true : false
      emit('change-selection', selected.value)
    })    
    
    const customers = ref([
      {
        id: '0',
        image: Image01,
        name: 'Фотоаппарат',
        email: 'фотоаппарат, в котором для записи изображения используется фотоэлектрический принцип. ',
        location: 'Техника',
        orders: '22.02.24',
        lastOrder: 'Активный',
        spent: '-',
        refunds: '5',
        fav: true
      },
      {
        id: '1',
        image: Image02,
        name: 'Монитор',
        email: 'UNIVIEW 18,5" MW3218-L ,TN, BLACK 1600x 900',
        location: 'Техника',
        orders: '22.02.24',
        lastOrder: 'Активный',
        spent: '-',
        refunds: '4',
        fav: false
      },
      {
        id: '2',
        image: Image03,
        name: 'Компьютер',
        email: 'Pantum P2207 black',
        location: 'Техника',
        orders: '22.02.24',
        lastOrder: 'Активный',
        spent: '-',
        refunds: '5',
        fav: true
      },
      {
        id: '3',
        image: Image04,
        name: 'Наушники',
        email: 'Наушники для телефона SAMSUNG',
        location: 'Техника',
        orders: '22.02.24',
        lastOrder: 'Активный',
        spent: '-',
        refunds: '5',
        fav: false
      },
      {
        id: '4',
        image: Image05,
        name: 'велосипед',
        email: 'Десна 2710 MD 27.5 мощный горный велосипед',
        location: 'Техника',
        orders: '22.02.24',
        lastOrder: 'Активный',
        spent: '-',
        refunds: '4',
        fav: true
      },
    ])

    return {
      selectAll,
      selected,
      checkAll,
      customers,
    }
  }
}
</script>