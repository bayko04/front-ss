import {defineStore} from 'pinia';
import {fetchWrapper} from "../helpers/fetch-wrapper.js";

export const useProductStore = defineStore({
    id: 'product',
    state: () => ({
        products: [],
        product: {
            tour_name: '',
            description: '',
            image_url: '',
            price: 0,
            duration: 0,
            start_date: '',
            end_date: '',
            tour_type: '',
            country: '',
            departure_city: '',
            arrival_city: '',
            tour_status: '',
            available_seats: '',
            currency: ''
        }
    }),
    actions: {
        async getProducts(){
            this.products = (await fetchWrapper.get('/products')).data;
        },
        async productsPaginate(url) {
            try {
                this.products = (await fetchWrapper.get(`${url}`)).data;
            } catch (error) {
                console.log(error)
            }
        },
        async import(file) {
            let formData = new FormData();
            formData.append('method', 'POST');
            formData.append('file', file.value);

            const result = await fetchWrapper.post(`/products/import`, formData);
            this.products = result.data
        }
    }

})