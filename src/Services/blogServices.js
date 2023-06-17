import axios from "axios"

// const URL = "http://localhost:8000/api/fxcryptospot"
const URL = "http://localhost:8000/api/fxcryptospot"


export const getAllBlogs = async () => {
    return await axios.get(`${URL}/blogs`);
}
export const getBlockchainBlogs = async () => {
    return await axios.get(`${URL}/blogs/blockchain`);
}
export const getWalletBlogs = async () => {
    return await axios.get(`${URL}/blogs/wallet`);
}
export const getCoinBlogs = async () => {
    return await axios.get(`${URL}/blogs/coin`);
}
export const getTradingBlogs = async () => {
    return await axios.get(`${URL}/blogs/trading`);
}
export const getBlogById= async (id) => {
    return await axios.get(`${URL}/blog-id/${id}`);
}
export const getBlogBySlug = async (slug) => {
    return await axios.get(`${URL}/blog/${slug}`);
}

export const createBlog = async (blog) => {
    
    return await axios.post(`${URL}/create-blog`, blog)
}

export const editBlog = async (id, blog) => {
    
    return await axios.put(`${URL}/blog-edit/${id}`, blog)
}

export const deleteBlog = async (id) => {
    
    return await axios.delete(`${URL}/delete-blog/${id}`)
}

export const getCategory = ()=>([
    { name: 'Bitcoin', value: 'Bitcoin' },
    { name: 'Crypto Currency', value: 'CryptoCurrency' },
    { name: 'Blockchain', value: 'Blockchain' },
    { name: 'Ethereum', value: 'Ethereum' },
    { name: 'Mining', value: 'Mining' },
    { name: 'Trading', value: 'Trading' },
    { name: 'Wallet', value: 'Wallet' },
    { name: 'Coin', value: 'Coin' },
])
export const getTags = ()=>([
     'Bitcoin', 'Blockchain', 'Ethereum','Mining', 'Trading', 'Crypto Currency', 'Wallet', 'Coin'
])
export const getStatus = ()=>([
    { name: 'Publish', value: 'PUBLISHED' },
    { name: 'Draft', value: 'DRAFTED' }
])
