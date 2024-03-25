import { defineStore } from 'pinia';
import { fetchWrapper } from '../helpers/fetch-wrapper.js'
import { useAlertStore } from './alert.store.js';

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
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
        logout() {
            this.userData = null;
            localStorage.removeItem('userData');
            location.assign('/signin')
        },
        hasPermission(permission) {
            return this.userData && this.userData.permissions && this.userData.permissions.includes(permission);
        },
        async updatePassword(data) {
            try {
                const result = await fetchWrapper.post(`${baseUrl}/update-password`, {password:data});
                if(result.data) {
                    const alertStore = useAlertStore();
                    alertStore.success('Пароль был успешно изменен');
                }
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async start() {
            try {
                this.userData.latest_work_session = {is_start: null};
                const result = await fetchWrapper.post(`${baseUrl}/start`);
                console.log(result)
                if(result.data) {
                    this.userData.latest_work_session = result.data;
                    localStorage.setItem('userData', JSON.stringify(this.userData));
                }
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async end() {
            try {
                this.userData.latest_work_session.is_start = null;
                const result = await fetchWrapper.post(`${baseUrl}/end`);
                if(result.data) {
                    this.userData.latest_work_session = result.data;
                    localStorage.setItem('userData', JSON.stringify(this.userData));
                }
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async updateAssignerSettings(data) {
            try {
                const result = await fetchWrapper.post(`${import.meta.env.VITE_API_URL}/assigner-settings`, data);
                if(result.data) {
                    this.userData.company.assigner_settings = result.data;
                    localStorage.setItem('userData', JSON.stringify(this.userData));
                }
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async updateNotificationSettings(data) {
            try {
                const result = await fetchWrapper.post(`${baseUrl}/notification-settings`, {"notification_settings":data});
                if(result.data) {
                    console.log(result.data)
                    this.userData.user.notification_settings = result.data;
                    localStorage.setItem('userData', JSON.stringify(this.userData));
                }
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        }
    }
});