<template>
  <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
    <header class="px-5 py-4">
      <h2 class="font-semibold text-slate-800 dark:text-slate-100">Все продукты <span class="text-slate-400 dark:text-slate-500 font-medium">{{productStore.products.total}}</span></h2>
    </header>
    <div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full dark:text-slate-300">
          <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap max-w-[100px]">
                <div class="font-semibold text-left">Категория</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap max-w-[100px]">
                <div class="font-semibold text-left">Наименование</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap max-w-[80px]">
                <div class="font-semibold text-left">Стоимость</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap max-w-[70px]">
                <div class="font-semibold text-left">Действия</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
            <ProductsTableItem
              v-for="product in productStore.products.data"
              :key="product.id"
              :product="product"
            />
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script setup>
import ProductsTableItem from './ProductsTableItem.vue'
import { useProductStore } from '../../stores/product.store.js';
const productStore = useProductStore()

</script>
