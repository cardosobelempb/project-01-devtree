import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API ?? 'http://localhost:3333/api'

export const api = axios.create({
    baseURL: BASE_URL,
})
