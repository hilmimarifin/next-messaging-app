import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type Props = {
    children: any
}

const ProtectedPage = (props: Props) => {
    const router = useRouter()
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        console.log('windows pathname', window.location.pathname);

        if (!token) {
            router.push('/signin')
        }
        else {
            window.location.pathname === '/signin' || window.location.pathname === '/signup' ? router.push(`/`) : 
            router.push(`${window.location.pathname}`)
        }

    }, [])

    return (
        <>
            {props.children}
        </>
    )
}

export default ProtectedPage