import {ref} from "vue";

export const fileModal = ref(false);
export const emojiModal = ref({status: false});
export const checkedMessageData = ref({message:undefined, styles: undefined});
export const closingChatModal = ref({status: false});
export const searchContactModal = ref({status: false});
export const newChatModal = ref({status: false});
export const replyToDirectModal = ref({status: false, repliedCommentId: undefined, contentId: undefined});
export const createTaskModal = ref({status: false});
export const recomendedTaskModal = ref({status: false});
