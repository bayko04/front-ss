import { fetchWrapper } from '../helpers/fetch-wrapper.js'
import {computed, ref} from "vue";
import  router  from '../router.js';
import {getEcho} from "./echo.js";
import {useCustomerStore} from "../stores/customer.store.js"
import {useTaskStore} from "../stores/task.store.js";

const accounts = ref(undefined)
const activeAccount = ref(undefined)
const activeCommentsAccount = ref(undefined)
const activeChat = ref(undefined)
const activeCommentsChat = ref(undefined)
const bottom = ref(undefined);
const allChats = ref(false);
const isMultipleAccounts = ref(false)
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
const chatSortStatus = ref(1)

export function useMessangers() {
  const route = ref(router?.currentRoute?.value);

  const startSocketListeners = async function () {
    echo.value = getEcho()
    accounts.value = (await fetchWrapper.get('/chat/accounts'))
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

    if (activeCommentsChat.value === undefined) {
      const chatId = searchParams.get('commentsChatId')
      chatId ? setActiveCommentsChat(getCommentsChatById(chatId)) : setActiveCommentsChat(undefined)
    }

    checkMultipleAccounts()

    accounts.value.forEach(function (account, index) {
      newChatFromSocket(account)
    })
  }
  function checkMultipleAccounts() {
    isMultipleAccounts.value = accounts.value.length >= 2;
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
    const foundChat = activeCommentsAccount.value?.contents.find((chat) => chat.id === Number(id));
    return foundChat || undefined;
  }

  const setActiveAccount = async function (account = undefined) {
    activeAccount.value = account ?? accounts.value[0]
    activeChat.value = undefined

    allChats.value = false
    if (!account.chats) {
      account.chats = JSON.parse(localStorage.getItem('chats_' + account.id));
      setAccountChats(account)
    }

    if(!account) {
      return
    }

    const newRoute = {
      path: '/messages',
      query: {accountId: activeAccount.value?.id},
    };
    router?.push(newRoute);
  }

  const setAccountChats = async function (account) {
    const accountChats = (await fetchWrapper.get(`/chat/accounts/${account.id}`)).data;
    account.chats = accountChats.chats;
    account.messenger = accountChats.messenger;

    account.chats.forEach(function (chat) {
      if(!account.unread_messages_count) {
        account.unread_messages_count = 0
      }
      updateChatFromSocket(chat, account)
      account.unread_messages_count += chat.unread_messages_count
      addMessageToChat(account, chat)
      updateMessageInChat(account, chat)
    });

    if (account.messenger.id === 3) {
      newCommentsChatFromSocket(account)
      account.contents?.forEach(function (content) {
        updateCommentsChatFromSocket(content, account)
        addCommentToCommentsChat(account, content)
      })
    }
    localStorage.setItem('chats_' + account.id, JSON.stringify(account.chats));
  }

  const setActiveCommentsAccount = async function (account = undefined) {
    if(!account) {
      activeCommentsAccount.value = accounts.value.find((account) => account.messenger_id === 3)
    } else {
      activeCommentsAccount.value = account
    }
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
    if (activeChat.value === undefined || activeChat.value === null) {
      return
    }
    if(activeAccount.value?.id !== activeChat.value.account_id) {
      activeAccount.value = getAccountById(activeChat.value.account_id)
    }

    if (!activeChat.value.messages) {
      getMessages()
    }

    if (activeChat.value.message === undefined) {
      activeChat.value.message = JSON.parse(JSON.stringify(emptyMessage))
    }

    const taskStore = useTaskStore()

    if(activeChat.value.latest_customer_request) {
      taskStore.getTasksForCustomerRequest(activeChat.value.latest_customer_request?.id)
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
    if (activeCommentsChat.value === undefined || activeCommentsChat.value === null) {
      return
    }
    if (!activeCommentsChat.value.comments) {
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
    if (activeChat.value?.messages && Object.keys(activeChat.value.messages).length >= 15) {
      offset = Object.keys(activeChat.value.messages).length
    }
    if (!activeChat.value?.messages) {
      activeChat.value.messages = {}
    }
    activeChat.value.messages = {...activeChat.value.messages, ...(await fetchWrapper.get(`/${activeAccount.value?.messenger_name}/chats/${activeChat.value.id}/messages/${offset}`, {messageId: messageId})).data}
  }

  const getComments = async function () {
    if (!activeCommentsChat.value.comments) {
      activeCommentsChat.value.comments = {}
    }
    activeCommentsChat.value.comments = {...activeCommentsChat.value.comments, ...(await fetchWrapper.get(`/${activeCommentsAccount.value?.messenger.name}/chats/${activeCommentsChat.value.id}/comments`)).data}
  }

  const addMessageToChat = function (account, chat) {
    echo.value.private(`${account.messenger.name}.${account.id}.chat`).listen(`.${chat.id}.NewMessage`, function (socketMessage) {
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
    echo.value.private(`${account.messenger.name}.${account.id}.content`).listen(`.${content.id}.NewComment`, function (socketComment) {
      if (content.comments && content.id === activeCommentsChat.value.id && socketComment.comment.parent_id != '' && content.comments[socketComment.comment.parent_id]) {
        if(!content.comments[socketComment.comment.parent_id]['replies']) {
            content.comments[socketComment.comment.parent_id]['replies'] = []
        }
        content.comments[socketComment.comment.parent_id]['replies'].push(socketComment.comment)
      } else if (content.comments) {
        content.comments[socketComment.comment.id_from_comment] = socketComment.comment
      }
      commentsChatToTop(account, content)
    });
  }

  const updateMessageInChat = function (account, chat) {
    echo.value.private(`${account.messenger.name}.${account.id}.chat`).listen(`.${chat.id}.UpdateMessage`, function (socketMessage) {
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
    echo.value.private(`${account.messenger_name}.${account.id}.chat`).listen('.NewChat', function (socketChat) {
      if(getChatById(socketChat.chat.id)) {
        return
      }
      if(socketChat.chat.id === activeChat.value?.id) {
        setActiveChat(socketChat.chat)
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
    echo.value.private(`${account.messenger.name}.${account.id}.chat`).listen(`.${chat.id}.UpdateChat`, function (socketChat) {
      if (socketChat.chat.latest_customer_request === null) {
        removeChat(account, chat);
        return
      }
      chat.image = socketChat.chat.image
      chat.name = socketChat.chat.name
      chat.latest_customer_request = socketChat.chat.latest_customer_request
    })
  }

  const removeChat = (account, chat) => {
    const chatIndex = account.chats.indexOf(chat);
    if (chatIndex !== -1) {
      account.chats.splice(chatIndex, 1);
      echo.value.leave(`${account.messenger.name}.${account.id}.chat.${chat.id}`);
    }
  };

  const updateCommentsChatFromSocket = function (content, account) {
    echo.value.private(`${account.messenger.name}.${account.id}.content`).listen(`.${content.id}.UpdateContent`, function (socketContent) {
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

  const replyComment = async function (text, repliedCommentId, contentId) {
    await fetchWrapper.post(`/${activeCommentsAccount.value.messenger.name}/new-comment`, {text: text, repliedComment: repliedCommentId, contentId: contentId})
  }

  const replyToDirect = async function (form) {
    const result = (await fetchWrapper.post(`/${activeCommentsAccount.value.messenger.name}/reply-to-direct`, form)).data

    const newRoute = {
      path: '/messages',
      query: { accountId: result.account_id, chatId: result.id },
    };

    setTimeout(() => {
      router?.push(newRoute);
    }, 2000);
  }

  const searchChat = async function (search) {
    const chats = (await fetchWrapper.post(`/${activeAccount.value.messenger.name}/chats/search`, {search: search})).data

    return chats
  }

  const markAsRead = async function (message) {
    await fetchWrapper.post(`/${activeAccount.value.messenger.name}/messages/${message.id}/mark-as-read`)
  }

  const openChat = async function (chatId) {
    await fetchWrapper.post(`/${activeAccount.value.messenger.name}/chats/${chatId}/open-chat`)
  }

  const addEmojiToMessage = async function (emoji) {
    activeChat.value.message.text += emoji
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

  function setAllChatsTrue() {
    allChats.value = true;

    const newRoute = {
      path: '/messages',
    }

    router?.push(newRoute);
  }

  return {
    scrollToBottom,
    activeAccount,
    allChats,
    accounts,
    isMultipleAccounts,
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
    getLastMessage,
    searchChat,
    openChat,
    setActiveCommentsAccount,
    activeCommentsAccount,
    setActiveCommentsChat,
    activeCommentsChat,
    getComments,
    replyComment,
    replyToDirect,
    chatSortStatus,
    setAllChatsTrue
  };
}
