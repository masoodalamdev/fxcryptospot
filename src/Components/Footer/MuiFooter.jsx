import { Box, Grid, List, ListItemButton, ListItemText, Typography, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Assets/logo.png'
import logodark from '../../Assets/logodark.png'
import { ColorModeContext } from '../../Store'

export default function MuiFooter() {
     const { mode } = useContext(ColorModeContext)

     const theme = useTheme()
     return (
          <Box
               component="footer"
               sx={{ bgcolor: theme.palette.background.paper }}
          // sx={{ mt: 6, bgcolor: theme.palette.background.paper, p:{md:10} }}
          >
               <Grid container sx={{ px: { xs: 3, sm: 10, md: 12, lg: 8, xl: 32 }, py: { xs: 3, md: 8 }, mt: { xs: 3, sm: 10, md: 12, lg: 8, xl: 32 } }}
               // direction="row"
               //   justifyContent="space-between"
               //   alignItems="center"
               >
                    <Grid item xs={12} sm={12} md={6} lg={6} sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }} >

                         <img src={mode === 'light' ? logo : logodark} alt='logo' />

                         <Typography variant="body1">
                              {"Copyright © "}
                              <Link to="https://fxcryptospot.com/" style={{ textDecoration: 'none' }}>
                                   Forex Crypto Spot
                              </Link>{" "}
                              {new Date().getFullYear()}
                              {"."}
                         </Typography>


                    </Grid>




                    <Grid item xs={12} sm={4} md={2} lg={2} sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' }, px: { xs: 8, sm: 8, md: 0, lg: 0, xl: 0 } }}>

                         <Typography variant="h6"  >
                              Quick Links
                         </Typography>
                         <List component="div" disablePadding>
                              <ListItemButton component='a' href='/advertise'>
                                   <ListItemText primary="Advertise with us" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }} />
                              </ListItemButton>
                              <ListItemButton component='a' href='/contact' >
                                   <ListItemText primary="Contact us" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }} />
                              </ListItemButton>
                              <ListItemButton component='a' href='/about'>
                                   <ListItemText primary="About us" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }} />
                              </ListItemButton>
                         </List>
                    </Grid>



                    <Grid item xs={12} sm={4} md={2} lg={2} sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' }, px: { xs: 8, sm: 8, md: 0, lg: 0, xl: 0 } }}>

                         <Typography variant="h6"  >
                              Legal Stuff
                         </Typography>
                         <List component="div" disablePadding>
                              <ListItemButton component='a' href='/privacy-policy'>
                                   <ListItemText primary="Privacy Policy" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }} />
                              </ListItemButton>
                              <ListItemButton component='a' href='/privacy-policy'>
                                   <ListItemText primary="Terms of use" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }} />
                              </ListItemButton>
                              <ListItemButton component='a' href='/sitemap'>
                                   <ListItemText primary="Sitemap" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }} />
                              </ListItemButton>
                         </List>
                    </Grid>

                    <Grid item xs={12} sm={4} md={2} lg={2} sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' }, px: { xs: 8, sm: 8, md: 0, lg: 0, xl: 0 } }}>
                         <Typography variant="h6"  >
                              Follow Us
                         </Typography>
                         <List component="div" disablePadding >
                              <ListItemButton component='a' href='https://www.facebook.com/' >
                                 
                                   <ListItemText primary="Facebook" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }} />
                              </ListItemButton>
                              <ListItemButton component='a' href='https://www.instagram.com/'>
                                  
                                   <ListItemText primary="Instagram" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }} />
                              </ListItemButton>
                              <ListItemButton component='a' href='https://www.twitter.com/'>
                                 
                                   <ListItemText primary="Twitter" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }} />
                              </ListItemButton>
                         </List>


                    </Grid>
               </Grid>
          </Box>
     )
}
