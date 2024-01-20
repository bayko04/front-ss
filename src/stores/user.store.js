import {defineStore} from 'pinia';
import {fetchWrapper} from '../helpers/fetch-wrapper.js'
import router from '../router.js'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore({
    id: 'user',
    state: () => ({
        users: [],
        user: null,
        userReferences: null
    }),
    actions: {
        async getUsers() {
            try {
                this.users = (await fetchWrapper.get(`${baseUrl}/`)).data;
            } catch (error) {
                console.log(error)
            }
        },
        async usersPaginate(url) {
            try {
                this.users = (await fetchWrapper.get(`${url}`)).data;
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
                    router.push(`/users/profile/${result.data.id}`)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async setContactAsMain(id) {
            try {
                const result = (await fetchWrapper.post(`${baseUrl}/${this.user.id}/set-contact-as-main/${id}`, {})).data;
                this.user.contacts = result
            } catch (error) {
                console.log(error)
            }
        },
        async addContact(data) {
            try {
                const result = (await fetchWrapper.post(`${baseUrl}/${this.user.id}/add-contact`, data)).data;
                this.user.contacts.push(result)
            } catch (error) {
                console.log(error)
            }
        },
        async removeContact(id) {
            try {
                const result = (await fetchWrapper.post(`${baseUrl}/${this.user.id}/remove-contact/${id}`, {})).data;
                this.user.contacts = result
            } catch (error) {
                console.log(error)
            }
        },
        async addDocument(data) {
            let formData = new FormData()
            formData.append('method', 'POST');
            for (const key in data) {
                formData.append(key, data[key]);
            }
            try {
                const result = (await fetchWrapper.post(`${baseUrl}/${this.user.id}/add-document`, formData)).data;
                this.user.documents.push(result)
            } catch (error) {
                console.log(error)
            }
        },
        async removeDocument(id) {
            try {
                const result = (await fetchWrapper.post(`${baseUrl}/${this.user.id}/remove-document/${id}`, {})).data;
                this.user.documents = result
            } catch (error) {
                console.log(error)
            }
        },
        async updateUser(data) {
            let formData = new FormData()
            formData.append('method', 'POST');
            for (const key in data) {
                formData.append(key, data[key]);
            }
            try {
                const result = await fetchWrapper.post(`${baseUrl}/${this.user.id}`, formData);
                if(!result.errors) {
                    router.push(`/users/profile/${result.data.id}`)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getReferences() {
            try {
                if (this.userReferences === null) {
                    this.userReferences = (await fetchWrapper.get(`${baseUrl}/references`)).data;
                }

                return this.userReferences;
            } catch (error) {
                console.log(error);
            }
        },
    }
});