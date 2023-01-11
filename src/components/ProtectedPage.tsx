import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type Props = {
    children: any
}

const ProtectedPage = (props: Props) => {
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push('/signin')
        }
        else {
            router.push('/')
        }

    }, [])

    return (
        <>
            {props.children}
        </>
    )
}

export default ProtectedPage