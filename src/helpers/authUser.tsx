import { GoogleCredential, REFRESH_TOKEN_URL, SIGNIN_GOOGLE_URL, SIGNIN_URL, SIGNOUT_URL, SIGNUP_GOOGLE_URL, SIGNUP_URL, SigninPayload, SignupPayload } from "../types/user"
import { api } from "./api"

export const signin = async (data: SigninPayload) => {
    try {
        const res = await api.post(SIGNIN_URL, data, {withCredentials: true})
        const userData = await res.data.data
        localStorage.setItem("userData", JSON.stringify(userData))
        localStorage.setItem("token", userData.token)
        window.location.reload()

    } catch (error) {
        throw new Error('error found')
    }

}

export const signinGoogle = async (data: GoogleCredential) => {
    try {
        const res = await api.post(SIGNIN_GOOGLE_URL, data)
        const userData = await res.data.data
        localStorage.setItem("userData", JSON.stringify(userData))
        localStorage.setItem("token", userData.token)
        window.location.reload()

    } catch (error) {
        return Error
    }

}

export const signup = async (data: SignupPayload) => {
    try {
        await api.post(SIGNUP_URL, data)
        await signin({ email: data.email, password: data.password })
    } catch (error) {
        return Error
    }

}

export const signupGoogle = async (data: GoogleCredential) => {
    try {
        const res = await api.post(SIGNUP_GOOGLE_URL, data)
        console.log('respon google', res)
        signinGoogle(data)
    } catch (error) {
        return Error
    }

}

export const refreshToken = async () => {
    try {
        const res = await api.get(REFRESH_TOKEN_URL, {withCredentials: true})
        const userData = await res.data.data
        return userData
    } catch (error) {
        throw new Error('error found')
    }

}

export const signout = async () => {
    try {
        console.log('log out');
        await api.get(SIGNOUT_URL,  { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}, withCredentials: true})
        localStorage.clear()
        window.location.reload()
    } catch (error) {
        return Error
    }

}


