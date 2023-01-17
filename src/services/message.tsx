import { api } from "../helpers/api"
import { DETAIL_MESSAGE_URL, IMessage, IMessagePayload, LIST_MESSAGE_URL, SEND_MESSAGE_URL } from "../types/message"

export const sendMessage = async (text: IMessagePayload, receiverId: unknown) => {
    try {
         await api.post(`${SEND_MESSAGE_URL}/${receiverId}`, {text: text}, { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}, withCredentials: true})
    } catch (error) {
        throw new Error('error found')
    }

}

export const getListMessage = async() =>{
    try {
        const res = await api.get(LIST_MESSAGE_URL, { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}, withCredentials: true})
        return res.data
    } catch (error) {
        throw new Error('error found')
    }
}

export const getDetailMessage = async(id: unknown) =>{
    try {
        const res = await api.get(`${DETAIL_MESSAGE_URL}/${id}`, { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}, withCredentials: true})
        return res.data.data
    } catch (error) {
        throw new Error('error found')
    }
}