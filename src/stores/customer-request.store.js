import {defineStore} from 'pinia';
import {fetchWrapper} from '../helpers/fetch-wrapper.js'
import {useMessangers} from "../utils/messengers.js";

export const useCustomerRequestStore = defineStore({
    id: 'customer-request',
    state: () => ({
        customerRequest: null,
    }),
    actions: {
        async getCustomerRequest() {
            const { activeChat, activeAccount } = useMessangers();
            try {
                this.customerRequest = (await fetchWrapper.get(`/${activeAccount.value.messenger.name}/chats/${activeChat.value.id}/last-customer-request`)).data;
            } catch (error) {
                console.log(error)
            }
        },
    }
});