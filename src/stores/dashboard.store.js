import {defineStore} from 'pinia';
import {fetchWrapper} from '../helpers/fetch-wrapper.js'

export const useDashboardStore = defineStore({
    id: 'dashboard',
    state: () => ({
        customerRequests: [],
        statusRequests: []
    }),
    actions: {
        async getNumberOfReferences() {
            const response = (await fetchWrapper.get(`/dashboard`)).data;
            this.customerRequests = response;
        },
        async getStatusOfReferences() {
            const response = (await fetchWrapper.get('/dashboard/status')).data
            this.statusRequests = response;
        }

    }
})