import axios from 'axios'

const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_API ?? 'http://localhost:3333/api'

export const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('AUTH_TOKEN')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})
