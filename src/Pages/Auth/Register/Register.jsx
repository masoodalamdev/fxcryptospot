import { Box, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import bgImg from '../../../Assets/Images/bg.jpeg'
import MuiInput from '../../../Components/Inputs/MuiInput/MuiInput'
import MuiButton from '../../../Components/MuiButton/MuiButton'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as UserServices from '../../../Services/UserServices'
import Notification from '../../../Components/Notification/Notification'




export default function Register() {


  // /////////////////////////
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
   
});
const [clearField, setClearField] = useState(user)
const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

const resetForm = ()=>{
    setUser(clearField)
}

const { userName, email, password } = user

const navigate = useNavigate();

const registerUser = async () => {
   await UserServices.createUser(user)
   .then((response=>{
     console.log(response.data.message)
     console.log('succesfully register')
     console.log("Redirecting to login page..!")
     setNotify({
      isOpen: true,
      message: 'Registration Succesfully',
      type: 'success'
    })
    resetForm()
     setTimeout(() => {navigate('/login')}, 2000);

   }))
   .catch((response)=>{
     console.log(response.data.message)
   })
}


const handleInputChange = (e) => {
    // let {name, value} = e.target.value;
    setUser({ ...user, [e.target.name]: e.target.value })
    // console.log(user)
    // console.log(e)
  
}


const handleSubmit = (e) => {
    e.preventDefault();
    if (userName && email && password ){
    registerUser(user)
 
    // console.log(user)
        // resetForm()
    }
    else {
        console.log("All fields are required")
    // console.log(user)

    }

}




  // /////////////////////////
  
  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={8}>
    <img src={bgImg} alt="backgroundImage" width='100%' height='100%' />
  </Grid>
  <Grid item xs={4}>
 
   <Typography variant="h4" gutterBottom sx={{textAlign: 'center', mt: '25%'}}>
       Registration
      </Typography>
  <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, mr: 2 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <MuiInput
      label='Username'
      name="userName"
      fullWidth
      onChange={handleInputChange}
      value={user.userName}
      />
      <br/>
      <MuiInput
      label='Email'
      name="email"
      fullWidth
      onChange={handleInputChange}
      value={user.email}
      />
      <br/>
      <MuiInput
      label='Password'
      type='password'
      name='password'
      onChange={handleInputChange}
      value={user.password}
      
      />
      <Typography />

      <MuiButton
      text='Submit'
      variant='text'
      type="submit"
      fullWidth
      sx={{bgcolor: '#444', color: '#fff', "&:hover":{bgcolor: '#444', color: '#fff'}}}
      />
     
      
    </Box>
  </Grid>
    </Grid>
    <Notification
    notify = {notify}
    setNotify = {setNotify}
    />
    </>
  )
}
