<template>
    <div class="grow" v-if="authStore.userData">
        <!-- Panel body -->
        <div class="p-6 space-y-6">
            <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">Процентные ставки займа</h2>
            <div class="grid gap-5 md:grid-cols-1">
                <div>
                    <!-- Start -->
                    <div>
                        <p><strong>Техника: </strong></p>
                        <div>0-20000  - 0.4%</div>
                        <div>20001-50000  - 0.3%</div>
                        <div>50001-100000  - 0.2%</div>
                        <div>100001-200000  - 0.15%</div>
                        <div>200001  - 0.1%</div>
                        <div>ставка штрафа  - 0.4%</div>
                        <div>минимальный период  - 5 дней</div>
                    </div>
                    <!-- End -->
                </div>
                <div>
                    <!-- Start -->
                    <div>
                        <p><strong>Золото б/у: </strong></p>
                        <div>0-5000  - 0.4%</div>
                        <div>5001-10000  - 0.3%</div>
                        <div>Свыше 10001  - 0.2%</div>
                        <div>ставка штрафа  - 0.4%</div>
                        <div>минимальный период  - 5 дней</div>
                    </div>
                    <!-- End -->
                </div>

            </div>
        </div>
        <!-- Panel footer -->
        <footer>
            <div class="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
                <div class="flex self-end">
                    <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Сохранить изменения</button>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { useAuthStore } from "../../stores/auth.store.js";

const authStore = useAuthStore()

</script>