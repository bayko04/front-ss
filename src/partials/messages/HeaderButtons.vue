<template>
  <div class="flex">
    <div v-if="activeAccount" class="flex flex-row">
      <div
          v-tooltip="account.title"
          v-for="account in accounts"
          :key="account.id"
          :class="{'bg-slate-300': (account.id === activeAccount.id) }"
          class="relative flex items-center mr-1 justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
          @click="setActiveAccount(account)"
      >
        <div>
          <div v-if="account.unread_messages_count" class="absolute top-0 right-0 -mr-2 -mt-2 dark:bg-slate-700 rounded-full p-1 shadow">
            <div class="w-4 h-4 bg-red-500 text-white flex items-center justify-center rounded-full text-xs">
              {{account.unread_messages_count}}
            </div>
          </div>
          <component :is="getMessengerComponent(account?.messenger?.name)"/>
        </div>
      </div>
    </div>
    <div class="mx-4 border-l-2 border-gray-300 h-auto"></div>
    <div v-if="activeCommentsAccount" class="flex flex-row">
      <div v-for="account in accounts">
        <div
            v-tooltip="account.title"
            v-if="account.messenger.id === 3"
            @click="setActiveCommentsAccount(account)"
            :key="account.id"
            :class="{'bg-slate-300': (account.id === activeCommentsAccount.id) }"
            class="relative flex items-center mr-1 justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
        >
          <div>
            <component :is="getMessengerComponent('instagram')"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useMessangers } from "../../utils/messengers.js"
  import instagram from '../../images/chat/instagram.svg?component'
  import messenger from '../../images/chat/messenger.svg?component'
  import telegram from '../../images/chat/telegram.svg?component'
  import whatsapp from '../../images/chat/whatsapp.svg?component'
  import mail from '../../images/chat/mail.svg?component'

  const { setActiveAccount, accounts, activeAccount, activeCommentsAccount, setActiveCommentsAccount} = await useMessangers()

  const getMessengerComponent = (messengerName) => {
    switch (messengerName) {
      case 'instagram':
        return instagram;
      case 'messenger':
        return messenger;
      case 'telegram':
        return telegram;
      case 'whatsapp':
        return whatsapp;
      case 'mail':
        return mail;
      default:
        return null; // Вернуть что-то по умолчанию или обработать ошибку
    }
  }
</script>
