import { Box, Toolbar, useTheme } from '@mui/material'
import React from 'react'
import PageHeader from '../../Components/PageHeader/PageHeader'
import { Info } from '@mui/icons-material'
import MuiCardView from '../../Components/MuiCardView/MuiCardView'
import aboutme from '../../Assets/Images/aboutme.jpg'
import { FcAndroidOs } from 'react-icons/fc'
import MuiFooter from '../../Components/Footer/MuiFooter'

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

export default function App() {
  const theme = useTheme()
  return (

    <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default, minHeight: 100 + 'vh'  }}>
<Toolbar/>
        <PageHeader
            icon={<FcAndroidOs size={24} />}
            title="Apps"
            subTitle="Forex Crypto Spot"
        />
          <MuiCardView
          image='https://miro.medium.com/v2/resize:fit:1200/1*EBTWmUxeduGh0n7gv4EiNA.jpeg'
          profileImage='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
          title="Crypto Apps"
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
