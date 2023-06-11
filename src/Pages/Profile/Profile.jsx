import { Avatar, Box, Card, CardActions, CardHeader, Grid, IconButton, Toolbar, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PageHeader from '../../Components/PageHeader/PageHeader'
import { AdminPanelSettings, Delete, Edit } from '@mui/icons-material'
import profileImg from '../../Assets/Images/user2.jpg'
import * as userServices from '../../Services/UserServices.js'
import { getToken } from '../../Services/LocalStorageServices.js';
import axios from 'axios'

export default function Profile() {
    const [user, setUser] = useState('')
    const theme = useTheme()
    const token = getToken()
  const url = 'https://fxcryptospot.cyclic.app/api/user/loggeduser'

  useEffect(() => {
    getUserDetail()
  }, [])

  const getUserDetail = async () => {
    const response = await axios.get(url, {
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response => {
        const authorInfo = response.data.user
        // console.log(authorInfo)
        setUser(authorInfo)
      }))
      .catch((error) => {
        console.log(error);
      })

  };


    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default, minHeight: 100 + 'vh' }}>
            <Toolbar />
            <PageHeader
                icon={<AdminPanelSettings />}
                title="Profile Info"
                subTitle="Account Management"
            />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Card>
                <CardHeader
        avatar={
          <Avatar  aria-label="recipe" src={profileImg} sx={{ width: 56, height: 56 }}>
            
          </Avatar>
        }
    
        title={user && user.name}
        subheader={user && user.email}
      />
       <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Edit />
        </IconButton>
        <IconButton aria-label="share">
          <Delete />
        </IconButton>
      </CardActions>
                </Card>
                </Grid>
            </Grid>
            </Box>
            )
}
