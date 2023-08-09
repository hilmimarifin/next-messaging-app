import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { PageWrapper } from '../../components/layout'
import { useMutation, useQuery } from 'react-query'
import { getDetailMessage, sendMessage } from '../../services/message'
import { IDetailMessage } from '../../types/message'


type Props = {}

const DetailMessage = (props: Props) => {
  const router = useRouter()
  const { id } = router.query
  const [title, setTitle] = useState("")
  const { data: messages, isError, isLoading } = useQuery('Get Detail Message', () => getDetailMessage(id as string), {onSuccess: async(data)=> setTitle(data[1]?.senderName)})
  const { mutate: send } = useMutation((e: any)=>sendMessage(e, id))

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter'){
      send(e.target.value);   
    }
  }
  return (
    <PageWrapper title={title}>
      <div className='flex flex-col h-[calc(100vh-4rem)] w-[425px] overflow-scroll m-auto px-3'>
        {
          isLoading ? <div>Loading...</div> :
            <div className=' grow'>
              {messages.map((message: IDetailMessage, index: any) => {
                return <MessageBubble
                  key={index}
                  createdAt={message.createdAt}
                  id={id as string}
                  senderId={message.senderId}
                  senderName={message.senderName}
                  text={message.text}
                />
              })}
            </div>
        }
        <div className=' sticky bottom-1'>
          <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" onKeyDown={handleKeyDown} />
        </div>
      </div>
    </PageWrapper>
  )
}

interface MessageBubbleProps extends IDetailMessage {
  id: string
}
const MessageBubble: FC<MessageBubbleProps> = ({ createdAt, senderId, senderName, text, id }) => {
  return (
    <div className={`chat chat-${senderId === parseInt(id) ? 'start' : 'end'}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
      <div className="chat-header">
        {senderName}
      </div>
      <div className={`chat-bubble chat-bubble-${senderId === parseInt(id) ? 'primary' : 'secondary'}`}>{text}</div>
      <div className="chat-footer opacity-50">
        <time className="text-xs opacity-50">{new Date(createdAt).toLocaleString()}</time>
      </div>
    </div>
  )
}
export default DetailMessage