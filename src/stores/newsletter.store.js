import {defineStore} from 'pinia';
import {fetchWrapper} from "../helpers/fetch-wrapper.js";

export const useNewsletterStore = defineStore({
    id: 'newsletter',
    state: () => ({
        newsletters: [],
        newsletter: {
            name: null,
            chatStatuses: [],
            customerTags: [],
            dateFrom: '',
            dateTo: '',
            templateId: null,
            templateParams: [],
            sendAt: null,
            sendTime: null,
            status: null,
        }
    }),
    actions: {
        async createNewsletter() {
            this.product = (await fetchWrapper.post(`/newsletter`, this.newsletter)).data;
        },
    }
})