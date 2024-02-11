import { fetchWrapper } from '../helpers/fetch-wrapper.js'
import { ref } from "vue";
import  router  from '../router.js';
import {getEcho} from "./echo.js";

const references = ref([]);
const activeChatStatus = ref(null)
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
const userChatStatusId = 6
export function useMessangers() {
  const route = ref(router?.currentRoute?.value);

  const getReferences = async function () {
    references.value = (await fetchWrapper.get('/chat/references')).data
  }

  function setActiveChatStatus(chatStatus) {
    if(chatStatus === 'default') {
      references.value['chat_statuses'].forEach(function (chatStatusItem, index) {
        if(chatStatusItem.id === userChatStatusId) {
          activeChatStatus.value = chatStatusItem
        }
      })
      return
    }

    activeChatStatus.value = chatStatus
  }

  const startSocketListeners = async function () {
    await getReferences()
    setActiveChatStatus('default')
    echo.value = getEcho()
    accounts.value = (await fetchWrapper.get('/chat/accounts')).data
    if (activeAccount.value === undefined) {
      const accountId = searchParams.get('accountId')
      accountId ? setActiveAccount(getAccountById(accountId)) : setActiveAccount()
    }

    if (activeChat.value === undefined) {
      const chatId = searchParams.get('chatId')
      chatId ? setActiveChat(getChatById(chatId)) : setActiveChat(undefined)
    }

    accounts.value.forEach(function (account, index) {
      newChatFromSocket(account)
      account.chats?.forEach(function (chat) {
        updateChatFromSocket(chat, account)
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

  const setActiveAccount = async function (account = undefined) {
    activeAccount.value = account ?? accounts.value[0]
    activeChat.value = undefined

    if(!account) {
      return
    }

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
    scrollToBottom()
  }

  function getMessageById(id) {
    let foundMessage = activeChat.value.messages[Number(id)];
    if(!foundMessage) {
      getMessages(id)
      foundMessage = activeChat.value.messages[Number(id)];
    }

    return foundMessage;
  }

  function getLastMessage() {
    const keys = Object.keys(activeChat.value.messages)
    const lastKey = keys.pop()
    const lastMessage = activeChat.value.messages[lastKey]

    return lastMessage
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
      } else if (chat.messages) {
        chat.messages[socketMessage.message.id] = socketMessage.message
      }
      if(!socketMessage.message.user_id) {
        chat['unread_messages_count']++
        account['unread_messages_count']++
      }
      scrollToBottom()
    });
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

  const scrollToBottom = function() {
    setTimeout(() => {
      const messagesBottomElement = window.messagesBottomElement;
      if (messagesBottomElement) {
        messagesBottomElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1000)
  }

  const scrollToMessage = function(messageId) {
    setTimeout(() => {
      const message = getMessageById(messageId);
      if (message && window.messagesRef) {
        const target = window.messagesRef[message.id];
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
          target.classList.add('bg-black', 'bg-opacity-50');

          setTimeout(() => {
            target.classList.remove('bg-black', 'bg-opacity-50');
          }, 1000);
        }
      }
    }, 1000)
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
            account['unread_messages_count'] = response.data['count']
          })
    })
  }

  const updateChatFromSocket = function (chat, account) {
    echo.value.private(`${account.messenger.name}.${account.id}.chat.${chat.id}`).listen('.UpdateChat', function (socketChat) {
      chat.image = socketChat.chat.image
      chat.name = socketChat.chat.name
      chat.user_id = socketChat.chat.user_id
      chat.chat_status_id = socketChat.chat.chat_status_id

      if(socketChat.chat.chat_status?.end_status) {
        removeChat(account,socketChat.chat)
      }
    })
  }

  const removeChat = function (account, chat) {
    const index = account.chats.findIndex(item => item.id === chat.id)
    const removedChat = account.chats.splice(index, 1)[0]
    if(removedChat.id === activeChat.value.id) {
      setActiveChat()
    }
    const channels = echo.privateChannels.filter(channel => channel.name.startsWith(`${account.messenger.name}.${account.id}.chat.${chat.id}`));

    channels.forEach(channel => {
      echo.value.leave(channel.name);
    });
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

  async function closeChat(form) {
    await fetchWrapper.post(`/${activeAccount.value.messenger.name}/chats/${activeChat.value.id}/close-chat`, form)
  }

  const sendFiles = async function () {
    let formData = new FormData()
    formData.append('method', 'POST');
    formData.append('text', activeChat.value.message.text);
    for (const attachment of activeChat.value.message.attachments) {
      formData.append('attachments[]', attachment);
    }
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
    scrollToBottom,
    activeAccount,
    accounts,
    startSocketListeners,
    setActiveAccount,
    activeChat,
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
    getMessageById,
    scrollToMessage,
    references,
    activeChatStatus,
    setActiveChatStatus,
    userChatStatusId,
    getLastMessage,
    closeChat,
  };
}
