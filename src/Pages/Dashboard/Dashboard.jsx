import { Book, DashboardOutlined, Group, Groups, Home, School, VideoLibrary, Work } from '@mui/icons-material'
import { Box, Card, CardContent, Grid, Stack, Toolbar, Typography, useTheme } from '@mui/material'
import React from 'react'
import MiniDrawer from '../../Components/Drawer/Drawer'
import PageHeader from '../../Components/PageHeader/PageHeader'
import AccordionComponent from '../../Components/Accordion/Accordion'
import AreaChartComponent from '../../Components/Charts/AreaChartComponent'
import BarChartComponent from '../../Components/Charts/BarChartComponent'
import PieChartComponent from '../../Components/Charts/PieChartComponent'
import TinyLineChart from '../../Components/Charts/TinyLineChart'

export default function Dashboard() {
    const theme = useTheme()
    return (
        <>
            {/* <Box sx={{ display: 'flex', backgroundColor: '#cfd8dc', minHeight: 100 + 'vh' }}> */}


                {/* <MiniDrawer /> */}

                <Box component="main" sx={{ flexGrow: 1, p: 3 , bgcolor: theme.palette.background.default}}>
                    <Toolbar/>
                <PageHeader
                    icon={<DashboardOutlined />}
                    title="Dashboard"
                    subTitle="Admin Tools"
                />
                    {/* <Box height={20} /> */}
                    <Grid container spacing={2}>
                            {/* <Stack spacing={1.5} direction='row'> */}
                        <Grid item xs={2.4}>
                                <Card sx={{  height: 150 }}>

                                    <span style={{ textAlign: 'center', fontWeight: 'bold', display: 'block', marginTop: '5px' }}>Blogs</span>
                                  
                                    <AreaChartComponent
                                        strokeColor="#02bf2e" backgroundColor='#50fa78'
                                    />


                                </Card>
                                </Grid>
                                <Grid item xs={2.4}>
                                <Card sx={{ height: 150 }}>

                                    <span style={{ textAlign: 'center', fontWeight: 'bold', display: 'block', marginTop: '5px' }}>Wallets</span>
                                  


                                    <AreaChartComponent
                                        strokeColor="#f5070f" backgroundColor='#ed6f74'
                                    />
                                </Card>
                                </Grid>
                                <Grid item xs={2.4}>
                                <Card sx={{  height: 150 }}>

                                    <span style={{ textAlign: 'center', fontWeight: 'bold', display: 'block', marginTop: '5px' }}>Coins</span>
                                    
                                    <AreaChartComponent
                                        strokeColor="#02a89d" backgroundColor='#7ef7ef'
                                    />

                                </Card>
                                </Grid>
                                <Grid item xs={2.4}>
                                <Card sx={{ height: 150 }}>

                                    <span style={{ textAlign: 'center', fontWeight: 'bold', display: 'block', marginTop: '5px' }}>Trading</span>
                                   
                                    <AreaChartComponent
                                        strokeColor="#fc8105" backgroundColor='#fca956'
                                    />



                                </Card>
                                </Grid>
                                <Grid item xs={2.4}>
                                <Card sx={{ height: 150 }}>

                                    <span style={{ textAlign: 'center', fontWeight: 'bold', display: 'block', marginTop: '5px' }}>Affiliate</span>
                                  

                                    <AreaChartComponent
                                        strokeColor="#1105b0" backgroundColor='#9089f0'
                                    />

                                </Card>
                                </Grid>
                               
               

                    </Grid>
                    <Box height={20} />

                        
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Card sx={{ height: 25 + 'vh' }}>

                                <CardContent>
                                    <Typography variant='h6'>Buy Crypto</Typography>
                                    <TinyLineChart />

                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: 25 + 'vh' }}>

                                <CardContent>
                                    <Typography variant='h6'>Sell Crypto</Typography>
                                    <TinyLineChart />


                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: 25 + 'vh' }}>

                                <CardContent>

                                    <Typography variant='h6'>Exchange Crypto</Typography>
                                    <BarChartComponent />

                                </CardContent>

                            </Card>
                        </Grid>

                    </Grid>
                    <Box height={20} />
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Card sx={{ height: 30 + 'vh' }}>

                                <CardContent>
                                    <Typography variant='h6'>Apps</Typography>
                                    <PieChartComponent />

                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: 30 + 'vh' }}>

                                <CardContent>

                                    <Typography variant='h6'>Earn Crypto</Typography>
                                    <BarChartComponent />

                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: 30 + 'vh' }}>

                                <CardContent>
                                    <div className='paddingAll'>
                                        <span className='priceTitle'>BlockChain</span>
                                    </div>
                                    <AccordionComponent />

                                </CardContent>

                            </Card>
                        </Grid>

                    </Grid>
                </Box>

            {/* </Box> */}
        </>
    )
}
