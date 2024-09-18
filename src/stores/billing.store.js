import { defineStore } from 'pinia';
import {fetchWrapper} from "../helpers/fetch-wrapper.js";

const baseUrl = `${import.meta.env.VITE_API_URL}/billing`;

export const useBillingStore = defineStore({
    id: 'billing',
    state: () => ({
        balance: [],
    }),
    actions: {
        async getBalance() {
            if(this.balance.length) {
                return this.balance
            }

           const result = await fetchWrapper.get(`${baseUrl}/balance`);
           this.balance = result.data

           return this.balance
        },
    }
});
