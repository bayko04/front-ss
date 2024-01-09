<template>
  <div class="relative">
    <button
      ref="trigger"
      class="grow flex items-center truncate"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <img class="w-8 h-8 rounded-full mr-2" :src="getMessengerComponent(activeAccount?.messenger?.name)" width="32" height="32" alt="Group 01" />
      <div class="truncate">
        <span class="font-semibold text-slate-800 dark:text-slate-100">{{activeAccount?.title}}</span>
      </div>
      <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
      </svg>
    </button>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen" class="origin-top-right z-10 absolute top-full left-0 min-w-60 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1">
        <ul
          ref="dropdown"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >
          <li
              v-for="account in accounts"
              :key="account.id"
          >
            <button
                :class="{'bg-slate-300': (account.id === activeAccount.id) }"
                class="w-full font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 block py-1.5 px-3" href="#0"
                @click="checkAccount(account)"
            >
              <div class="flex items-center justify-between">
                <div class="grow flex items-center truncate">
                  <img class="w-7 h-7 rounded-full mr-2" :src="getMessengerComponent(account?.messenger?.name)" width="28" height="28" alt="Channel 01" />
                  <div class="truncate">{{account.title}}</div>
                </div>
                <svg v-if="account.id === activeAccount.id" class="w-3 h-3 shrink-0 fill-current text-indigo-500 ml-1" viewBox="0 0 12 12">
                  <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                </svg>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useMessangers } from "../../utils/messengers.js"
import instagram from '../../images/chat/instagram.svg?url'
import messenger from '../../images/chat/messenger.svg?url'
import telegram from '../../images/chat/telegram.svg?url'
import whatsapp from '../../images/chat/whatsapp.svg?url'
import mail from '../../images/chat/mail.svg?url'


    const {accounts, activeAccount, setActiveAccount } = await useMessangers()

    function getMessengerComponent (messengerName) {
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
          return whatsapp;
      }
    }

    function checkAccount(account) {
      dropdownOpen.value = false;
      setActiveAccount(account)
    }

    const dropdownOpen = ref(false)
    const trigger = ref(null)
    const dropdown = ref(null)

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!dropdownOpen.value || dropdown.value.contains(target) || trigger.value.contains(target)) return
      dropdownOpen.value = false
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return
      dropdownOpen.value = false
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })    

</script>