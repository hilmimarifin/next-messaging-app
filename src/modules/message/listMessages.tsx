import React from 'react'
import MessageItem from './messageItem'
import { IMessage } from '../../types/message'
import { useQuery } from 'react-query'
import { getListMessage } from '../../services/message'


type Props = {}
const dataDummy: IMessage[] = []
for (let i = 1; i <= 10; i++) {
    dataDummy.push({
        receiverName: `User ${i}`,
        receiverId: i.toString(),
        text: `This is meessage from user ${i} fasdfjksdajfsdhf akshfasldf jaskjdfljalsjdlkfj asdfjkljasdfjsdf alsjdflk`,
        unread: i
    })
}
const ListMessages = (props: Props) => {
    const { data, isError, isLoading } = useQuery('Fetch list Message', getListMessage)
    console.log('list of data', data);

    return (
        <div>
            {isLoading ? <div>Loading... </div> : 
                data?.data?.map((message: IMessage) =>
                <li className=' list-none' key={message.receiverId}>
                    <MessageItem  receiverName={message.receiverName} receiverId={message.receiverId} text={message.text} unread={message.unread} />
                </li>
            )}
        </div>
    )
}

export default ListMessages