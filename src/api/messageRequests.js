import axios from "axios"
const API = axios.create({ baseURL: '/api' })
export const getMessages = async (id) => {
    try {
        const response = await API.get(`/message/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const addMessage = async (data) => {
    try {
        const response = await API.post("/message/", data)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
