import axios from "axios"
import { BASE_URL } from "../utils/constants"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getTodos = async () => {
    
    await delay()
    const response = await axios.get(`${BASE_URL}/todo`)
    return response.data
}

export const addTodo = async (data) => {
    await delay()
    const response = await axios.post(`${BASE_URL}/todo`, data)
    return response.data
}

export const updateTodo = async (data) => {
    console.log(data)
    await delay()
    const response = await axios.put(`${BASE_URL}/todo/${data.id}`, data)
    return response.data
}

export const deleteTodo = async ({ id }) => {
    await delay()
    const response = await axios.delete(`${BASE_URL}/todo/${id}`)
    return response.data
}