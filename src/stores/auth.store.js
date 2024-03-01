import { defineStore } from 'pinia';
import { fetchWrapper } from '../helpers/fetch-wrapper.js'
import { useAlertStore } from './alert.store.js';

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        users: [],
        userData: JSON.parse(localStorage.getItem('userData')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            try {
                const result = (await fetchWrapper.post(`${baseUrl}/login`, { email, password }));
                if(result.errors || !result.data.user) {
                    const alertStore = useAlertStore();
                    alertStore.error(result);
                } else {
                    this.userData = result.data
                    localStorage.setItem('userData', JSON.stringify(this.userData));
                    location.assign(this.returnUrl || '/')
                }
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async socialLogin(result) {
            try {
                if(result.errors || !result.data.user) {
                    const alertStore = useAlertStore();
                    alertStore.error(result);
                } else {
                    this.userData = result.data
                    localStorage.setItem('userData', JSON.stringify(this.userData));
                    location.assign(this.returnUrl || '/')
                }
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        logout() {
            this.userData = null;
            localStorage.removeItem('userData');
            location.assign('/signin')
        },
        hasPermission(permission) {
            return this.userData && this.userData.permissions && this.userData.permissions.includes(permission);
        }
    }
});