import { ref } from "vue";
import {useAuthStore} from "../stores/auth.store.js";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

const echo = ref(null)

function defineEcho() {
    const authStore = useAuthStore()
    window.Pusher = Pusher
    echo.value = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        wsHost: import.meta.env.VITE_PUSHER_HOST,
        wsPort: import.meta.env.VITE_PUSHER_PORT,
        wssPort: import.meta.env.VITE_PUSHER_PORT,
        forceTls: false,
        disableStats: false,
        enabledTransports: ['ws', 'wss'],
        authEndpoint: `${import.meta.env.VITE_APP_URL}/broadcasting/auth`,
        auth: {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authStore.userData.access_token || ''}`,
            },
        },
    })
}

export function getEcho() {
    if (!echo.value) {
        defineEcho()
    }

    return echo.value
}