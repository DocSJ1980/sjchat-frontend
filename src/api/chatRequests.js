import axios from "axios"
const API = axios.create({ baseURL: 'https://sjchat-backend.vercel.app/api' })
export const userChats = async (id) => {
    try {
        const response = await API.get(`/chat/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
