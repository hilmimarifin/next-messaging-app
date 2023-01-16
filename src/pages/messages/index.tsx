import React from 'react'
import { PageWrapper } from '../../components/layout'
import ListMessages from '../../modules/message/listMessages'

type Props = {}

const MessagePage = (props: Props) => {
    
  return (
    <PageWrapper>
        <ListMessages/>
    </PageWrapper>
  )
}

export default MessagePage