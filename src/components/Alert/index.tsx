import React from 'react'
import { useSpring, animated } from '@react-spring/web'

type AlertProps = {
    type: "success" | "warning" | "error" | "info",
    message: string
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
    const [props, api] = useSpring(
        () => ({
            from: { opacity: 1},
            to: {  opacity: 0},
            delay: 2000
        }),
    )
    return (
        <animated.div style={props} className="toast toast-top">
            <div className={`alert ${type === "success" ? "alert-success" : type === "error" ? "alert-error" : type === "warning" ? "alert-warning" : "alert-info"} shadow-lg`}>
                <div>
                    {
                        type === "error" ? <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>

                    }
                    <span>{message}</span>
                </div>
            </div>

        </animated.div>

    )
}

export default Alert