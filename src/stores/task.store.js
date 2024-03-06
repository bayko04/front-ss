import {defineStore} from 'pinia';
import {fetchWrapper} from "../helpers/fetch-wrapper.js";

export const useTaskStore = defineStore({
    id: 'task',
    state: () => ({
        tasks: [],
        task: {
            due_date: new Date().toISOString().split('T')[0],
        },
    }),
    actions: {
        async getTasksForUser(userId, month, year) {
            this.tasks = (await fetchWrapper.get(`/tasks/${userId}/${month}/${year}`)).data;
        },
        async getTasksForCustomerRequest(customerRequestId) {
            this.tasks = (await fetchWrapper.get(`/tasks/customer-request/${customerRequestId}`)).data;
        },
        async createOrUpdateTask() {
            this.task = (await fetchWrapper.post(`/tasks`, this.task)).data;
            this.updateTaskInArray(this.task);
        },
        async deleteTask() {
            await fetchWrapper.delete(`/tasks/${this.task.id}`);
            this.tasks = this.tasks.filter(x => x.id !== this.task.id);
            this.task = {
                due_date: new Date().toISOString().split('T')[0],
            };
        },
        updateTaskInArray(task) {
            const index = this.tasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
                this.tasks[index] = task;
            } else {
                this.tasks.push(task);
            }
        }
    }
});