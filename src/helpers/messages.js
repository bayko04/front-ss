import { fetchWrapper } from './fetch-wrapper.js'
import { ref } from "vue";
import { useRoute } from "vue-router";
import {useAuthStore} from "../stores/auth.store.js";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

const echo = ref(undefined)
function defineEcho() {
  const authStore = useAuthStore()
  window.Pusher = Pusher
  echo.value = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    wsHost: import.meta.env.VITE_PUSHER_HOST,
    wsPort: import.meta.env.VITE_PUSHER_PORT,
    wssPort: import.meta.env.VITE_PUSHER_PORT,
    forceTls: import.meta.env.VITE_PUSHER_SSL,
    disableStats: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
    auth: {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authStore.userData.access_token || ''}`,
      },
    },
  })
}

export const accounts = ref(undefined)
export const startSocketListeners = async function () {
  defineEcho()
  accounts.value = (await fetchWrapper.get('/accounts/all')).data
  const route = useRoute()
  if(activeAccount.value === undefined) {
    const accountId = route.query.accountId
      accountId ? setActiveAccount(getAccountById(accountId)) : setActiveAccount(accounts.value[0])
  }

  if(activeChat.value === undefined) {
    const chatId = route.query.chatId
    chatId ? setActiveChat(getChatById(chatId)) : setActiveChat(undefined)
  }

  accounts.value.forEach(function (account, index) {
    newChatFromSocket(account)
    account.chats?.forEach(function (chat) {
      account.unread_messages_count = 0
      account.unread_messages_count += chat.unread_messages_count
      addMessageToChat(account, chat)
      updateMessageInChat(account, chat)
    })
  })
}

function getAccountById(id){
  const foundAccount = accounts.value.find((account) => account.id === Number(id));
  return foundAccount || accounts.value[0];
}
function getChatById(id) {
  const foundChat = activeAccount.value.chats.find((chat) => chat.id === Number(id));
  return foundChat || undefined;
}

export  const activeAccount = ref(undefined)

export const setActiveAccount = async function (account) {
  activeAccount.value = account
  activeChat.value = undefined

  if (activeAccount.value.messenger.id === 5) {
    getMailChats(account)
  }
}

export const activeChat = ref(undefined)

export const setActiveChat = async function (chat) {
  activeChat.value = chat
  if(activeChat.value === undefined) {
    return
  }

  //change active account if chat is changed
  if(activeChat.value.account_id != activeAccount.value?.id) {
    accounts.value.forEach(function (account) {
      if(activeChat.value.account_id === account.id) {
        setActiveAccount(account)
      }
    })
  }

  if(activeChat.value !== undefined && !activeChat.value.messages) {
    getMessages()
  }

  if(activeChat.value.message === undefined) {
    activeChat.value.message = JSON.parse(JSON.stringify(emptyMessage))
  }
}

export async function getMessageById(id) {
  const foundMessage = activeChat.value.messages[Number(id)];
  if(!foundMessage) {
    await getMessages(id)
    foundMessage = activeChat.value.messages[Number(id)];
  }

  return foundMessage;
}

export const getMessages = async function (messageId = null) {
  let offset = 0
  if(activeChat.value.messages && Object.keys(activeChat.value.messages).length >= 15) {
    offset = Object.keys(activeChat.value.messages).length
  }
  if(!activeChat.value.messages) {
    activeChat.value.messages = {}
  }
  activeChat.value.messages = { ...activeChat.value.messages, ...(await fetchWrapper.get(`/${activeAccount.value?.messenger.name}/chats/${activeChat.value.id}/messages/${offset}`, {messageId:messageId})).data }
}

const addMessageToChat = function (account, chat) {
  echo.value.private(`${account.messenger.name}.${account.id}.chat.${chat.id}`).listen('.NewMessage', function (socketMessage) {
    if(chat.messages && chat.id === activeChat.value.id) {
      chat.messages[socketMessage.message.id] = socketMessage.message
      setTimeout(() => {
        if (bottom.value) {
          bottom.value.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    } else if(chat.messages) {
      chat.messages[socketMessage.message.id] = socketMessage.message
      chat['unread_messages_count']++
      account['unread_messages_count']++
    } else {
      chat['unread_messages_count']++
      account['unread_messages_count']++
    }
  });
}

const chatToTop = function(account, chat) {
  const index = account.chats.findIndex(item => item.id === chat.id)

  if (index !== -1) {
    const removedChat = account.chats.splice(index, 1)[0]
    account.chats.unshift(removedChat)
    return removedChat
  }

  return chat
}

const updateMessageInChat = function (account, chat) {
  echo.value.private(`${account.messenger.name}.${account.id}.chat.${chat.id}`).listen('.UpdateMessage', function (socketMessage) {
    if(chat.messages) {
      if (chat.messages[socketMessage.message.id].message_status_id === 3
        && socketMessage.message.message_status_id === 2
      ) {
        chat['unread_messages_count']--
        account['unread_messages_count']--
      }
      chat.messages[socketMessage.message.id] = socketMessage.message
    }
  });
}

const newChatFromSocket = function (account) {
  echo.value.private(`${account.messenger.name}.${account.id}.chat`).listen('.NewChat', function (socketChat) {
    account.chats.unshift(socketChat.chat)
    const chat = account.chats[0];
    updateChatFromSocket(chat, account)
    addMessageToChat(account,chat)
    fetchWrapper.get(`/${account.messenger.name}/chats/${chat['id']}/unread-messages/count`)
      .then(function (response) {
        chat['unread_messages_count'] = response.data['count']
        account['unread_messages_count'] += response.data['count']
      })
  })
}

const updateChatFromSocket = function (chat, account) {
  echo.value.private(`${account.messenger.name}.${account.id}.chat.${chat.id}`).listen('.UpdateChat', function (socketChat) {
    chat.image = socketChat.chat.image
    chat.name = socketChat.chat.name
  })
}

const emptyMessage = {
  id: null,
  user_id: null,
  chat_id: null,
  message_status_id: null,
  message_type_id: null,
  text: '',
  from: null,
  date: null,
  attachments: null,
  type: null
}

export const setDraftMessage = function(text)
{
  if(activeChat.value) {
    activeChat.value.message.text = text
  }
}

export const setReplyMessage = function(message)
{
  if(activeChat.value) {
    activeChat.value.message.reply_message = message
  }
}

export const removeReplyMessage = function()
{
  if(activeChat.value) {
    activeChat.value.message.reply_message = undefined
  }
}

export const saveMessage = async function () {
  const chatId = activeChat.value?.id
  await fetchWrapper.post(`/${activeAccount.value.messenger.name}/chats/${chatId}/new-message`, activeChat.value?.message)
  activeChat.value.message = JSON.parse(JSON.stringify(emptyMessage))
  setTimeout(() => {
    if (bottom.value) {
      bottom.value.scrollIntoView({ behavior: "smooth" });
    }
  }, 500);
}

export const markAsRead = async function (message) {
  await fetchWrapper.post(`/${activeAccount.value.messenger.name}/messages/${message.id}/mark-as-read`)
}

export const addEmojiToMessage = async function (emoji) {
  activeChat.value.message.text += emoji
}

export const sendFiles = async function (messageWithFiles) {
  let formData = new FormData()
  formData.append('method', 'POST')
  formData.append('text', messageWithFiles.text)
  messageWithFiles.attachments.forEach(function (attachment) {
    formData.append('attachments[]', attachment)
  })

  const chatId = activeChat.value?.id
  await fetchWrapper.post(`/${activeAccount.value.messenger.name}/chats/${chatId}/new-files-message`, formData)
  activeChat.value.message = JSON.parse(JSON.stringify(emptyMessage))
  setTimeout(() => {
    if (bottom.value) {
      bottom.value.scrollIntoView({ behavior: "smooth" });
    }
  }, 500);
}

const getMailChats = function(accaunt, folderName = 'INBOX', page = 1){
  fetchWrapper.get(`/mail/${accaunt.id}/chats/${folderName}/${page}`).then(function(response) {
    activeAccount.value.chats = response.data
  })
}

export const bottom = ref(undefined);

export const updateBottomValue = (newValue) => {
  bottom.value = newValue;
};
