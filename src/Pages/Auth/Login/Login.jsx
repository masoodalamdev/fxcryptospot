import { Box, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import bgImg from '../../../Assets/Images/bg.jpeg'
import MuiInput from '../../../Components/Inputs/MuiInput/MuiInput'
import MuiButton from '../../../Components/MuiButton/MuiButton'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as UserServices from '../../../Services/UserServices'
import { storeToken } from '../../../Services/LocalStorageServices';

import Notification from '../../../Components/Notification/Notification'



export default function Login() {


  const [user, setUser] = useState({
    email: "",
    password: "",
});

const [clearField, setClearField] = useState(user)
const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

const resetForm = ()=>{
    setUser(clearField)

}

const { email, password } = user

const navigate = useNavigate();


const loginUser = async () => {
await UserServices.loginUser(user)
.then((response=>{
  console.log(response.data.message)
  console.log("Hello " + response.data.name)
  // console.log(user)
  setNotify({
    isOpen: true,
    message: 'Login Succesfully',
    type: 'success'
  })
  resetForm()
  // TOKEN STORE
  storeToken(response.data.token)
  setTimeout(() => {navigate('/admin')}, 500);
})) 
.catch((response)=>{
  console.log(response.data.message)
})
}

const handleInputChange = (e) => {
    // let {name, value} = e.target.value;
    setUser({ ...user, [e.target.name]: e.target.value })
  
}

const handleSubmit = (e) => {
    e.preventDefault();
    if ( !email || !password ) {
        console.log("All fields are required")
    } else {
        loginUser(user)
        // resetForm()
        
    }
}




  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={8}>
    <img src={bgImg} alt="backgroundImage" width='100%' height='100%' />
  </Grid>
  <Grid item xs={4}>
   
   <Typography variant="h4" gutterBottom sx={{textAlign: 'center', mt: '25%'}}>
       Login
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
      label='Email'
      fullWidth
      name='email'
      value={user.email}
      onChange={handleInputChange}
      />
      <br/>
      <MuiInput
      label='Password'
      type='password'
      name='password'
      value={user.password}
      onChange={handleInputChange}

      />
      <Typography />

      <MuiButton
      text='Submit'
      variant='text'
      type='submit'
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
