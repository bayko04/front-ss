import {defineStore} from "pinia";
import {fetchWrapper} from "../helpers/fetch-wrapper.js";
import router from "../router.js";

const baseUrl = `${import.meta.env.VITE_API_URL}/marketing`;

export const useMarketingStore = defineStore({
    id: 'marketingStore',
    state: () => ({
        messageTemplate: {
            templateName: '',
            adLink: '',
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
        async addOrUpdateMarketingTemplate(data) {
            let formData = new FormData();
            formData.append('method', 'POST');

            // Добавление файла аудио
            if (data.messages.audioFile) {
                formData.append('audioFile', data.messages.audioFile);
                delete data.messages.audioFile; // Удаляем из объекта данных, чтобы не отправить его дважды
            }

            // Добавление файла изображения
            if (data.messages.imageFile) {
                formData.append('imageFile', data.messages.imageFile);
                delete data.messages.imageFile; // Удаляем из объекта данных, чтобы не отправить его дважды
            }

            for (const key in data) {
                if (typeof data[key] === 'object') {
                    formData.append(key, JSON.stringify(data[key]));
                } else {
                    formData.append(key, data[key]);
                }
            }
            try {
                const result = await fetchWrapper.post(`${baseUrl}`, formData);
                if (!result.errors) {
                    router.push(`/marketing/triggerTemplate/${result.data.id}`);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
})