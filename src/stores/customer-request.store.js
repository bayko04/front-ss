import {defineStore} from 'pinia';
import {fetchWrapper} from '../helpers/fetch-wrapper.js'

export const useCustomerRequestStore = defineStore({
    id: 'customer-request',
    state: () => ({
    }),
    actions: {
        async changeChatStatus(status, id) {
            return await fetchWrapper.post(`/customer-requests/change-chat-status`, {'statusId': status, customerRequestId: id}).data;
        },
        async changeUser(userId, id) {
            return await fetchWrapper.post(`/customer-requests/change-user`, {'userId': userId, customerRequestId: id}).data;
        }
    }
});