import { defineStore } from 'pinia';
import {fetchWrapper} from "../helpers/fetch-wrapper.js";

const baseUrl = `${import.meta.env.VITE_API_URL}/references`;

export const useReferencesStore = defineStore({
    id: 'references',
    state: () => ({
        chatStatuses: []
    }),
    actions: {
        async getChatStatuses() {
            const result = await fetchWrapper.get(`${baseUrl}/chat-statuses`);
            if(result.data) {
                this.chatStatuses = result.data
            }
        },
        async setOrUpdateChatStatus(form) {
            const result = await fetchWrapper.post(`${baseUrl}/chat-statuses`, form);
            if(result.data && form.id) {
                const index = this.getItemIndex(form.id)
                this.chatStatuses[index] = result.data
            } else if(result.data) {
                this.chatStatuses.push(result.data)
            }
        },
        async deleteChatStatus(id) {
            await fetchWrapper.delete(`${baseUrl}/chat-statuses/${id}`);
            const index = this.getItemIndex(id)
            this.chatStatuses.splice(index, 1)
        },
        getItemIndex(id) {
            return this.chatStatuses.findIndex(item => item.id === id)
        }
    }
});