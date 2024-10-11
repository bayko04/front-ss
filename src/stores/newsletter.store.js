import {defineStore} from 'pinia';
import {fetchWrapper} from "../helpers/fetch-wrapper.js";
import router from "../router.js";

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
            const result = (await fetchWrapper.post(`/newsletter`, this.newsletter)).data;
            
            if(!result.errors) {
                router.push(`/marketingSettings/newsletters`)
            }
        },
    }
})