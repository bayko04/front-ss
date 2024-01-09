<template>
  <div>
    <div v-if="activeAccount" class="flex flex-row">
      <div
          v-for="account in accounts"
          :key="account.id"
          :class="{'bg-slate-300': (account.id === activeAccount.id) }"
          class="relative flex items-center mr-1 justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
          @click="setActiveAccount(account)"
      >
        <div>
          <component :is="getMessengerComponent(account?.messenger?.name)"/>
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

  const { setActiveAccount, accounts, activeAccount } = await useMessangers()

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
