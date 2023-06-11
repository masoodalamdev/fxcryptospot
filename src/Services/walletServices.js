import axios from "axios"

const URL = "http://localhost:8000/api/fxcryptospot"


export const getAllWallets = async () => {
    return await axios.get(`${URL}/wallet`);
}

export const createWallet = async (wallet) => {
    
    return await axios.post(`${URL}/create-wallet`, wallet)
}

export const editWallet = async (wallet, id) => {
    
    return await axios.put(`${URL}/wallet/${id}`, wallet)
}

export const deleteBlog = async (id) => {
    
    return await axios.delete(`${URL}/blogs/${id}`)
}

