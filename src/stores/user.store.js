import {defineStore} from 'pinia';
import {fetchWrapper} from '../helpers/fetch-wrapper.js'
import router from '../router.js'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore({
    id: 'user',
    state: () => ({
        users: [],
        user: null,
        userReferences: null,
    }),
    actions: {
        async getUsers() {
            try {
                this.users = (await fetchWrapper.get(`${baseUrl}/`)).data;
            } catch (error) {
                console.log(error)
            }
        },
        async getUser(id) {
            try {
                this.user = (await fetchWrapper.get(`${baseUrl}/${id}`)).data;
            } catch (error) {
                console.log(error)
            }
        },
        async addUser(data) {
            let formData = new FormData()
            formData.append('method', 'POST');
            for (const key in data) {
                formData.append(key, data[key]);
            }
            try {
                const result = await fetchWrapper.post(`${baseUrl}`, formData);
                if(!result.errors) {
                    router.push(`/community/users-tabs`)
                }
            } catch (error) {
                console.log(error)
            }
        },
    }
});