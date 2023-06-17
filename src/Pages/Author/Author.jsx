import { Avatar, Box, Card, CardActions, CardHeader, Grid, IconButton, Toolbar, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PageHeader from '../../Components/PageHeader/PageHeader'
import { AdminPanelSettings, Delete, Edit } from '@mui/icons-material'
import profileImg from '../../Assets/Images/user2.jpg'
import * as userServices from '../../Services/UserServices.js'
import { getToken } from '../../Services/LocalStorageServices.js';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { FcBusinessman } from "react-icons/fc";
export default function Author() {
    const [author, setAuthor] = useState('')
    const theme = useTheme()
    const token = getToken()
    const { id } = useParams()
    const url = 'https://fxcryptospot.cyclic.app/api/user/loggeduser'

  const getAuthorDetails = async () => {
    let response = await userServices.getAuthorInfo(id);
    setAuthor(response.data)
        // console.log(response.data)
  }

  useEffect(() => {
    getAuthorDetails();
  }, []);


    return (
      <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, px: { xs: 3, sm: 10, md: 12, lg: 8, xl: 32 }, minHeight: 100 + 'vh' }} >
      <Toolbar />
            <PageHeader
                icon={<FcBusinessman size={24}/>}
                title="Author Info"
                subTitle="Forex Crypto Spot"
            />
            <Grid container >
                <Grid item xs={12}>
                <Card>
                <CardHeader
        avatar={
          <Avatar  aria-label="recipe" src={author && author.image} sx={{ width: 56, height: 56 }}>
          </Avatar>
        }
    
        title={author && author.name}
        subheader={author && author.email}
      />
       {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Edit />
        </IconButton>
        <IconButton aria-label="share">
          <Delete />
        </IconButton>
      </CardActions> */}
                </Card>
                </Grid>
            </Grid>
            </Box>
            )
}
