import {defineStore} from 'pinia';
import {fetchWrapper} from "../helpers/fetch-wrapper.js";

export const useTaskStore = defineStore({
    id: 'task',
    state: () => ({
        tasks: [],
        task: {},
    }),
    actions: {
        async getTasks(date) {
            this.tasks = (await fetchWrapper.get(`/tasks`, date)).data;
        },
        async getTask(id) {
            this.task = (await fetchWrapper.get(`/tasks/${id}`)).data;
        },
        async createOrUpdateTask() {
            return (await fetchWrapper.post(`/tasks`, this.task)).data;
        },
        async deleteTask(id) {
            return (await fetchWrapper.delete(`/tasks/${id}`)).data;
        }
    }
});