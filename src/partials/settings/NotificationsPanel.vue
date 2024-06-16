<template>
  <div class="grow">

    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">Уведомления</h2>

      <!--  -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">Уведомления на сайте</h3>
        <ul>
          <li class="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
            <!-- Left -->
            <div>
              <div class="text-slate-800 dark:text-slate-100 font-semibold">Новое сообщение</div>
              <div class="text-sm">Уведомляет обо всех сообщения в чатах, где вы ответственны.</div>
            </div>
            <!-- Right -->
            <div class="flex items-center ml-4">
              <div class="form-switch">
                <input @change="save" type="checkbox" id="siteNewMessage" class="sr-only" v-model="siteNewMessage" true-value="Включен" false-value="Выключен"/>
                <label class="bg-slate-400 dark:bg-slate-700" for="siteNewMessage">
                <span class="bg-white shadow-sm" aria-hidden="true"></span>
                  <span class="sr-only">Enable smart sync</span>
                </label>
              </div>
            </div>
          </li>
          <li class="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
            <!-- Left -->
            <div>
              <div class="text-slate-800 dark:text-slate-100 font-semibold">Новое обращение</div>
              <div class="text-sm">Уведомляет каждый раз когда вас назначают ответственным за обращение.</div>
            </div>
            <!-- Right -->
            <div class="flex items-center ml-4">
              <div class="form-switch">
                <input @change="save" type="checkbox" id="siteNewAssign" class="sr-only" v-model="siteNewAssign" true-value="Включен" false-value="Выключен"/>
                <label class="bg-slate-400 dark:bg-slate-700" for="siteNewAssign">
                  <span class="bg-white shadow-sm" aria-hidden="true"></span>
                  <span class="sr-only">Enable smart sync</span>
                </label>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <!--  -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">Уведомления на в телеграмм</h3>
        <ul>
          <li class="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
            <!-- Left -->
            <div>
              <div class="text-slate-800 dark:text-slate-100 font-semibold">Новое сообщение</div>
              <div class="text-sm">Уведомляет обо всех сообщения в чатах, где вы отвественны.</div>
            </div>
            <!-- Right -->
            <div class="flex items-center ml-4">
              <div class="form-switch">
                <input @change="save" type="checkbox" id="telegramNewMessage" class="sr-only" v-model="telegramNewMessage" true-value="Включен" false-value="Выключен"/>
                <label class="bg-slate-400 dark:bg-slate-700" for="telegramNewMessage">
                  <span class="bg-white shadow-sm" aria-hidden="true"></span>
                  <span class="sr-only">Enable smart sync</span>
                </label>
              </div>
            </div>
          </li>
          <li class="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
            <!-- Left -->
            <div>
              <div class="text-slate-800 dark:text-slate-100 font-semibold">Новое обращение</div>
              <div class="text-sm">Уведомляет каждый раз когда вас назначают ответственным за обращение.</div>
            </div>
            <!-- Right -->
            <div class="flex items-center ml-4">
              <div class="form-switch">
                <input @change="save" type="checkbox" id="telegramNewAssign" class="sr-only" v-model="telegramNewAssign" true-value="Включен" false-value="Выключен" />
                <label class="bg-slate-400 dark:bg-slate-700" for="telegramNewAssign">
                  <span class="bg-white shadow-sm" aria-hidden="true"></span>
                  <span class="sr-only">Enable smart sync</span>
                </label>
              </div>
            </div>
          </li>
        </ul>
      </section>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import {useAuthStore} from "../../stores/auth.store.js";

const authStore = useAuthStore();

const siteNewMessage = ref(authStore.userData.user.notification_settings?.siteNewMessage ? 'Включен' : 'Выключен')
const siteNewAssign = ref(authStore.userData.user.notification_settings?.siteNewAssign ? 'Включен' : 'Выключен')

const telegramNewMessage = ref(authStore.userData.user.notification_settings?.telegramNewMessage ? 'Включен' : 'Выключен')
const telegramNewAssign = ref(authStore.userData.user.notification_settings?.telegramNewAssign ? 'Включен' : 'Выключен')

function save() {
  const form = {
    siteNewMessage: siteNewMessage.value === 'Включен',
    siteNewAssign: siteNewAssign.value === 'Включен',
    telegramNewMessage: telegramNewMessage.value === 'Включен',
    telegramNewAssign: telegramNewAssign.value === 'Включен',
  }

  authStore.updateNotificationSettings(form)
}

</script>