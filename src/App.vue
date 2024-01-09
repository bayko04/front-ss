<template>
  <div>
    <Banner></Banner>
    <router-view />
  </div>
</template>

<script>
import './charts/ChartjsConfig';
import { onMounted, ref } from 'vue';
import Banner from './components/Banner.vue';
import { useAuthStore } from './stores/auth.store.js';
import { useMessangers } from "./utils/messengers.js"

export default {
  components: {
    Banner
  },
  setup () {
    const authStore = useAuthStore();
    const { startSocketListeners } = useMessangers();
    const isSocketInitialized = ref(false);

    const initWebSocket = async () => {
      if (authStore.userData && !isSocketInitialized.value) {
        await startSocketListeners();
        isSocketInitialized.value = true;
      }
    };

    onMounted(async () => {
      await initWebSocket();
    });

    // Возвращайте только те значения, которые необходимы в шаблоне
    return {
      authStore,
    }
  }
}
</script>

