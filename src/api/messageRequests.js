import axios from "axios"
const API = axios.create({ baseURL: 'https://sjchat-backend.vercel.app/api' })
export const getMessages = async (id) => {
    try {
        const response = await API.get(`/message/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
