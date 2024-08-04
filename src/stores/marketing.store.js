import {defineStore} from "pinia";
import {fetchWrapper} from "../helpers/fetch-wrapper.js";
import router from "../router.js";

const baseUrl = `${import.meta.env.VITE_API_URL}/marketing/autoresponder`;

export const useMarketingStore = defineStore({
    id: 'marketingStore',
    state: () => ({
        allAutoResponderTemplates: [],
        autoresponderTemplate: {
            title: '',
            ad_link: '',
            messages: [
                {
                    selectedOption: 'text',
                    textTitle: '',
                    textBody: '',
                    audioFile: null,
                    imageFile: null,
                }
            ]
        },
    }),
    actions: {
        async getAutoresponderTemplate(id) {
            this.autoresponderTemplate = (await fetchWrapper.get(`/marketing/autoresponder/${id}`)).data;
        },
        async autoResponderTemplates() {
            this.allAutoResponderTemplates = (await fetchWrapper.get(`/marketing/autoresponders`)).data;
        },
        async addOrUpdateAutoresponder() {
            const data = this.autoresponderTemplate; // Получение данных из состояния

            let formData = new FormData();
            formData.append('method', 'POST');

            // Добавление файлов из messages
            data.messages.forEach((message, index) => {
                for (const key in message) {
                    if (message.hasOwnProperty(key) && message[key] !== null) {
                        formData.append(`messages[${index}][${key}]`, message[key]);
                    }
                }
            });

            // Добавление остальных данных в FormData
            formData.append('title', data.title);
            formData.append('ad_link', data.ad_link);
            formData.append('id', data.id ?? null);

            try {
                const result = await fetchWrapper.post(`${baseUrl}`, formData);
                if (!result.errors) {
                    router.push(`/marketing/autoresponder/${result.data.id}`);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
})
