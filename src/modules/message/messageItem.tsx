import React from 'react'
import { IMessage } from '../../types/message'
import Link from 'next/link'



const MessageItem = (props: IMessage) => {
    return (
        <Link href={`messages/${props.receiverId}`}>
            <div className='flex flex-row justify-between p-4 border-b-2'>
                <div className=' flex flex-row'>
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://placeimg.com/192/192/people" />
                        </div>
                    </div>
                    <div className=' flex flex-col justify-between ml-4'>
                        <span className=' font-bold'>{props.receiverName}</span>
                        <p>{props.text}</p>
                    </div>
                </div>
                <div className=' flex flex-col justify-between'>
                    <div>
                        <time className="text-xs opacity-50">{new Date(props.createdAt).toLocaleString()}</time>
                    </div>
                    <div className='flex flex-row-reverse'>
                        {
                            props.unread? <div className=' badge badge-primary'>{props.unread}</div> : <></>
                        }
                    </div>
                </div>
            </div>

        </Link>
    )
}

export default MessageItem