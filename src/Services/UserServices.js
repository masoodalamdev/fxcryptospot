import axios from "axios"
import {getToken, } from '../Services/LocalStorageServices'
const URL = "https://fxcryptospot.cyclic.app/api/user"
const token = getToken()

export const getLoggedUser = async (token) => {
    return await axios.get(URL+'/loggeduser', {
        'headers': {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const authenticatedUser = async(token) => {
  const response =  await axios.get(URL, {
                'headers': {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response => {
                    if(response.data.message === "Logged in User") return true
                    else return false
                }))
                .catch((error) => {
                    // console.log(error);
                    if (error.response.data.message === "Token Expired") {
                       return false
                       return error.response.data
                       console.log(error)

                    }
                    })
}
// export const authenticatedUser = async() => {
//     const response = await axios.get(URL, {
//                 'headers': {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             })
//                 .then((response => {
//                     if(response.data.message === "Logged in User") {
//                        return true
//                     }
//                 }))
//                 .catch((error) => {
//                     // console.log(error);
//                     if (error.response.data.message === "Token Expired") {
//                        return false
//                     }
//                     })
// }



// const getUserDetail = async () => {
//     const response = await axios.get(URL, {
//         'headers': {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//     })
//         .then((response => {
//             if(response.data.message === "Logged in User") {
//                 const loggedUser = response.data.user
//                 setUser(loggedUser)
//                 // console.log(response.data)
//             }
//         }))
//         .catch((error) => {
//             // console.log(error);
//             if (error.response.data.message === "Token Expired") {
//                 //     setNotify({
//                 //         isOpen: true,
//                 //         message: "Session expired! Please login again",
//                 //         type: 'error'
//                 //     })
//                     // navigate('/login')
//                     // setTimeout(() => { navigate('/login') }, 2000);
//                 // removeToken('token');
//                 // setUser(null)
//                 // console.log(error.response.data.message)
//             }
//             // setUser(null)
//         })
// };


export const getAllUsers = async () => {
    return await axios.get(`${URL}/users`);
}
export const getAuthorInfo = async (id) => {
    return await axios.get(`${URL}/author/${id}`);
}
export const createUser = async (user) => {
    
    return await axios.post(`${URL}/register`, user)
}

export const loginUser = async (user) => {
    return await axios.post(`${URL}/login`, user);
}


export const editUser = async (user, id) => {
    
    return await axios.put(`${URL}/user/${id}`, user)
}

export const deleteUser = async (id) => {
    
    return await axios.delete(`${URL}/user/${id}`)
}

