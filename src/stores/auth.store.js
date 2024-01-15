import { defineStore } from 'pinia';
import { fetchWrapper } from '../helpers/fetch-wrapper.js'
import { useAlertStore } from './alert.store.js';

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        userData: JSON.parse(localStorage.getItem('userData')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            try {
                this.userData = (await fetchWrapper.post(`${baseUrl}/login`, { email, password })).data;
                localStorage.setItem('userData', JSON.stringify(this.userData));
                location.assign(this.returnUrl || '/')
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        logout() {
            this.userData = null;
            localStorage.removeItem('userData');
            location.assign('/signin')
        }
    }
});