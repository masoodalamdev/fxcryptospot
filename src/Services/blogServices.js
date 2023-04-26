import axios from "axios"

const URL = "https://fxcryptospot-server-production.up.railway.app/api/fxcryptospot"


export const getAllBlogs = async () => {
    return await axios.get(`${URL}/blogs`);
}

export const createBlog = async (blog) => {
    
    return await axios.post(`${URL}/create-blog`, blog)
}

export const editBlog = async (blog, id) => {
    
    return await axios.put(`${URL}/blogs/${id}`, blog)
}

export const deleteBlog = async (id) => {
    
    return await axios.delete(`${URL}/blogs/${id}`)
}

