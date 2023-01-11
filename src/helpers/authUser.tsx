import { GoogleCredential, SIGNIN_GOOGLE_URL, SIGNIN_URL, SIGNUP_GOOGLE_URL, SIGNUP_URL, SigninPayload, SignupPayload } from "../types/user"
import { api } from "./api"

export const signin = async (data: SigninPayload) => {
    try {
        const res = await api.post(SIGNIN_URL, data)
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