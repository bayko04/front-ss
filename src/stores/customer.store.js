import {defineStore} from 'pinia';
import {fetchWrapper} from '../helpers/fetch-wrapper.js'
import router from '../router.js'

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
        },
        async addCustomer(data) {
            let formData = new FormData()
            formData.append('method', 'POST');
            for (const key in data) {
                formData.append(key, data[key]);
            }
            try {
                const result = await fetchWrapper.post(`${baseUrl}`, formData);
                if(!result.errors) {
                    router.push('/customers')
                }
            } catch (error) {
                console.log(error)
            }
        },
        async updateCustomer(data) {
            let formData = new FormData()
            formData.append('method', 'POST');
            for (const key in data) {
                formData.append(key, data[key]);
            }
            try {
                const result = await fetchWrapper.post(`${baseUrl}/${this.customer.id}`, formData);
                if(!result.errors) {
                    router.push('/customers')
                }
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