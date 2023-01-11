export const SIGNIN_URL = `user/login`
export const SIGNUP_URL = `user/signup`
export const SIGNOUT_URL = `user/logout`
export const SIGNIN_GOOGLE_URL = `user/login-google`
export const SIGNUP_GOOGLE_URL = `user/signup-google`
export const REFRESH_TOKEN_URL = `user/refresh-token`
export const CURRENT_USER_URL = `user/current-user`

export interface SigninPayload {
    email: string,
    password: string
}

export interface SignupPayload extends SigninPayload {
    name: string,
    // active: boolean,
    // verified: boolean,
    // roleId: number
}

export interface GoogleCredential {
    credential: string
}
