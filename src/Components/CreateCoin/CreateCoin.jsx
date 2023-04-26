import { Box, Button, Card, CardContent, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from "jodit-pro-react";
import MiniDrawer from '../../Components/Drawer/Drawer'
import { Book, RestartAlt, Send } from '@mui/icons-material'
import FileInput from '../../Components/FileInput'
import AccordionComponent from '../../Components/Accordion/Accordion'
import * as userServices from '../../Services/UserServices.js'
import axios from 'axios';
import  {getToken}  from '../../Services/LocalStorageServices.js';
import * as coinServices from '../../Services/coinServices.js'
import { useNavigate } from 'react-router-dom';
import Notification from '../../Components/Notification/Notification'
import PageHeader from '../../Components/PageHeader/PageHeader';




export default function CreateCoin() {

  const [coin, setCoin] = useState({
    title: "",
    description: "",
    publishDate: "",
    publishBy: "",
    img: "",
  });

  const { title, description, publishDate, publishBy, img } = coin
  const [clearField, setClearField] = useState(coin)
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const navigate = useNavigate();
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

  const editor = useRef(null)
  const [content, setContent] = useState('')
  const config = {
    placeholder: 'Start writing your amazing coin...'
  }

  const token = getToken()
  const url = 'https://fxcryptospot-server-production.up.railway.app/api/user/loggeduser'

  useEffect(()=> {
    getUserDetail()
  }, [])
  
  const getUserDetail = async() => {
    const response = await axios.get(url, { 'headers': { 'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    } })
      .then((response => {
        coin.publishBy = response.data.user.userName
        
      }) )
      .catch((error) => {
        console.log(error);
      })
  
  };

  const handleInputChange = (e) => {
    // let {name, value} = e.target.value;
    setCoin({ ...coin, [e.target.name]: e.target.value })

  }
  const handleInputState = (name, value) => {
    setCoin((prev) => ({ ...prev, [name]: value }));

  }

  const resetForm = () => {
    setCoin(clearField)
    setContent('')
  }

  const registerCoin = async() => {
    await coinServices.createCoin(coin)
    .then((response=>{
        console.log(response.data.message)
        console.log("Redirecting to coin portal..!")
        setTimeout(() => {navigate('/coin')}, 2000);
    }))
    .catch((response) => {
        // console.log(error);
        console.log(response.data.message)
      })
}



  const handleSubmit = (e) => {
    e.preventDefault();
    coin.publishDate = currentDate
    // if (title && description && publishDate && publishBy && img) {
      registerCoin(coin)
      setNotify({
        isOpen: true,
        message: 'Coin Added Succesfully',
        type: 'success'
      })
      // addOrEdit(blog, resetForm);
      resetForm() 
      // console.log(blog, 'success')
    // }
    // else {
      // console.log("Please enter complete blog details")
      // console.log(blog, 'failed')
    // }
  }
  return (

    <>
      <Box sx={{ display: 'flex', backgroundColor: '#cfd8dc', minHeight: 100 + 'vh' }}>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <PageHeader
            icon={<Book />}
            title="Coin Posts"
            subTitle="Add New Coin"
          />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card sx={{ height: 600, maxWidth: '100%' }}>

                  <Stack direction="column">

                    <TextField id="outlined-basic" label="Blog Title" variant="outlined" name="title" autoComplete='off' value={coin.title} onChange={handleInputChange} sx={{ marginTop: '12px' }} />

                    {/* <TextField 
  multiline
  // rows={21}
  placeholder='Description'
  // sx={{'& MuiInputBase-input': {height: '500px'}}}
  /> */}

                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={newContent => {coin.description = newContent}}
                    />

                    {/* {content} */}

                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Stack direction="column">
                  <Card sx={{ height: 290 }}>
                    <Typography variant='h6' sx={{ margin: '12px', textAlign: 'center' }}>
                      Actions
                    </Typography>
                    <Divider />
                    <br />
                    <FileInput
                      name="img"
                      label="Choose Blog Image"
                      handleInputState={handleInputState}
                      type="image"
                      value={coin.img}
                    />
                    <br />
                    <Divider />
                    <br />
                    <br />
                    <Stack spacing={12} direction="row" sx={{ display: 'flex', margin: '0 auto', justifyContent: "center", alignItems: 'center' }}>

                      <Button endIcon={<RestartAlt />} variant="contained" onClick={resetForm}>Reset</Button>

                      <Button endIcon={<Send />} variant="contained" type='submit' >Publish</Button>
                    </Stack>

                  </Card>
                  <Box height={20} />

                  <Card sx={{ height: 290 }}>
                    <Typography variant='h6' sx={{ margin: '12px', textAlign: 'center' }}>
                      Recent coin Posts
                    </Typography>
                    <Divider />
                    <AccordionComponent />
                  </Card>
                </Stack>
              </Grid>

            </Grid>
          </form>
        </Box>
      </Box>
      <Notification
      notify = {notify}
      setNotify = {setNotify}
      />
    </>
  )
}
