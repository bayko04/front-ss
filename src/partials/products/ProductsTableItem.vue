<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap max-w-[100px]">
      <div class="flex items-center">
        <div class="font-medium text-slate-800 dark:text-slate-100">{{getCategoryName(product.category)}}</div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 max-w-[120px]">
      <div class="flex items-center">
        <div class="font-medium text-slate-800 w-full max-w-[300px] overflow-hidden dark:text-slate-100 whitespace-nowrap text-ellipsis">{{product.name}}</div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap  max-w-[80px]">
      <div class="text-left">{{product.price}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap max-w-[70px]">
      <div class="space-x-1">
        <button @click.stop="edit(product)" class="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full">
          <span class="sr-only">Edit</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
          </svg>
        </button>
        <button @click.stop="deleteProduct(product)" class="text-rose-500 hover:text-rose-600 rounded-full">
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
import {useProductStore} from "../../stores/product.store.js";

const {product} = defineProps(['product', 'value'])
const productStore = useProductStore()
function getCategoryName(category, categoryName = '') {
  if(categoryName) {
    categoryName = category.name + ', ' + categoryName;
  } else {
    categoryName = category.name
  }

  if (category.parent) {
    return getCategoryName(category.parent, categoryName);
  }

  return categoryName;
}

function getStatus(status) {
  if(status) {
    return 'Активный'
  }

  return 'Неактивный'
}

function edit(product)
{
  productStore.productModalStatus = 'edit'
  productStore.product = product
}

function deleteProduct(product)
{
  productStore.productModalStatus = 'delete'
  productStore.product = product
}

</script>
