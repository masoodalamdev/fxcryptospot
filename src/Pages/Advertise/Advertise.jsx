import React from 'react'
import PageHeader from '../../Components/PageHeader/PageHeader'
import { Book } from '@mui/icons-material'
import  adImg from '../../Assets/Images/ad.png'
import { Box, Grid } from '@mui/material'

export default function Advertise() {
  return (
    <>
      <Box sx={{ display: 'flex', backgroundColor: '#cfd8dc', minHeight: 100 + 'vh' }}>

<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
<PageHeader
    icon={<Book />}
    title="Advertise with us"
    subTitle="Boost Your income"
/>
<Grid container>
    <Grid item xs={12}>
    <img src={adImg} width='100%' />

    </Grid>
    </Grid>
  </Box>
  </Box>
    
   
    
    </>
  )
}
