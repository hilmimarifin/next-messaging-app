import { useRouter } from 'next/router'
import React from 'react'
import { PageWrapper } from '../../components/layout'

type Props = {}

const DetailMessage = (props: Props) => {
  const router = useRouter()
  const { id } = router.query
  return (
    <PageWrapper>
      <div>DetailMessage from {id}</div>
    </PageWrapper>
  )
}

export default DetailMessage