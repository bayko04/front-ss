import {defineStore} from 'pinia';
import {fetchWrapper} from '../helpers/fetch-wrapper.js'
import router from '../router.js'
import {useMessangers} from "../utils/messengers.js";

const baseUrl = `${import.meta.env.VITE_API_URL}/customers`;

export const useCustomerStore = defineStore({
    id: 'customer',
    state: () => ({
        customers: [],
        customer: null,
        customerReferences: null
    }),
    actions: {
        async getCustomers() {
            try {
                this.customers = (await fetchWrapper.get(`${baseUrl}/`)).data;
            } catch (error) {
                console.log(error)
            }
        },
        async searchCustomers(search) {
            try {
                this.customers = (await fetchWrapper.get(`${baseUrl}/search`, {search: search})).data;
            } catch (error) {
                console.log(error)
            }
        },
        async setChatAsCustomerContact(customerId) {
            const { activeChat, activeAccount } = useMessangers();
            try {
                activeChat.value.customer = (await fetchWrapper.post(`/${activeAccount.value.messenger.name}/chats/${activeChat.value.id}/${customerId}/set-as-contact`)).data;
            } catch (error) {
                console.log(error)
            }
        },
        async customersPaginate(url) {
            try {
                this.customers = (await fetchWrapper.get(`${url}`)).data;
            } catch (error) {
                console.log(error)
            }
        },
        async getCustomer(id) {
            try {
                this.customer = (await fetchWrapper.get(`${baseUrl}/${id}`)).data;
            } catch (error) {
                console.log(error)
            }

            return this.customer;
        },
        async addOrUpdateCustomer(data) {
            let formData = new FormData()
            formData.append('method', 'POST');
            for (const key in data) {
                formData.append(key, data[key]);
            }
            try {
                const result = await fetchWrapper.post(`${baseUrl}`, formData);
                if(!result.errors) {
                    router.push(`/customers/profile/${result.data.id}`)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async addCustomerToChat(data) {
            const { activeChat } = useMessangers();

            let formData = new FormData()
            formData.append('method', 'POST');
            for (const key in data) {
                formData.append(key, data[key]);
            }
            try {
                const result = await fetchWrapper.post(`${baseUrl}`, formData);
                activeChat.value.customer = result.data
            } catch (error) {
                console.log(error)
            }
        },
        async setContactAsMain(id) {
            try {
                const result = (await fetchWrapper.post(`${baseUrl}/${this.customer.id}/set-contact-as-main/${id}`, {})).data;
                this.customer.contacts = result
            } catch (error) {
                console.log(error)
            }
        },
        async addContact(data) {
            try {
                const result = (await fetchWrapper.post(`${baseUrl}/${this.customer.id}/add-contact`, data)).data;
                this.customer.contacts.push(result)
            } catch (error) {
                console.log(error)
            }
        },
        async removeContact(id) {
            try {
                const result = (await fetchWrapper.post(`${baseUrl}/${this.customer.id}/remove-contact/${id}`, {})).data;
                this.customer.contacts = result
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
                const result = (await fetchWrapper.post(`${baseUrl}/${this.customer.id}/add-document`, formData)).data;
                this.customer.documents.push(result)
            } catch (error) {
                console.log(error)
            }
        },
        async removeDocument(id) {
            try {
                const result = (await fetchWrapper.post(`${baseUrl}/${this.customer.id}/remove-document/${id}`, {})).data;
                this.customer.documents = result
            } catch (error) {
                console.log(error)
            }
        },
        async getReferences() {
            try {
                if (this.customerReferences === null) {
                    this.customerReferences = (await fetchWrapper.get(`${baseUrl}/references`)).data;
                }

                return this.customerReferences;
            } catch (error) {
                console.log(error);
            }
        },
    }
});