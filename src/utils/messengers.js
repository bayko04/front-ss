import { fetchWrapper } from '../helpers/fetch-wrapper.js'
import { ref } from "vue";
import  router  from '../router.js';
import {getEcho} from "./echo.js";
import {useCustomerStore} from "../stores/customer.store.js"

const references = ref([]);
const activeChatStatus = ref(null)
const accounts = ref(undefined)
const activeAccount = ref(undefined)
const activeCommentsAccount = ref(undefined)
const activeChat = ref(undefined)
const activeCommentsChat = ref(undefined)
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

    setActiveChat(null)
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

    if (activeCommentsAccount.value === undefined) {
      const commentAccountId = searchParams.get('commentAccountId')
      setActiveCommentsAccount(getCommentsAccountById(commentAccountId))
    }

    if (activeChat.value === undefined) {
      const chatId = searchParams.get('chatId')
      chatId ? setActiveChat(getChatById(chatId)) : setActiveChat(undefined)
    }

    accounts.value.forEach(function (account, index) {
      newChatFromSocket(account)
      account.chats?.forEach(function (chat) {
        if(!account.unread_messages_count) {
          account.unread_messages_count = 0
        }
        updateChatFromSocket(chat, account)
        account.unread_messages_count += chat.unread_messages_count
        addMessageToChat(account, chat)
        updateMessageInChat(account, chat)
      })
      if(account.messenger.id === 3) {
        newCommentsChatFromSocket(account)
        account.contents?.forEach(function (content) {
          updateCommentsChatFromSocket(content, account)
          addCommentToCommentsChat(account, content)
        })
      }
    })
  }

  function getAccountById(id) {
    const foundAccount = accounts.value.find((account) => account.id === Number(id));
    return foundAccount || accounts.value[0];
  }

  function getCommentsAccountById(id) {
    const foundAccount = accounts.value.find((account) => (account.id === Number(id) && account.messenger.id === 3));
    return foundAccount || undefined;
  }

  function getChatById(id) {
    const foundChat = activeAccount.value?.chats.find((chat) => chat.id === Number(id));
    return foundChat || undefined;
  }

  function getCommentsChatById(id) {
    const foundChat = activeCommentsAccount.value?.comments.find((chat) => chat.id === Number(id));
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

  const setActiveCommentsAccount = async function (account = undefined) {
    if(!account) {
        account = accounts.value.find((account) => account.messenger.id === 3)
    }
    activeCommentsAccount.value = account
    activeCommentsChat.value = undefined

    if(!account) {
      return
    }

    const newRoute = {
      path: '/comments',
      query: {commentsAccountId: activeCommentsAccount.value?.id},
    };
    router?.push(newRoute);
  }

  const setActiveChat = async function (chat) {

    if(typeof chat === 'number') {
      chat = getChatById(chat)
    }
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

    const customerStore = useCustomerStore()
    if(activeChat.value.customer_id) {
      await customerStore.getCustomer(activeChat.value.customer_id)
    } else {
      customerStore.customer = null
    }

    const newRoute = {
      path: '/messages',
      query: { accountId: activeAccount.value?.id, chatId: activeChat.value.id },
    };

    router?.push(newRoute);
    scrollToBottom()
  }

  const setActiveCommentsChat = async function (chat) {
    activeCommentsChat.value = chat
    if (activeCommentsChat.value === undefined) {
      return
    }
    if (activeCommentsChat.value !== undefined && !activeCommentsChat.value.comments) {
      getComments()
    }

    if (activeCommentsChat.value.comment === undefined) {
      activeCommentsChat.value.message = ''
    }

    const newRoute = {
      path: '/comments',
      query: { commentsAccountId: activeCommentsAccount.value?.id, commentsChatId: activeCommentsChat.value.id },
    }

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

  const getComments = async function () {
    if (!activeCommentsChat.value.comments) {
      activeCommentsChat.value.comments = {}
    }
    activeCommentsChat.value.comments = {...activeCommentsChat.value.comments, ...(await fetchWrapper.get(`/${activeCommentsAccount.value?.messenger.name}/chats/${activeCommentsChat.value.id}/comments`)).data}
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
      chatToTop(account, chat)
      if(activeChat.value.id === chat.id) {
        scrollToBottom()
      }
    });
  }

  const addCommentToCommentsChat = function (account, content) {
    echo.value.private(`${account.messenger.name}.${account.id}.content.${content.id}`).listen('.NewComment', function (socketComment) {
      if (content.comments && content.id === activeCommentsChat.value.id && socketComment.comment.parent_id != '' && content.comments[socketComment.comment.parent_id]) {
        content.comments[socketComment.comment.parent_id]['replies'].push(socketComment.comment)
      } else if (content.comments) {
        content.comments[socketComment.comment.id_from_comment] = socketComment.comment
      }
      commentsChatToTop(account, content)
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
      if(getChatById(socketChat.chat.id)) {
        return
      }
      account.chats.unshift(socketChat.chat)
      const chat = account.chats[0];
      updateChatFromSocket(chat, account)
      addMessageToChat(account, chat)
      updateMessageInChat(account, chat)
      fetchWrapper.get(`/${account.messenger.name}/chats/${chat['id']}/unread-messages/count`)
          .then(function (response) {
            chat['unread_messages_count'] = response.data['count']
            account['unread_messages_count'] = response.data['count']
          })
    })
  }

  const newCommentsChatFromSocket = function (account) {
    echo.value.private(`${account.messenger.name}.${account.id}.content`).listen('.NewContent', function (socketContent) {
      if(getCommentsChatById(socketContent.content.id)) {
        return
      }
      account.contents.unshift(socketContent.content)
      const content = account.contents[0];
      updateCommentsChatFromSocket(content, account)
      addCommentToCommentsChat(account, content)
    })
  }

  const updateChatFromSocket = function (chat, account) {
    echo.value.private(`${account.messenger.name}.${account.id}.chat.${chat.id}`).listen('.UpdateContent', function (socketChat) {
      chat.image = socketChat.chat.image
      chat.name = socketChat.chat.name
      chat.user_id = socketChat.chat.user_id
      chat.chat_status_id = socketChat.chat.chat_status_id

      if(socketChat.chat.chat_status?.end_status) {
        removeChat(account,socketChat.chat)
      }
    })
  }

  const updateCommentsChatFromSocket = function (content, account) {
    echo.value.private(`${account.messenger.name}.${account.id}.content.${content.id}`).listen('.UpdateChat', function (socketContent) {
      content.media_type = socketContent.content.media_type
      content.media_url = socketContent.content.media_url
      content.thumbnail_url = socketContent.content.thumbnail_url
      content.permalink = socketContent.content.permalink
      content.timestamp = socketContent.content.timestamp
      content.username = socketContent.content.username
      content.caption = socketContent.content.caption
    })
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

  const commentsChatToTop = function(account, chat) {
    const index = account.contents.findIndex(item => item.id === chat.id)

    if (index !== -1) {
      const removedChat = account.contents.splice(index, 1)[0]
      account.contents.unshift(removedChat)
      return removedChat
    }

    return chat
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

  const searchChat = async function (search) {
    const chats = (await fetchWrapper.post(`/${activeAccount.value.messenger.name}/chats/search`, {search: search})).data

    return chats
  }

  const markAsRead = async function (message) {
    await fetchWrapper.post(`/${activeAccount.value.messenger.name}/messages/${message.id}/mark-as-read`)
  }

  const assignChat = async function (userId, chat) {
    await fetchWrapper.post(`/${activeAccount.value.messenger.name}/chats/${chat.id}/${userId}/assign-chat`)
  }

  const openChat = async function (chatId) {
    await fetchWrapper.post(`/${activeAccount.value.messenger.name}/chats/${chatId}/open-chat`)
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
    assignChat,
    searchChat,
    openChat,
    setActiveCommentsAccount,
    activeCommentsAccount,
    setActiveCommentsChat,
    activeCommentsChat,
    getComments,
  };
}
