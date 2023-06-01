import { Box, Card, CardContent, Grid, Stack, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Book, Info } from '@mui/icons-material'
import { styled, useTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import PageHeader from '../../Components/PageHeader/PageHeader'
import MuiCardView from '../../Components/MuiCardView/MuiCardView';
import contactus from '../../Assets/Images/contactus.jpg'

const handleEdit = ()=>{
    alert('edited succesfully')
  }
  const handleDelete = ()=>{
    alert('deleted succesfully')
  }
  const handleFavorite = ()=>{
    alert('favorite added succesfully')
  }
  const handleShare = ()=>{
    alert('share succesfully')
  }
export default function Sitemap() {
const theme = useTheme()
    
      
    return (

        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default, minHeight: 100 + 'vh'  }}>
<Toolbar/>
        <PageHeader
            icon={<Info />}
            title="Sitemap"
            subTitle="Forex Crypto Spot"
        />
          <MuiCardView
          image='https://www.searchenginejournal.com/wp-content/uploads/2020/12/sitemaps-featured-image-5fd1c052b40ef.png'
          profileImage='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
          title="Forex Crypto Spot"
          categoryAndDate="01-01-2018"
          description= "Welcome to Forex Crypto Spot, a blog website dedicated to providing valuable information and insights on Forex trading, cryptocurrency, buying and selling, and exchanging crypto coins My name is Masood Alam and I am the founder and primary contributor to this website With years of experience in the financial industry particularly in Forex and cryptocurrency trading I have gained a wealth of knowledge and expertise that I am passionate about sharing with my readers Through this blog I aim to provide readers with relevant and up-to-date information on Forex and crypto trading including market trends, analysis, and trading strategies. I believe that the world of finance is constantly evolving, and keeping up with the latest developments is crucial for anyone looking to make informed investment decisions Whether you are a seasoned trader or just starting in the world of finance, my goal is to provide you with valuable insights and resources to help you succeed in your investment journey. From beginner-friendly guides to in-depth analysis, Forex Crypto Spot is your go-to source for all things Forex and crypto Thank you for visiting my website, and I hope you find the information here helpful and informative. If you have any questions or comments, please don't hesitate to get in touch!"
          // id={item._id}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleFavorite = {handleFavorite}
          handleShare = {handleShare}
          />
</Box>
    )
}
