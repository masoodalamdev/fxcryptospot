import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../Services/LocalStorageServices.js';
import React from 'react';
import Sidebar from '../Components/Sidebar/Sidebar.jsx';
import MuiFooter from '../Components/Footer/MuiFooter.jsx';




const PrivateRoutes = (props) => {
    // let authenticated = {'token':false};
    // const [auth, setAuth] = useState(false);
    // const [user, setUser] = useState(null)
    // const token = getToken('token')
    let authenticatedUser = getToken('token')
    // const url = 'https://fxcryptospot.cyclic.app/api/user/loggeduser'
  //   useEffect(() => {
  //     checkLoggedUser()
  // }, [user]);

  // const checkLoggedUser =  async () => {
  //   userServices.getLoggedUser(token)
  //   .then((response => {
  //     if (response.data.status === "success") {
  //       setAuth(true)
  //       setUser(prev => true)
  //       authenticated.token = true
  //       console.log(response.data.status, response.data.message, response.data.user)
  //       console.log(auth)
  //     }
  //   }))
  //   .catch((error) => {
  //     if (error.response.data.status === "failed") {
  //       // setAuth(false)
  //       authenticated.token = false
  //       setUser(false)

  //     }
  //   }

  //   )
  // }
 
// const checkLoggedUser = async () => {userServices.getLoggedUser(token)
//   .then((response => {
//     const authorInfo = response.data.user
//     // console.log(authorInfo)
//     // setUser(authorInfo)
//     authenticated.token = true;
//     console.log(response.data);
//     setAuth(true)
//   }))
//   .catch((error) => {
//     console.log(error.response.data);
//     authenticated.token = false;

//   })
// }

// useEffect( () => {
//   // getUserDetail()
//   axios.get(url, {
//     'headers': {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//     }
// })
// .then((res)=>{
//   console.log(res.data)
//   console.log(authenticated.token)
//   authenticated.token = true
//   console.log(authenticated.token)
//   console.count()
//   setAuth(true)

//   return () => {
//     setAuth(true)
//     authenticated.token = true
//   }
  
// })
// .catch((err)=>{
//   console.log(err.response.data)
//   console.log(authenticated.token)
//   authenticated.token = false
//   console.log(authenticated.token)
// })
// }, [])

// const getUserDetail = async () => {
//   const response = await axios.get(url, {
//       'headers': {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//       }
//   })
//       .then((response => {
//           if(response.data.message === "Logged in User") {
//               const loggedUser = response.data.user
//               setUser(loggedUser)
//               console.log(response.data)
//           }
//       }))
//       .catch((error) => {
//           // console.log(error);
//           if (error.response.data.message === "Token Expired") {
//               //     setNotify({
//               //         isOpen: true,
//               //         message: "Session expired! Please login again",
//               //         type: 'error'
//               //     })
//                   // navigate('/login')
//                   // setTimeout(() => { navigate('/login') }, 2000);
//               removeToken('token');
//               setUser(null)
//               console.log(error.response.data.message)
//           }
//           // setUser(null)
//       })
// };
// const {setSearchBar} = useOutletContext()
  const {setSearchBar} = props
return (
    authenticatedUser ? 
    <>
    <Sidebar setSearchBar = {setSearchBar}/>
    <Outlet /> 
    <MuiFooter/>
    </>
    : <Navigate to='/login'/>
    )
  }

  export default PrivateRoutes