import { Box, Card, CardContent, Grid, InputBase, Toolbar, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import AccordionComponent from '../../../Components/Accordion/Accordion'
import AreaChartComponent from '../../../Components/Charts/AreaChartComponent'
import BarChartComponent from '../../../Components/Charts/BarChartComponent'
import PieChartComponent from '../../../Components/Charts/PieChartComponent'
import TinyLineChart from '../../../Components/Charts/TinyLineChart'
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import { FcGrid, FcCancel } from 'react-icons/fc'
import PageHeader from '../../../Components/PageHeader/PageHeader'
import SearchIcon from '@mui/icons-material/Search';
import * as blogServices from '../../../Services/blogServices'
import MuiCard from '../../../Components/MuiCard/MuiCard'
import Notification from '../../../Components/Notification/Notification'
import ConfirmDialog from '../../../Components/ConfirmDialog/ConfirmDialog'

// =================== back to top button started =========================

function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 32, right: 32 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

// =================== back to top button ended =========================



export default function Dashboard(props) {
    const theme = useTheme()
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const { searchBar } = props
    const [searchQuery, setSearchQuery] = useState({ "searchQuery": ""})
    const [searchedBlog, setSearchedBlog] = useState([])
    const [searchHeader, setSearchHeader] = useState({ title: "Search something amazing", subTitle: "Learn crypto earn crypto", icon: true })
    const handleSearchInput = (e) => {
        e.preventDefault();
        setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value })
    }
    const handleSearch = async () => {
        await blogServices.getSearchBlogs(searchQuery)
            .then((response => {
                if (response.data.data.length > 0) {
                    setSearchedBlog(response.data.data)
                    setSearchHeader({
                        title: `You have searched for "${searchQuery.searchQuery}"`,
                        subTitle: `${response.data.data.length} results found`,
                        icon: true
                    })
                }
            }))
            .catch((response) => {
                // console.log(error);
                setSearchedBlog(null)
                searchHeader.title = 'Your search did not match any results!'
                searchHeader.subTitle = 'Try to search some another keywords'
                searchHeader.icon = false
            })
    }
    const currentUrl = window.location.href

    const handleFavorite = () => {
        alert('favorite added succesfully')
    }

    const handleDelete = (id) => {
        // console.log("event=>", event, "message=>", id)
        blogServices.deleteBlog(id)
            .then((response => {
                // console.log(response)
                const msg = response.data
                // console.log("Redirecting to blog portal..!")
                // setTimeout(() => { navigate('/blogs') }, 2000);
                setConfirmDialog({
                    ...setConfirmDialog,
                    isOpen: false
                })
                setNotify({
                    isOpen: true,
                    message: msg,
                    type: 'success'
                })
            }))
            .catch((response) => {
                // console.log(error);
                console.log(response.data.message)
            })

    }
    // const [notify, setNotify] = useState({ isOpen: true, message: '', type: 'error' })
    return (
        <>


            <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, px: { xs: 3, sm: 10, md: 9, lg: 8, xl: 32 }, minHeight: 100 + 'vh' }} >
                <Toolbar />

                <PageHeader
                    icon={searchBar ? (searchHeader.icon === true ? <SearchIcon size={24} /> : <FcCancel size={24} />) : <FcGrid size={24} />}
                    title={searchBar ? searchHeader.title : "Dashboard"}
                    subTitle={searchBar ? searchHeader.subTitle : "Admin Tools"}
                />
                {searchBar ?
                    <InputBase
                        autoComplete='off'
                        fullWidth
                        sx={{ bgcolor: theme.palette.background.paper, mb: 4, height: '50px', p: 2, borderRadius: '1rem' }}
                        placeholder='Search here'
                        name="searchQuery" value={searchQuery.searchQuery}
                        endAdornment={<SearchIcon fontSize="small" onClick={handleSearch} sx={{ cursor: 'pointer' }} />}
                        onChange={handleSearchInput}
                    />
                    : ''
                }
                <Grid container >
                    {
                        searchBar ?
                            searchedBlog && searchedBlog.map((item, index) => {

                                return (
                                    <Grid item xs={12} sm={12} md={6} lg={6} sx={{ pr: { md: 4 }, pb: { xs: 4, sm: 4, md: 4, } }} >

                                        <MuiCard
                                            key={index}
                                            image={item.image}
                                            profileImage={item.author.authorImage}
                                            title={item.title}
                                            // date={item.publishDate.substring(0,10)}
                                            category={item.category}
                                            chipColor={item.category === 'Bitcoin' ? 'primary' : (item.category === 'CryptoCurrency') ? 'secondary' : (item.category === 'Blockchain') ? 'error' : (item.category === 'Ethereum') ? 'success' : (item.category === 'Blockchain') ? 'info' : (item.category === 'Mining') ? 'warning' : 'primary'}
                                            createdAt={item.createdAt.substring(0, 10)}
                                            // description={item.content}
                                            id={item._id}
                                            slug={item.slug}
                                            shareUrl={currentUrl + '/' + item.slug}
                                            authorID={item.author.authorID}
                                            handleDelete={() => {
                                                // handleDelete(item._id)
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: "Are you sure to delete this record?",
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { handleDelete(item._id) }
                                                })
                                            }}
                                            // clickHandler={clickHandler}
                                            handleFavorite={handleFavorite}
                                        />
                                    </Grid>
                                )

                            })
                            :
                            <>
                                <Grid container spacing={2}>
                                    {/* <Stack spacing={1.5} direction='row'> */}
                                    <Grid item xs={2.4}>
                                        <Card sx={{ height: 150 }}>

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
                                        <Card sx={{ height: 150 }}>

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
                                <Box height={200} />

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
                                <Box height={200} />
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
                            </>
                    }
                </Grid>
            </Box>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    )
}