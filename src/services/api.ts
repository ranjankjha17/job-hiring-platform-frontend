import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000/api"
})

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem("auth")
        if (stored) {
            const { token } = JSON.parse(stored)
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config
})


export default api