import React from 'react'
import MessageItem from './messageItem'
import { IMessage } from '../../types/message'
import { useQuery, useQueryClient } from 'react-query'
import { getListMessage } from '../../services/message'
import { io } from "socket.io-client";

type Props = {}
const ListMessages = (props: Props) => {
    const queryClient = useQueryClient()
    const { data, isError, isLoading } = useQuery('Fetch list Message', getListMessage)
    const socket = io('http://localhost:5001');
    socket.on("messageSent", (arg) => {
        console.log(arg);
        queryClient.invalidateQueries("Fetch list Message")
      });
    return (
        <div className=' w-[425px] m-auto'>
            {isLoading ? <div>Loading... </div> : 
                data?.data?.map((message: IMessage) =>
                <li className=' list-none' key={message.receiverId}>
                    <MessageItem  receiverName={message.receiverName} receiverId={message.receiverId} text={message.text} unread={message.unread} createdAt={message.createdAt}/>
                </li>
            )}
        </div>
    )
}

export default ListMessages