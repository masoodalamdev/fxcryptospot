import { Box, Button, Grid, TextField, Toolbar, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import bgImg from '../../../Assets/Images/bg.jpeg'
import MuiInput from '../../../Components/Inputs/MuiInput/MuiInput'
import MuiButton from '../../../Components/MuiButton/MuiButton'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as UserServices from '../../../Services/UserServices'
import { storeToken } from '../../../Services/LocalStorageServices';
import Notification from '../../../Components/Notification/Notification'
import PageHeader from '../../../Components/PageHeader/PageHeader'
import { LockOutlined, LoginOutlined } from '@mui/icons-material'



export default function Login() {


  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [clearField, setClearField] = useState(user)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' })

  const resetForm = () => {
    setUser(clearField)

  }

  const { email, password } = user

  const navigate = useNavigate();


  const loginUser = async () => {
    await UserServices.loginUser(user)
      .then((response => {
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
        setTimeout(() => { navigate('/dashboard') }, 500);
      }))
      .catch((response) => {
        console.log(response.data.message)
      })
  }

  const handleInputChange = (e) => {
    // let {name, value} = e.target.value;
    setUser({ ...user, [e.target.name]: e.target.value })

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("All fields are required")
    } else {
      loginUser(user)
      // resetForm()

    }
  }

  const theme = useTheme()



  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, px:{xs:3, sm:10, md:12, lg:8, xl:32}, minHeight: 100 + 'vh' }} >
      <Toolbar />
      <PageHeader
        icon={<LoginOutlined />}
        title="Login"
        subTitle="Forex Crypto Spot"
      />
      <Grid container>
        <Grid item xs={12} sm={6} md={9} lg={9} xl={9} sx={{pr:{sm:4}, pb:{xs:4,sm:0}}}>
          <img src={bgImg} alt="backgroundImage" width='100%' height='100%' style={{borderRadius: '1rem'}} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}  xl={3} sx={{ bgcolor: theme.palette.background.paper, borderRadius: '1rem' }}>

          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: '25%', }}>
            Login
          </Typography>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 2},
              p:2
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
            <br />
            <MuiInput
              label='Password'
              type='password'
              name='password'
              value={user.password}
              onChange={handleInputChange}

            />
            <Typography />

            {/* <MuiButton
              text='Submit'
              variant='text'
              type='submit'
              fullWidth
              sx={{ bgcolor: '#444', color: '#fff', "&:hover": { bgcolor: '#444', color: '#fff', my:2 } }}
            /> */}
            <Button endIcon={<LockOutlined />} sx={{ textTransform: 'capitalize', py:2}} variant='outlined' fullWidth type='submit'>Submit</Button>

          </Box>
        </Grid>
      </Grid>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </Box>

  )
}
