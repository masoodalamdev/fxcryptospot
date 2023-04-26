import { Book, DashboardOutlined, Group, Groups, Home, School, VideoLibrary, Work } from '@mui/icons-material'
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import MiniDrawer from '../../Components/Drawer/Drawer'
import PageHeader from '../../Components/PageHeader/PageHeader'


export default function Dashboard() {
    return (
        <>
            {/* <Box sx={{ display: 'flex', backgroundColor: '#cfd8dc', minHeight: 100 + 'vh' }}> */}


                {/* <MiniDrawer /> */}

                <Box component="main" sx={{ flexGrow: 1, p: 3 , bgcolor: '#cfd8dc'}}>
                <PageHeader
                    icon={<Book />}
                    title="Blog Posts"
                    subTitle="Read Amazing Blogs"
                />
                    {/* <Box height={20} /> */}
                    <Grid container spacing={2}>
                            {/* <Stack spacing={1.5} direction='row'> */}
                        <Grid item xs={2.4}>
                                <Card sx={{  height: 150 }}>

                                    <span style={{ textAlign: 'center', fontWeight: 'bold', display: 'block', marginTop: '5px' }}>SCHOOLS</span>
                                  



                                </Card>
                                </Grid>
                                <Grid item xs={2.4}>
                                <Card sx={{ height: 150 }}>

                                    <span style={{ textAlign: 'center', fontWeight: 'bold', display: 'block', marginTop: '5px' }}>TEACHERS</span>
                                  



                                </Card>
                                </Grid>
                                <Grid item xs={2.4}>
                                <Card sx={{  height: 150 }}>

                                    <span style={{ textAlign: 'center', fontWeight: 'bold', display: 'block', marginTop: '5px' }}>STUDENTS</span>
                                    


                                </Card>
                                </Grid>
                                <Grid item xs={2.4}>
                                <Card sx={{ height: 150 }}>

                                    <span style={{ textAlign: 'center', fontWeight: 'bold', display: 'block', marginTop: '5px' }}>BLOGS</span>
                                   



                                </Card>
                                </Grid>
                                <Grid item xs={2.4}>
                                <Card sx={{ height: 150 }}>

                                    <span style={{ textAlign: 'center', fontWeight: 'bold', display: 'block', marginTop: '5px' }}>JOBS</span>
                                  



                                </Card>
                                </Grid>
                               
               

                    </Grid>
                    <Box height={20} />

                        
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Card sx={{ height: 25 + 'vh' }}>

                                <CardContent>
                                    <Typography variant='h6'>Admissions</Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: 25 + 'vh' }}>

                                <CardContent>
                                    <Typography variant='h6'>Fee Collections</Typography>


                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: 25 + 'vh' }}>

                                <CardContent>

                                    <Typography variant='h6'>Results</Typography>

                                </CardContent>

                            </Card>
                        </Grid>

                    </Grid>
                    <Box height={20} />
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Card sx={{ height: 30 + 'vh' }}>

                                <CardContent>
                                    <Typography variant='h6'>Attendance</Typography>

                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: 30 + 'vh' }}>

                                <CardContent>

                                    <Typography variant='h6'>Salary</Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: 30 + 'vh' }}>

                                <CardContent>
                                    <div className='paddingAll'>
                                        <span className='priceTitle'>Notice Board</span>
                                    </div>

                                </CardContent>

                            </Card>
                        </Grid>

                    </Grid>
                </Box>

            {/* </Box> */}
        </>
    )
}
