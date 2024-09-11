import {defineStore} from "pinia";
import {fetchWrapper} from "../helpers/fetch-wrapper.js";
import router from "../router.js";

const baseUrl = `${import.meta.env.VITE_API_URL}/marketing`;

export const useMarketingStore = defineStore({
    id: 'marketingStore',
    state: () => ({
        allAutoResponderTemplates: [],
        reminderSettings: {
            auto_client_retention: {
                active: false,
                minutes: 10
            }
        },
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
        customerTags: []
    }),
    actions: {
        async getCustomersPull(tags, statuses, from, to) {
           const result = (await fetchWrapper.post(`/marketing/customer-pull`, {
                tags: tags,
                statuses: statuses,
                from: from,
                to: to,
            }));

           return  result.data
        },
        async getCustomerTags() {
            this.customerTags = (await fetchWrapper.get(`/marketing/customer-tags`)).data;
        },
        async clearAutoresponderTemplate() {
            this.autoresponderTemplate = {
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
            }
        },
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
            formData.append('id', data.id ?? '');

            try {
                const result = await fetchWrapper.post(`${baseUrl}/autoresponder`, formData);
                if (!result.errors) {
                    router.push(`/marketing/autoresponder/${result.data.id}`);
                }
            } catch (error) {
                console.log(error);
            }
        },

        async deleteAutoresponder(id) {
            await fetchWrapper.delete(`${baseUrl}/autoresponders/${id}`)
        },

        //reminder-settings and auto client retention

        async updateReminderSettings() {
            try {
                const response = await fetchWrapper.post(`${baseUrl}/reminder-settings`, this.reminderSettings);
                console.log('Ответ сервера:', response);
            } catch (error) {
                console.error('Ошибка отправки данных на сервер:', error);
                throw error;
            }
        },

        async getReminderSettings() {
            const result = await fetchWrapper.get(`${baseUrl}/reminder-settings`)
            this.reminderSettings = result.data;

            if(!this.reminderSettings.auto_client_retention) {
                this.reminderSettings.auto_client_retention = {
                    active: false,
                    minutes: 10
                }
            }

            return this.reminderSettings;
        },
    },
})
