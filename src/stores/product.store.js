import {defineStore} from 'pinia';
import {fetchWrapper} from "../helpers/fetch-wrapper.js";

export const useProductStore = defineStore({
    id: 'product',
    state: () => ({
        products: [],
        product: {
            name: '',
            description: '',
            price: null,
            status: 'Активный',
            category_id: null
        },
        productModalStatus: false,
        allCategories: [],
        childCategories: [],
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
        },
        async getChildCategories(){
            this.childCategories = (await fetchWrapper.get(`/products/child-categories`)).data;
        },
        async getAllCategories(){
            this.allCategories = (await fetchWrapper.get(`/products/all-categories`)).data;
        },
        async createOrUpdateProduct() {
            this.product = (await fetchWrapper.post(`/products`, this.product)).data;
            this.updateProductInArray(this.product);
            this.product = {
                name: '',
                description: '',
                price: null,
                status: 'Активный',
                category_id: null
            }
            this.productModalStatus = false
        },
        updateProductInArray(product) {
            const index = this.products.data.findIndex(p => p.id === product.id);
            if (index !== -1) {
                this.products.data[index] = product;
            } else {
                this.products.data.unshift(product);
            }
        },
        async deleteProduct() {
            await fetchWrapper.delete(`/products/${this.product.id}`);
            this.products.data = this.products.data.filter(x => x.id !== this.product.id);
            this.product = {
                name: '',
                description: '',
                price: null,
                status: 'Активный',
                category_id: null
            }
            this.productModalStatus = false

        },
    }

})