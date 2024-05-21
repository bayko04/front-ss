import { defineStore } from 'pinia';
import {fetchWrapper} from "../helpers/fetch-wrapper.js";

const baseUrl = `${import.meta.env.VITE_API_URL}/references`;

export const useReferencesStore = defineStore({
    id: 'references',
    state: () => ({
        chatStatuses: [],
        taskTypes: [],
        sections: [],
    }),
    actions: {
        async getSections() {
            if(this.sections.length === 0) {
                const result = await fetchWrapper.get(`${baseUrl}/sections`);
                this.sections = result.data
            }

            return this.sections
        },
        async getChatStatuses() {
            if(this.chatStatuses.length === 0) {
                const result = await fetchWrapper.get(`${baseUrl}/chat-statuses`);
                this.chatStatuses = result.data
            }

            return this.chatStatuses
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
        },
        async getTaskTypes() {
            const result = await fetchWrapper.get(`${baseUrl}/task-types`);
            if(result.data) {
                this.taskTypes = result.data
            }
        },
        async setOrUpdateTaskType(form) {
            const result = await fetchWrapper.post(`${baseUrl}/task-types`, form);
            if(result.data && form.id) {
                const index = this.getItemIndex(form.id)
                this.taskTypes[index] = result.data
            } else if(result.data) {
                this.taskTypes.push(result.data)
            }
        },
        async deleteTaskType(id) {
            await fetchWrapper.delete(`${baseUrl}/task-types/${id}`);
            const index = this.getItemIndex(id)
            this.taskTypes.splice(index, 1)
        },
        async makeConversionStatus(id){
            await fetchWrapper.post(`${baseUrl}/task-types/${id}`);
        }
    }
});