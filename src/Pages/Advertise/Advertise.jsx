import React from 'react'
import PageHeader from '../../Components/PageHeader/PageHeader'
import { Book } from '@mui/icons-material'
import  adImg from '../../Assets/Images/ad.png'
import { Box, Grid, Toolbar, useTheme } from '@mui/material'

export default function Advertise() {
  const theme = useTheme()
  return (
    <>

<Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, px:{xs:3, sm:10, md:12, lg:8, xl:32}, minHeight: 100 + 'vh' }} >
  <Toolbar/>
<PageHeader
    icon={<Book />}
    title="Advertise with us"
    subTitle="Boost Your income"
/>
<Grid container>
    <Grid item xs={12}>
    <img src={adImg} width='100%' style={{backgroundColor: theme.palette.background.paper, borderRadius: '16px'}}/>

    </Grid>
    </Grid>
  </Box>
    
   
    
    </>
  )
}
