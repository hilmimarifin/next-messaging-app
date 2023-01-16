import axios, { AxiosRequestConfig } from 'axios'
import { refreshToken } from './authUser'
import jwt_decode from "jwt-decode";


export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_DEV,
  timeout: 60000,
  headers: {
    'content-type': 'application/json',
  }
})

api.interceptors.request.use(async (req: AxiosRequestConfig) => {
  console.log('called');
  console.log('auth', req.headers?.Authorization);

  if (req.headers?.Authorization) {
    console.log('called again');

    const authHeader = req.headers?.Authorization;

    const currentToken = authHeader && authHeader.toString().split(" ")[1];

    const decoded: any = currentToken && jwt_decode(currentToken);

    const expired = decoded?.exp;

    const currentDate = new Date();

    if (expired * 1000 < currentDate.getTime()) {
      console.log('is here 2');

      const resData = await refreshToken();
      localStorage.setItem('token', resData.token)
      req.headers.Authorization = `Bearer ${resData?.token}`

    }
  }

  return req;
}, (err: any) => {
  return Promise.reject(err);
});

api.interceptors.response.use((response) => {
  return response;

}, async (err) => {
  if (err.response) {
    // Access Token was expired
    if (err.response.status === 401) {
      localStorage.clear()
      window.location.reload()
      return Promise.reject(err)
    } else {
      return Promise.reject(err);
    }
  }
}
);