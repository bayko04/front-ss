<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar/>

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900">

      <!-- Site header -->
      <Header/>

      <main class="grow">
        <div class="relative flex">

          <!-- Profile body -->
          <ProfileBody />

        </div>
      </main>

    </div>

  </div>
</template>

<script setup>
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import ProfileBody from './CustomerProfileBody.vue'
import {onMounted} from "vue"
import router from "../../router.js"
import {useCustomerStore} from "../../stores/customer.store.js"

const customerStore = useCustomerStore()
const route = router?.currentRoute?.value

onMounted(async () => {
  await customerStore.getCustomer(route.params.id)
})
</script>