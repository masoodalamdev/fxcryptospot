import { Box, Button, Grid, TextField, Toolbar, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import bgImg from '../../../Assets/Images/bg.jpeg'
import MuiInput from '../../../Components/Inputs/MuiInput/MuiInput'
import MuiButton from '../../../Components/MuiButton/MuiButton'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as UserServices from '../../../Services/UserServices'
import Notification from '../../../Components/Notification/Notification'
import FileInput from '../../../Components/FileInput'
import PageHeader from '../../../Components/PageHeader/PageHeader'
import { PersonAdd } from '@mui/icons-material'


export default function Register() {
  const theme = useTheme()
  const [user, setUser] = useState({
    name: "",
    userName: "",
    email: "",
    image: "",
    password: "",

  });
  const [clearField, setClearField] = useState(user)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' })

  const resetForm = () => {
    setUser(clearField)
  }

  const { name, userName, email, image, password } = user

  const navigate = useNavigate();

  const registerUser = async () => {
    await UserServices.createUser(user)
      .then((response => {
        console.log(response.data.message)
        console.log('succesfully register')
        console.log("Redirecting to login page..!")
        setNotify({
          isOpen: true,
          message: 'Registration Succesfully',
          type: 'success'
        })
        resetForm()
        setTimeout(() => { navigate('/login') }, 2000);

      }))
      .catch((response) => {
        console.log(response.data.message)
      })
  }


  const handleInputChange = (e) => {
    // let {name, value} = e.target.value;
    setUser({ ...user, [e.target.name]: e.target.value })
    // console.log(user)
    // console.log(e)

  }

  const handleInputState = (name, value) => {
    setUser((prev) => ({ ...prev, [name]: value }));

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName && email && password) {
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
      <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, px:{xs:3, sm:10, md:12, lg:8, xl:32}, minHeight: 100 + 'vh' }} >
      <Toolbar />
      <PageHeader
        icon={<PersonAdd />}
        title="Register"
        subTitle="Forex Crypto Spot"
      />
      <Grid container>
        <Grid item xs={12} sm={6} md={9} lg={9} xl={9} sx={{pr:{sm:4}, pb:{xs:4,sm:0}}}>
          <img src={bgImg} alt="backgroundImage" width='100%' height='100%' style={{borderRadius: '1rem'}} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}  xl={3} sx={{ bgcolor: theme.palette.background.paper, borderRadius: '1rem' }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: '25%', }}>
            Register
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
              label='Name'
              name="name"
              fullWidth
              onChange={handleInputChange}
              value={user.name}
            />
            <br />
            <MuiInput
              label='Username'
              name="userName"
              fullWidth
              onChange={handleInputChange}
              value={user.userName}
            />
            <br />
            <MuiInput
              label='Email'
              name="email"
              fullWidth
              onChange={handleInputChange}
              value={user.email}
            />
            <br />



            <FileInput
              name="image"
              label="Upload Your Pic"
              handleInputState={handleInputState}
              type="image"
              value={user.image}
            />

            <MuiInput
              label='Password'
              type='password'
              name='password'
              onChange={handleInputChange}
              value={user.password}

            />

            {/* <MuiButton
              text='Submit'
              variant='text'
              type="submit"
              fullWidth
              sx={{ bgcolor: '#444', color: '#fff', "&:hover": { bgcolor: '#444', color: '#fff' }, my:2  }}
            /> */}
            <Button endIcon={<PersonAdd />} sx={{ textTransform: 'capitalize', py:2}} variant='outlined' fullWidth type='submit'>Submit</Button>

          </Box>
        </Grid>
      </Grid>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </Box>

      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </>
  )
}
