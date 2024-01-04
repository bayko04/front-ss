<template>
  <Banner></Banner>
  <router-view />
</template>

<script>
import './charts/ChartjsConfig';
import { onMounted } from 'vue';
import Banner from './components/Banner.vue';
import { useAuthStore } from './stores/auth.store.js';
import { startSocketListeners } from './helpers/messages.js'

export default {
  components: {
    Banner
  },

  setup () {
    const authStore = useAuthStore();
    const initWebSocket = () => {
      if(authStore.userData) {
        startSocketListeners()
      }
    };

    onMounted(() => {
      initWebSocket();
    });
    return {
      authStore,
    }
  }
}
</script>

