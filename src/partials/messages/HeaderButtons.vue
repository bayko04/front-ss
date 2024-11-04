<template>
  <div class="flex">
    <div v-if="isMultipleAccounts" class="flex flex-row">
      <div
          v-tooltip="'Все чаты'"
          :class="{'bg-slate-300': allChats}"
          class="relative flex items-center mr-1 justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
          @click="setAllChatsTrue"
      >

        <mine/>
      </div>
    </div>
    <div class="mx-4 border-l-2 border-gray-300 h-auto"></div>
      <div v-if="activeAccount" class="flex flex-row">
        <div
            v-for="account in accounts"
            v-tooltip="account.title"
            :key="account.id"
            :class="{'bg-slate-300': (account.id === activeAccount.id) }"
            class="relative flex items-center mr-1 justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
            @click="setActiveAccount(account)"
        >
          <div>
            <component :is="getMessengerComponent(account?.messenger_name)"/>
          </div>
          <div v-if="account.id === activeAccount.id" style="position: absolute; bottom: -5px; left: 0; right: 0; height: 3px; background-image: linear-gradient(to right, #2EE4A1, #2EE4A1);"></div>
        </div>
      </div>
    <div class="mx-4 border-l-2 border-gray-300 h-auto"></div>
    <div v-if="activeCommentsAccount" class="flex flex-row">
      <div v-for="account in accounts">
        <div
            v-tooltip="account.title"
            v-if="account.messenger_id === 3"
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
  import mine from '../../images/chat/mine-chat.svg?component'

  const { setActiveAccount, accounts, activeAccount, activeCommentsAccount, setActiveCommentsAccount, allChats, isMultipleAccounts, setAllChatsTrue} = await useMessangers()

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
      case 'mine':
        return mine;
      default:
        return null; // Вернуть что-то по умолчанию или обработать ошибку
    }
  }
</script>
