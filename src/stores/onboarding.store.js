import {defineStore} from 'pinia';
import {fetchWrapper} from "../helpers/fetch-wrapper.js";

export const useOnboardingStore = defineStore({
    id: 'onboarding',
    state: () => ({
        companyData: {
            company: {
                name: '',
                section_id: ''
            },
            user: {
                name: '',
                email: '',
                password: '',
            }
        },
    }),
    actions: {
        async saveCompany() {
            return (await fetchWrapper.post(`/onboarding/register`, this.companyData)).data;
        }
    }
});