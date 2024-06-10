import {defineStore} from 'pinia';
import {fetchWrapper} from '../helpers/fetch-wrapper.js'
import {ref} from "vue";
import {tailwindConfig} from "../utils/Utils.js";
import {timestampToDate} from "../helpers/date-format.js";

export const useDashboardStore = defineStore({
    id: 'dashboard',
    state: () => ({
        statusOfReferences: {
            labels: [],
            datasets: [
                {
                    label: 'Количество обращений',
                    data: [],
                    backgroundColor: [
                        tailwindConfig().theme.colors.emerald[400],
                        tailwindConfig().theme.colors.amber[400],
                        tailwindConfig().theme.colors.sky[400],
                        tailwindConfig().theme.colors.indigo[500],
                        tailwindConfig().theme.colors.purple[500],
                        tailwindConfig().theme.colors.yellow[500],
                        tailwindConfig().theme.colors.orange[500],
                        tailwindConfig().theme.colors.blue[500],
                    ],
                    hoverBackgroundColor: [
                        tailwindConfig().theme.colors.emerald[500],
                        tailwindConfig().theme.colors.amber[500],
                        tailwindConfig().theme.colors.sky[500],
                        tailwindConfig().theme.colors.indigo[600],
                        tailwindConfig().theme.colors.purple[600],
                        tailwindConfig().theme.colors.yellow[600],
                        tailwindConfig().theme.colors.orange[600],
                        tailwindConfig().theme.colors.blue[600],
                    ],
                    borderWidth: 0,
                },
            ],
        },
        statusRequests: []
    }),
    actions: {
        async getNumberOfReferences(dateFrom = null, dateTo = null) {
            const response = (await fetchWrapper.get(`/dashboard`, {dateFrom: dateFrom ?? null, dateTo: dateTo ?? null})).data;
            this.customerRequests = response;
        },
        async getStatusOfReferences(dateFrom = null, dateTo = null) {
            const response = (await fetchWrapper.get('/dashboard/status', {dateFrom: dateFrom ?? null, dateTo: dateTo ?? null})).data
            this.statusOfReferences.labels = response.statusName
            this.statusOfReferences.datasets[0].data = response.count
        }

    }
})