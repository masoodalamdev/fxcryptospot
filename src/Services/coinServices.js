import axios from "axios"

const URL = "http://localhost:8000/api/fxcryptospot"


export const getAllCoins = async () => {
    return await axios.get(`${URL}/coin`);
}

export const createCoin = async (coin) => {
    
    return await axios.post(`${URL}/create-coin`, coin)
}

export const editCoin = async (coin, id) => {
    
    return await axios.put(`${URL}/coin/${id}`, coin)
}

export const deleteBlog = async (id) => {
    
    return await axios.delete(`${URL}/blogs/${id}`)
}

