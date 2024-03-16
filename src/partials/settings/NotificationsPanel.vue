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
              <div class="text-slate-800 dark:text-slate-100 font-semibold">Новое обращение</div>
              <div class="text-sm">Уведомляет о каждом новом клиенте который пишет в любой из подключенных аккаунтов.</div>
            </div>
            <!-- Right -->
            <div class="flex items-center ml-4">
              <div class="text-sm text-slate-400 dark:text-slate-500 italic mr-2">{{comments}}</div>
              <div class="form-switch">
                <input type="checkbox" id="comments" class="sr-only" v-model="comments" true-value="On" false-value="Off" />
                <label class="bg-slate-400 dark:bg-slate-700" for="comments">
                  <span class="bg-white shadow-sm" aria-hidden="true"></span>
                  <span class="sr-only">Enable smart sync</span>
                </label>
              </div>
            </div>
          </li>
          <li class="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
            <!-- Left -->
            <div>
              <div class="text-slate-800 dark:text-slate-100 font-semibold">Новое сообщение</div>
              <div class="text-sm">Уведомляет обо всех сообщения в чатах, где вы отвественны.</div>
            </div>
            <!-- Right -->
            <div class="flex items-center ml-4">
              <div class="text-sm text-slate-400 dark:text-slate-500 italic mr-2">{{messages}}</div>
              <div class="form-switch">
                <input type="checkbox" id="messages" class="sr-only" v-model="messages" true-value="On" false-value="Off" />
                <label class="bg-slate-400 dark:bg-slate-700" for="messages">
                  <span class="bg-white shadow-sm" aria-hidden="true"></span>
                  <span class="sr-only">Enable smart sync</span>
                </label>
              </div>
            </div>
          </li>
          <li class="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
            <!-- Left -->
            <div>
              <div class="text-slate-800 dark:text-slate-100 font-semibold">Назначение ответственным за обращение</div>
              <div class="text-sm">Уведомляет каждый раз когда вас назначают ответственным за обращение.</div>
            </div>
            <!-- Right -->
            <div class="flex items-center ml-4">
              <div class="text-sm text-slate-400 dark:text-slate-500 italic mr-2">{{messages}}</div>
              <div class="form-switch">
                <input type="checkbox" id="messages" class="sr-only" v-model="messages" true-value="On" false-value="Off" />
                <label class="bg-slate-400 dark:bg-slate-700" for="messages">
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
              <div class="text-slate-800 dark:text-slate-100 font-semibold">Новое обращение</div>
              <div class="text-sm">Уведомляет о каждом новом клиенте который пишет в любой из подключенных аккаунтов.</div>
            </div>
            <!-- Right -->
            <div class="flex items-center ml-4">
              <div class="text-sm text-slate-400 dark:text-slate-500 italic mr-2">{{comments}}</div>
              <div class="form-switch">
                <input type="checkbox" id="comments" class="sr-only" v-model="comments" true-value="On" false-value="Off" />
                <label class="bg-slate-400 dark:bg-slate-700" for="comments">
                  <span class="bg-white shadow-sm" aria-hidden="true"></span>
                  <span class="sr-only">Enable smart sync</span>
                </label>
              </div>
            </div>
          </li>
          <li class="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
            <!-- Left -->
            <div>
              <div class="text-slate-800 dark:text-slate-100 font-semibold">Новое сообщение</div>
              <div class="text-sm">Уведомляет обо всех сообщения в чатах, где вы отвественны.</div>
            </div>
            <!-- Right -->
            <div class="flex items-center ml-4">
              <div class="text-sm text-slate-400 dark:text-slate-500 italic mr-2">{{messages}}</div>
              <div class="form-switch">
                <input type="checkbox" id="messages" class="sr-only" v-model="messages" true-value="On" false-value="Off" />
                <label class="bg-slate-400 dark:bg-slate-700" for="messages">
                  <span class="bg-white shadow-sm" aria-hidden="true"></span>
                  <span class="sr-only">Enable smart sync</span>
                </label>
              </div>
            </div>
          </li>
          <li class="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
            <!-- Left -->
            <div>
              <div class="text-slate-800 dark:text-slate-100 font-semibold">Назначение ответственным за обращение</div>
              <div class="text-sm">Уведомляет каждый раз когда вас назначают ответственным за обращение.</div>
            </div>
            <!-- Right -->
            <div class="flex items-center ml-4">
              <div class="text-sm text-slate-400 dark:text-slate-500 italic mr-2">{{messages}}</div>
              <div class="form-switch">
                <input type="checkbox" id="messages" class="sr-only" v-model="messages" true-value="On" false-value="Off" />
                <label class="bg-slate-400 dark:bg-slate-700" for="messages">
                  <span class="bg-white shadow-sm" aria-hidden="true"></span>
                  <span class="sr-only">Enable smart sync</span>
                </label>
              </div>
            </div>
          </li>
        </ul>
      </section>

    </div>

    <!-- Panel footer -->
    <footer>
      <div class="flex flex-col px-6 py-5 border-slate-200 dark:border-slate-700">
        <div class="flex self-end">
          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Сохранить изменения</button>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const comments = ref('On')
const messages = ref('On')
const mentions = ref('Off')
</script>