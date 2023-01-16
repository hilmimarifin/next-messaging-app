import React from 'react'
import { IMessage } from '../../types/message'
import Link from 'next/link'



const MessageItem = (props: IMessage) => {
    return (
        <div className=' p-4 border-b-2'>
            <Link  href={`messages/${props.receiverId}`}>
                <div>
                    <span className=' font-bold'>{props.receiverName}</span>
                </div>
                <div>
                    <p>{props.text}</p>
                </div>
            </Link>
        </div>
    )
}

export default MessageItem