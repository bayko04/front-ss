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
            status: true,
            category_id: null
        },
        productModalStatus: false,
        allCategories: [],
        childCategories: [],
        category: {
            name: '',
            parent_id: ''
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
        },
        async getChildCategories(){
            this.childCategories = (await fetchWrapper.get(`/products/child-categories`)).data;
        },
        async getAllCategories(){
            this.allCategories = (await fetchWrapper.get(`/products/all-categories`)).data;
        },
        async createOrUpdateCategory(){
            const newCategory = (await fetchWrapper.post(`/products/category`, this.category)).data;
            this.product.category_id = newCategory.id
            this.updateCategoryInArray(newCategory)
            this.category = {
                name: '',
                parent_id: ''
            }
            this.productModalStatus = 'add'
        },
        async createOrUpdateProduct() {
            this.product = (await fetchWrapper.post(`/products`, this.product)).data;
            this.updateProductInArray(this.product);
            this.product = {
                name: '',
                description: '',
                price: null,
                status: true,
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
        updateCategoryInArray(category) {
            let index = this.allCategories.findIndex(p => p.id === category.id);
            if (index !== -1) {
                this.allCategories[index] = category;
            } else {
                this.allCategories.unshift(category);
            }

            index = this.childCategories.findIndex(p => p.id === category.id);
            if (index !== -1) {
                this.childCategories[index] = category;
            } else {
                this.childCategories.unshift(category);
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