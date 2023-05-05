import axios from "axios"
const API = axios.create({ baseURL: 'http://localhost:5230/api' })
export const userChats = async (id) => {
    try {
        const response = await API.get(`/chat/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const searchUsers = async (searchTerm) => {
    try {
        const response = await API.post('/user/search', { searchTerm })
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const createChat = async (senderId, receiverId) => {
    try {
        const response = await API.post('/chat', { senderId, receiverId })
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
