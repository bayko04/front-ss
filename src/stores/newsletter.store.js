import {defineStore} from 'pinia';
import {fetchWrapper} from "../helpers/fetch-wrapper.js";
import router from "../router.js";

export const useNewsletterStore = defineStore({
    id: 'newsletter',
    state: () => ({
        newsletters: [],
        newsletter: {
            name: null,
            chat_statuses: [],
            customer_tags: [],
            date_from: '',
            date_to: '',
            template_id: null,
            template_params: [],
            send_at: null,
            send_time: null,
            status: null,
        },
        newsletterModalStatus: false
    }),
    actions: {
        async getNewsletters(){
            try {
                this.newsletters = (await fetchWrapper.get('/newsletters')).data;
            } catch (error) {
                console.log(error)
            }
        },
        async getNewsletter(id){
            try {
                this.newsletter = (await fetchWrapper.get(`/newsletters/${id}`)).data;
            } catch (error) {
                console.log(error)
            }
        },
        async createNewsletter() {
            const result = (await fetchWrapper.post(`/newsletters`, this.newsletter)).data;
            
            if(!result.errors) {
                router.push(`/marketingSettings/newsletters`)
            }
        },
        async update(id) {
            const result = (await fetchWrapper.post(`/newsletters/${id}`, this.newsletter)).data;
            
            if(!result.errors) {
                router.push(`/marketingSettings/newsletters`)
            }
        },
        async delete(id) {
            await fetchWrapper.delete(`/newsletters/${id}`, this.newsletter);
            this.newsletters.data = this.newsletters.data.filter(x => x.id !== id);
        },
    }
})