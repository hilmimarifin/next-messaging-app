import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_DEV,
  timeout: 60000,
  headers: {
    'content-type': 'application/json'
  }
})