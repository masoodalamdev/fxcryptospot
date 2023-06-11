import { Facebook, Instagram, Twitter } from '@mui/icons-material'
import { Box, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Toolbar, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Assets/logo.png'

export default function MuiFooter() {
    const theme = useTheme()
    return (
        <Box
            component="footer"
            sx={{ p: { xs: 1, sm: 1, md: 3, lg: 3 }, bgcolor: theme.palette.background.paper }}
        >
            <Grid container spacing={2} >
                <Grid item xs={12} sm={9} md={9} lg={9}>
                   <Stack direction='row'>
                    <img src={logo} height="50px" width="150px" style={{margin: '16px'}}/>
                    <Typography variant="body2" color="text.primary" align='left' sx={{p:2}}>
                    Forex Crypto Spot! Blog website dedicated to providing valuable information and insights on Forex trading, cryptocurrency, buying and selling, and exchanging crypto coins. 
                    </Typography>

                   </Stack>

                </Grid>
            

                <Grid item xs={12} sm={3} md={3} lg={3} sx={{p:2}}>
                <Stack direction="column" justifyContent="center">
                    <Typography variant="h6" color="text.primary" align='center'>
                        Follow Us
                    </Typography>
                  
                <Stack direction="row" justifyContent="center">
                    <Link href="https://www.facebook.com/" color="inherit">
                        <Facebook />
                    </Link>
                    <Link
                        href="https://www.instagram.com/"
                        color="inherit"
                        sx={{ pl: 1, pr: 1 }}
                    >
                        <Instagram />
                    </Link>
                    <Link href="https://www.twitter.com/" color="inherit">
                        <Twitter />
                    </Link>
                    </Stack>
                    </Stack>
                </Grid>
            </Grid>
       <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>

         <Typography variant="body2" color="text.secondary" textAlign='center'>
        {"Copyright © "}
            <Link color="inherit" href="https://fxcryptospot.com/" style={{textDecoration: 'none'}}>
           Forex Crypto Spot
          </Link>{" "}
        {new Date().getFullYear()}
        {"."}
       </Typography>
     </Grid>
     </Grid>
        </Box>
    )
}
