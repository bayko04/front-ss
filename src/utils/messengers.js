import { fetchWrapper } from '../helpers/fetch-wrapper.js'
import { ref, reactive } from "vue";
import { useAuthStore } from "../stores/auth.store.js";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import  router  from '../router.js';

const accounts = ref(undefined)
const activeAccount = ref(undefined)
const activeChat = ref(undefined)
const bottom = ref(undefined);
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
const echo = ref(undefined);
const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
export function useMessangers() {
  const route = ref(router?.currentRoute?.value);

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
      forceTls: false,
      disableStats: false,
      enabledTransports: ['ws', 'wss'],
      authEndpoint: `http://127.0.0.1:8000/broadcasting/auth`,
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authStore.userData.access_token || ''}`,
        },
      },
    })
  }

  const startSocketListeners = async function () {
    defineEcho()
    accounts.value = (await fetchWrapper.get('/accounts/all')).data
    if (activeAccount.value === undefined) {
      const accountId = searchParams.get('accountId')
      accountId ? setActiveAccount(getAccountById(accountId)) : setActiveAccount(accounts.value[0])
    }

    if (activeChat.value === undefined) {
      const chatId = searchParams.get('chatId')
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

  function getAccountById(id) {
    const foundAccount = accounts.value.find((account) => account.id === Number(id));
    return foundAccount || accounts.value[0];
  }

  function getChatById(id) {
    const foundChat = activeAccount.value.chats.find((chat) => chat.id === Number(id));
    return foundChat || undefined;
  }

  const setActiveAccount = async function (account) {
    activeAccount.value = account
    activeChat.value = undefined

    const newRoute = {
      path: '/messages',
      query: {accountId: activeAccount.value?.id},
    };
    router?.push(newRoute);
  }

  const setActiveChat = async function (chat) {
    activeChat.value = chat
    if (activeChat.value === undefined) {
      return
    }

    if (activeChat.value !== undefined && !activeChat.value.messages) {
      getMessages()
    }

    if (activeChat.value.message === undefined) {
      activeChat.value.message = JSON.parse(JSON.stringify(emptyMessage))
    }

    const newRoute = {
      path: '/messages',
      query: { accountId: activeAccount.value?.id, chatId: activeChat.value.id },
    };

    router?.push(newRoute);
  }

  async function getMessageById(id) {
    let foundMessage = activeChat.value.messages[Number(id)];
    if (!foundMessage) {
      await getMessages(id)
      foundMessage = activeChat.value.messages[Number(id)];
    }

    return foundMessage;
  }

  const getMessages = async function (messageId = null) {
    let offset = 0
    if (activeChat.value.messages && Object.keys(activeChat.value.messages).length >= 15) {
      offset = Object.keys(activeChat.value.messages).length
    }
    if (!activeChat.value.messages) {
      activeChat.value.messages = {}
    }
    activeChat.value.messages = {...activeChat.value.messages, ...(await fetchWrapper.get(`/${activeAccount.value?.messenger.name}/chats/${activeChat.value.id}/messages/${offset}`, {messageId: messageId})).data}
  }

  const addMessageToChat = function (account, chat) {
    echo.value.private(`${account.messenger.name}.${account.id}.chat.${chat.id}`).listen('.NewMessage', function (socketMessage) {
      if (chat.messages && chat.id === activeChat.value.id) {
        chat.messages[socketMessage.message.id] = socketMessage.message
        setTimeout(() => {
          if (bottom.value) {
            bottom.value.scrollIntoView({behavior: "smooth"});
          }
        }, 500);
      } else if (chat.messages) {
        chat.messages[socketMessage.message.id] = socketMessage.message
        chat['unread_messages_count']++
        account['unread_messages_count']++
      } else {
        chat['unread_messages_count']++
        account['unread_messages_count']++
      }
    });
  }

  const chatToTop = function (account, chat) {
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
      if (chat.messages) {
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
      addMessageToChat(account, chat)
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

  const setDraftMessage = function (text) {
    if (activeChat.value) {
      activeChat.value.message.text = text
    }
  }

  const setReplyMessage = function (message) {
    if (activeChat.value) {
      activeChat.value.message.reply_message = message
    }
  }

  const removeReplyMessage = function () {
    if (activeChat.value) {
      activeChat.value.message.reply_message = undefined
    }
  }

  const saveMessage = async function () {
    const chatId = activeChat.value?.id
    await fetchWrapper.post(`/${activeAccount.value.messenger.name}/chats/${chatId}/new-message`, activeChat.value?.message)
    activeChat.value.message = JSON.parse(JSON.stringify(emptyMessage))
    setTimeout(() => {
      if (bottom.value) {
        bottom.value.scrollIntoView({behavior: "smooth"});
      }
    }, 500);
  }

  const markAsRead = async function (message) {
    await fetchWrapper.post(`/${activeAccount.value.messenger.name}/messages/${message.id}/mark-as-read`)
  }

  const addEmojiToMessage = async function (emoji) {
    activeChat.value.message.text += emoji
  }

  const sendFiles = async function (messageWithFiles) {
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
        bottom.value.scrollIntoView({behavior: "smooth"});
      }
    }, 500);
  }

  const updateBottomValue = (newValue) => {
    bottom.value = newValue;
  };

  return {
    activeAccount,
    accounts,
    startSocketListeners,
    setActiveAccount,
    activeChat,
    getMessageById,
    setActiveChat,
    getMessages,
    setReplyMessage,
    setDraftMessage,
    removeReplyMessage,
    saveMessage,
    markAsRead,
    addEmojiToMessage,
    sendFiles,
    bottom,
    updateBottomValue,
  };
}
