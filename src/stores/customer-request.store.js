import {defineStore} from 'pinia';
import {fetchWrapper} from '../helpers/fetch-wrapper.js'
import {useMessangers} from '../utils/messengers.js'

export const useCustomerRequestStore = defineStore({
    id: 'customer-request',
    state: () => ({
        customerRequests: [],
        customerRequestsCount: 0,
        sortedCustomerRequestsCount: []
    }),
    actions: {
        async changeChatStatus(status, id) {
            return (await fetchWrapper.post(`/customer-requests/change-chat-status`, {'statusId': status, customerRequestId: id})).data;
        },
        async changeUser(userId, id) {
            return (await fetchWrapper.post(`/customer-requests/change-user`, {'userId': userId, customerRequestId: id})).data;
        },
        async getCustomerRequests(statusId = null, accountId = null, messenger = null, dateFrom = null, dateTo = null) {
            this.customerRequests = (await fetchWrapper.get(`/customer-requests`, {'statusId': statusId ?? '', 'accountId': accountId ?? '', 'messenger': messenger ?? '', 'dateFrom': dateFrom ?? '', 'dateTo': dateTo ?? ''})).data;
            this.sortedCustomerRequestsCount = (await fetchWrapper.get(`/customer-requests/count`, {'accountId': accountId ?? '', 'messenger': messenger ?? '', 'dateFrom': dateFrom ?? '', 'dateTo': dateTo ?? ''})).data;
            let allCount = 0;
            for (let key in this.sortedCustomerRequestsCount) {
                allCount += this.sortedCustomerRequestsCount[key];
            }
            this.customerRequestsCount = allCount
        },
        async customerRequestsPaginate(url) {
            try {
                this.customerRequests = (await fetchWrapper.get(`${url}`)).data;
            } catch (error) {
                console.log(error)
            }
        },
        async setChatByCustomerRequestId(id) {
            const { setActiveChat } = await useMessangers()

            const chat = (await fetchWrapper.get(`/customer-requests/chat/` + id)).data;
            setActiveChat(chat)
        },
    }
});