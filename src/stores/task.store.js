import {defineStore} from 'pinia';
import {fetchWrapper} from "../helpers/fetch-wrapper.js";

export const useTaskStore = defineStore({
    id: 'task',
    state: () => ({
        tasks: [],
        task: {
            due_date: new Date().toISOString(),
            end_date: new Date(new Date().setMinutes(new Date().getMinutes() + 30)).toISOString(),
        },
    }),
    actions: {
        async sendRecommended(tasks, key) {
            this.task = (await fetchWrapper.post(`/appointments/send-recommendation-appointments`, {tasks, key}));
            console.log(this.task)
        },
        async getDataByKey(key) {
            return (await fetchWrapper.get(`/appointments/get-data-by-key`, {key: key})).data;
        },
        async getTasksForUser(userId, month, year, date) {
            this.tasks = (await fetchWrapper.get(`/tasks/${userId}/${month}/${year}`, {date: date ?? ''})).data;

            return this.tasks
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
                due_date: new Date().toISOString(),
                end_date: new Date(new Date().setMinutes(new Date().getMinutes() + 30)).toISOString(),
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
