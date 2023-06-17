import axios from "axios"

const URL = "http://localhost:8000/api/fxcryptospot"


export const getAllTradings = async () => {
    return await axios.get(`${URL}/trading`);
}

export const createTrading = async (trading) => {
    
    return await axios.post(`${URL}/create-trading`, trading)
}

export const editTrading = async (wallet, id) => {
    
    return await axios.put(`${URL}/wallet/${id}`, wallet)
}

export const deleteBlog = async (id) => {
    
    return await axios.delete(`${URL}/blogs/${id}`)
}

