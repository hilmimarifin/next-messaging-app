export const LIST_MESSAGE_URL = 'messages'
export const DETAIL_MESSAGE_URL = 'mesage/:id'
export const SEND_MESSAGE_URL = 'message'

export interface IMessage {
    receiverName: string,
    receiverId: string,
    text: string,
    unread: number,
}

export interface IMessagePayload {
    message: string
}