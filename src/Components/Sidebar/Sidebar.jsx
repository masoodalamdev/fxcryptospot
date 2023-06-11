import React, { useContext, useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Footer from '../../Components/Footer/Footer';
import logo from '../../Assets/logo.png'
import logoMini from '../../Assets/logoMini.png'
import logolight from '../../Assets/logolight.png'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Avatar, Button, Collapse, Grid, InputBase, Menu, MenuItem, Skeleton, Stack, Tooltip, createTheme } from '@mui/material';
import { AccountBalance, AccountBalanceWallet, Add, Apps, AttachMoney, Book, CurrencyBitcoin, Dashboard, ExpandLess, ExpandMore, Hub, NoteAdd, QueryStats } from '@mui/icons-material';
import Badge from "@mui/material/Badge";
import MuiButton from '../../Components/MuiButton/MuiButton';
import { getToken, removeToken } from '../../Services/LocalStorageServices.js';
import profileImg from '../../Assets/Images/user2.jpg'
import axios from 'axios';
import Notification from '../../Components/Notification/Notification'
import { ColorModeContext } from '../../Store';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { FcOrgUnit, FcPositiveDynamic, FcCurrencyExchange, FcLibrary, FcAndroidOs, FcSalesPerformance, FcNews, FcDataSheet, FcPlus, FcPrevious, FcNext, FcNightLandscape, FcLandscape, FcExpand } from "react-icons/fc";
import MuiFooter from '../Footer/MuiFooter';


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));



const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        // paddingLeft: '10px',
        // color: theme.palette.background.default
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const pages = [
    { name: "Home", url: "dashboard" },
    { name: "Blog", url: "blogs" },
    { name: "Wallet", url: "blogs/wallet" },
    { name: "Coin", url: "blogs/coin" },
    { name: "Trading", url: "blogs/trading" },
    { name: "Prices", url: "prices" },
    { name: "Apps", url: "apps" },
    { name: "About", url: "about" }
];
const settings = [
    { name: "Profile", url: "profile" },
    { name: "Account", url: "profile" },
    { name: "Logout", url: "login" }
];

export default function Sidebar() {
    const { mode, toggleMode } = useContext(ColorModeContext)
    // console.log(mode, "mode")

    const theme = useTheme();
    // console.log(theme)
    const [open, setOpen] = React.useState(false);
    const [openList, setOpenList] = React.useState(true);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, setUser] = React.useState('')
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [anchorEl, setAnchorEl] = React.useState(null);

    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const handleDrawerOpen = () => {
        setOpen(true);
        // document.getElementById('userName').setAttribute('style', 'display:block');
        // document.getElementById('userEmail').setAttribute('style', 'display:block');
        document.getElementById('footer').setAttribute("style", "width:calc(100% - 240px); margin-left:240px;")
    };

    const handleDrawerClose = () => {
        setOpen(false);
        // document.getElementById('userName').setAttribute('style', 'display:none');
        // document.getElementById('userEmail').setAttribute('style', 'display:none');
        document.getElementById('footer').setAttribute("style", "width:calc(100% - 64px); margin-left:64px;")

    };


    const handleClickList = () => {
        setOpenList(!openList);
    };

    const handleLogout = () => {
        handleCloseUserMenu()
        removeToken('token')
        navigate('/login')
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
            backgroundColor: "#44b700",
            color: "#44b700",
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            "&::after": {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                animation: "ripple 1.2s infinite ease-in-out",
                border: "1px solid currentColor",
                content: '""'
            }
        },
        "@keyframes ripple": {
            "0%": {
                transform: "scale(.8)",
                opacity: 1
            },
            "100%": {
                transform: "scale(2.4)",
                opacity: 0
            }
        }
    }));





    const token = getToken()
    const url = 'http://localhost:8000/api/user/loggeduser'

    useEffect(() => {
        getUserDetail()
    }, [])

    const getUserDetail = async () => {
        const response = await axios.get(url, {
            'headers': {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response => {
                const loggedUser = response.data.user
                setUser(loggedUser)
                // console.log(user)
            }))
            .catch((error) => {
                // console.log(error);
                if (error.response.data.message === "Token Expired") {
                    //     setNotify({
                    //         isOpen: true,
                    //         message: "Session expired! Please login again",
                    //         type: 'error'
                    //     })
                    //     navigate('/login')
                    //     setTimeout(() => { navigate('/login') }, 2000);
                    removeToken('token');
                }
                // setUser(null)
            })

    };


    function handleClick(event) {
        if (anchorEl !== event.currentTarget) {
          setAnchorEl(event.currentTarget);
        }
      }
    
      function handleClose() {
        setAnchorEl(null);
      }

    // const theme = createTheme({
    //     MuiAppbar: {
    //           root: {
    //             // Some CSS
    //             backgroundColor: '#fff',
    //           },
    //     },
    //   });


    return (
        //     <>
        //         <Box sx={{ display: "flex"}}>
        //             <CssBaseline />
        //             <AppBar position="fixed" open={open} elevation={0} sx={{bgcolor:theme.palette.background.paper}}>
        //                                 <Toolbar disableGutters={true} >
        //                     <Grid container sx={{flex: 1,textAlign: 'center', margin: 'auto'}}>
        //                         <Grid item >
        //                             <Stack direction="row"  sx={{ml:1.5}} >
        //                                 <IconButton
        //                                     color="inherit"
        //                                     aria-label="open drawer"
        //                                     onClick={handleDrawerOpen}
        //                                     edge="start"
        //                                     sx={{
        //                                         margin: 0,

        //                                         ...(open && { display: 'none' }),
        //                                     }}
        //                                 >
        //                                     {/* <MenuIcon /> */}
        //                                     <img src={mode === "light" ? logo2 : logo4} height='24px' width='24px' />
        //                                 </IconButton>


        //                                 <Link to='/fxcryptospot'>
        //                                     <MuiButton
        //                                         variant='text'
        //                                         text='Home'
        //                                     />
        //                                 </Link>
        //                                 {/* <Button onClick={toggleMode} >
        //                                     change Mode
        //                                 </Button> */}

        //                                 <Link to='/blogs'>
        //                                     <MuiButton
        //                                         variant='text'
        //                                         text='Blog'
        //                                     />
        //                                 </Link>
        //                                 <Link to='/blogs/blockchain'>
        //                                     <MuiButton
        //                                         variant='text'
        //                                         text='Blockchain'
        //                                     />
        //                                 </Link>
        //                                 <Link to='/blogs/wallet'>
        //                                     <MuiButton
        //                                         variant='text'
        //                                         text='Wallet'
        //                                     />
        //                                 </Link>
        //                                 <Link to='/blogs/coin'>
        //                                     <MuiButton
        //                                         variant='text'
        //                                         text='Coin'
        //                                     />
        //                                 </Link>
        //                                 <Link to='/blogs/trading'>
        //                                     <MuiButton
        //                                         variant='text'
        //                                         text='Trading'
        //                                     />
        //                                 </Link>
        //                                 <Link to='/prices'>
        //                                     <MuiButton
        //                                         variant='text'
        //                                         text='Prices'
        //                                     />
        //                                 </Link>

        //                                 <Link to='/apps'>
        //                                     <MuiButton
        //                                         variant='text'
        //                                         text='Apps'
        //                                     />
        //                                 </Link>
        //                                 {/* <Link to='/trading'>
        //                                     <MuiButton
        //                                         variant='text'
        //                                         text='Buy'
        //                                     />
        //                                 </Link>
        //                                 <Link to='/trading'>
        //                                     <MuiButton
        //                                         variant='text'
        //                                         text='Sell'
        //                                     />
        //                                 </Link>
        //                                 <Link to='/trading'>
        //                                     <MuiButton
        //                                         variant='text'
        //                                         text='Exchange'
        //                                     />
        //                                 </Link> */}
        //                                 {/* <Link to='/advertise'>
        //                                     <MuiButton
        //                                         variant='text'
        //                                         text='Advertise'
        //                                     />
        //                                 </Link> */}

        //                             </Stack>
        //                         </Grid>
        //                         <Grid item sm>

        //                         </Grid>
        //                         <Grid item >
        //                             <Stack direction="row">

        //                             <IconButton sx={{ ml: 1 }} onClick={toggleMode} >
        //                                     {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        //                                 </IconButton>

        //                                 {token ? <Box sx={{ flexGrow: 0, mr: 1 }}>
        //                                     <Tooltip title="Open settings">
        //                                         <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        //                                             <Avatar alt="Username" src={profileImg} />
        //                                         </IconButton>
        //                                     </Tooltip>
        //                                     <Menu
        //                                         sx={{ mt: '45px' }}
        //                                         id="menu-appbar"
        //                                         anchorEl={anchorElUser}
        //                                         anchorOrigin={{
        //                                             vertical: 'top',
        //                                             horizontal: 'right',
        //                                         }}
        //                                         keepMounted
        //                                         transformOrigin={{
        //                                             vertical: 'top',
        //                                             horizontal: 'right',
        //                                         }}
        //                                         open={Boolean(anchorElUser)}
        //                                         onClose={handleCloseUserMenu}
        //                                     >
        //                                         {/* {settings.map((setting) => (
        //             <MenuItem key={setting} onClick={handleCloseUserMenu}>
        //               <Typography textAlign="center">{setting}</Typography>
        //             </MenuItem>
        //           ))} */}
        //                                         <MenuItem onClick={handleCloseUserMenu} component='a' href='/profile'>Profile</MenuItem>
        //                                         <MenuItem onClick={handleLogout}>Logout</MenuItem>
        //                                     </Menu>
        //                                 </Box>
        //                                     :
        //                                     <>
        //                                         {/* <Link to='/register'>
        //                                 <MuiButton
        //                                     variant='text'
        //                                     text='Register'
        //                                 />
        //                             </Link>
        //                             <Link to='/login'>
        //                                 <MuiButton
        //                                     variant='text'
        //                                     text='Login'
        //                                 />
        //                             </Link> */}
        //                                     </>
        //                                 }
        //                             </Stack>

        //                         </Grid>
        //                     </Grid>
        //                 </Toolbar>
        //             </AppBar>


        //             <Drawer variant="permanent" open={open} sx={{bgcolor: 'red'}} elevation={0} >
        //                 <DrawerHeader sx={{ margin: '0 auto' }}>
        //                     <IconButton onClick={handleDrawerClose} sx={{ p: 0 }}>
        //                         {theme.direction === 'rtl' ? <ChevronRightIcon /> : <img src={mode === "light" ? logo : logo3} height='40px' width='100%' />}
        //                     </IconButton>
        //                 </DrawerHeader>
        //                 {token ?
        //                     <>
        //                         <Box sx={{ textAlign: 'center', mt: 2, textDecoration:'none', color: 'inherit' }}component='a' href='/profile'>
        //                             {/* <Avatar src={profilePic} sx={{ margin: 'auto', border: 1 , borderColor: 'green'}}/> */}
        //                             <Stack direction="row" spacing={2} >
        //                                 <StyledBadge
        //                                     overlap="circular"
        //                                     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        //                                     variant="dot"
        //                                     sx={{ margin: 'auto' }}
        //                                 >
        //                                     <Avatar alt="Remy Sharp" src={profileImg} sx={{ margin: 'auto' }} />
        //                                 </StyledBadge>

        //                             </Stack>
        //                             <Typography variant='h6' id='userName'>Hi, {user && user.name}</Typography>
        //                             <Typography variant='body2' id='userEmail'>{user && user.email}</Typography>

        //                         </Box>
        //                         <Divider sx={{ mt: 1 }} />

        //                         <List>
        //                             <Link to='/dashboard' style={{ textDecoration: 'none', color: 'inherit' }}>
        //                                 <ListItem disablePadding>
        //                                     <ListItemButton>
        //                                         <ListItemIcon>
        //                                             <Dashboard />
        //                                         </ListItemIcon>
        //                                         <ListItemText primary="Dashboard" />
        //                                     </ListItemButton>
        //                                 </ListItem>
        //                             </Link>

        //                             <ListItemButton onClick={handleClickList}>
        //                                 <ListItemIcon>
        //                                     <Add />
        //                                 </ListItemIcon>
        //                                 <ListItemText primary="Add Blog Post" />
        //                                 {openList ? <ExpandLess /> : <ExpandMore />}
        //                             </ListItemButton>
        //                             <Collapse in={openList} timeout="auto" unmountOnExit>
        //                                 <List component="div" disablePadding>
        //                                     <Link to='/create-blog' style={{ textDecoration: 'none', color: 'inherit' }}>
        //                                         <ListItemButton>
        //                                             <ListItemIcon>
        //                                                 <NoteAdd />
        //                                             </ListItemIcon>
        //                                             <ListItemText primary="Create Blog Post" />
        //                                         </ListItemButton>
        //                                     </Link>
        //                                     {/* <Link to='/admin/create-wallet' style={{ textDecoration: 'none', color: 'inherit' }}>

        //                                         <ListItemButton sx={{ pl: 4 }}>
        //                                             <ListItemIcon>
        //                                                 <AccountBalanceWallet />
        //                                             </ListItemIcon>
        //                                             <ListItemText primary="Create Wallet" />
        //                                         </ListItemButton>
        //                                     </Link>
        //                                     <Link to='/admin/create-coin' style={{ textDecoration: 'none', color: 'inherit' }}>

        //                                         <ListItemButton sx={{ pl: 4 }}>
        //                                             <ListItemIcon>
        //                                                 <CurrencyBitcoin />
        //                                             </ListItemIcon>
        //                                             <ListItemText primary="Create Coin" />
        //                                         </ListItemButton>
        //                                     </Link>
        //                                     <Link to='/admin/create-trading' style={{ textDecoration: 'none', color: 'inherit' }}>

        //                                         <ListItemButton sx={{ pl: 4 }}>
        //                                             <ListItemIcon>
        //                                                 <AttachMoney />
        //                                             </ListItemIcon>
        //                                             <ListItemText primary="Create Trading" />
        //                                         </ListItemButton>
        //                                     </Link> */}
        //                                 </List>
        //                             </Collapse>
        //                         </List>
        //                     </>
        //                     : ''}
        //                 <Divider />


        //                 <Divider />

        //                 <List>
        //                     <Link to='/blogs' style={{ textDecoration: 'none', color: 'inherit' }}>
        //                         <ListItemButton>
        //                             <ListItemIcon>
        //                                 <Book />
        //                             </ListItemIcon>
        //                             <ListItemText primary="Blog" />
        //                         </ListItemButton>
        //                     </Link>
        //                     <Link to='/blogs/blockchain' style={{ textDecoration: 'none', color: 'inherit' }}>
        //                         <ListItemButton>
        //                             <ListItemIcon>
        //                                 <Hub />
        //                             </ListItemIcon>
        //                             <ListItemText primary="Blockchain" />
        //                         </ListItemButton>
        //                     </Link>
        //                     <Link to='/blogs/wallet' style={{ textDecoration: 'none', color: 'inherit' }}>
        //                         <ListItemButton>
        //                             <ListItemIcon>
        //                                 <AccountBalanceWallet />
        //                             </ListItemIcon>
        //                             <ListItemText primary="Wallet" />
        //                         </ListItemButton>
        //                     </Link>
        //                     <Link to='/blogs/coin' style={{ textDecoration: 'none', color: 'inherit' }}>
        //                         <ListItemButton>
        //                             <ListItemIcon>
        //                                 <CurrencyBitcoin />
        //                             </ListItemIcon>
        //                             <ListItemText primary="Coin" />
        //                         </ListItemButton>
        //                     </Link>
        //                     <Link to='/blogs/trading' style={{ textDecoration: 'none', color: 'inherit' }}>
        //                         <ListItemButton>
        //                             <ListItemIcon>
        //                                 <AttachMoney />
        //                             </ListItemIcon>
        //                             <ListItemText primary="Trading" />
        //                         </ListItemButton>
        //                     </Link>
        //                     <Link to='/trading' style={{ textDecoration: 'none', color: 'inherit' }}>
        //                         <ListItemButton>
        //                             <ListItemIcon>
        //                                 <QueryStats />
        //                             </ListItemIcon>
        //                             <ListItemText primary="Prices" />
        //                         </ListItemButton>
        //                     </Link>
        //                     <Link to='/apps' style={{ textDecoration: 'none', color: 'inherit' }}>
        //                         <ListItemButton>
        //                             <ListItemIcon>
        //                                 <Apps />
        //                             </ListItemIcon>
        //                             <ListItemText primary="Apps" />
        //                         </ListItemButton>
        //                     </Link>
        //                 </List>


        //             </Drawer>
        //             <Outlet />
        //             {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        //     <DrawerHeader />
        //   =============== content goes here ============
        //   </Box> */}
        //         </Box>
        //         <div id="footer" style={{ marginLeft: '240px', width: 'calc(100% - 240px)' }}>

        //             <Footer />

        //         </div>
        //         <Notification
        //             notify={notify}
        //             setNotify={setNotify}
        //         />
        //     </>
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} elevation={0} sx={{ bgcolor: theme.palette.background.paper }}>
                    {/* <Container maxWidth="xl"> */}

                    <Toolbar >
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                // pl: 4,
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            {/* <img src={mode === "light" ? logoMini : logoMini} height='24px' width='24px' /> */}
                            {/* <MenuIcon /> */}
                            <FcNext />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                // mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                                flexGrow: 1
                            }}
                        >
                            <img src={mode === "light" ? logolight : logo} alt="web logo" />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                            // color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left"
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" }
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <Link to={page.url} style={{ textDecoration: 'none' }} key={page.name}>
                                            <Typography textAlign="center" >
                                                {page.name}
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none"
                            }}
                        >
                            <img src={mode === "light" ? logolight : logo} alt="mobile logo" />

                        </Typography>

                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            {/* {pages.map((page) => (
                                <Link to={page.url} style={{ textDecoration: 'none' }} key={page.name}>
                                    <Button
                                        key={page.name}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, display: "block", fontWeight: "bold", textDecoration: 'none', color: theme.palette.text.primary }}
                                    >
                                        {page.name}
                                    </Button>
                                </Link>
                            ))} */}
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <Button
                                    sx={{ my: 2, display: "block", fontWeight: "bold", textDecoration: 'none', color: theme.palette.text.primary }}
                                >
                                    Home
                                </Button>
                            </Link>
                            <Link to='/blogs' style={{ textDecoration: 'none' }}>
                                <Button
                                    sx={{ my: 2, display: "block", fontWeight: "bold", textDecoration: 'none', color: theme.palette.text.primary }}
                                >
                                    Blog
                                </Button>
                            </Link>
                            <Link to='/blogs' style={{ textDecoration: 'none' }}>
                                <Button
                                    sx={{ my: 2, display: "block", fontWeight: "bold", textDecoration: 'none', color: theme.palette.text.primary }}
                                >
                                    Earn
                                </Button>
                            </Link>
                            <Link to='/blogs/wallet' style={{ textDecoration: 'none' }}>
                                <Button
                                    sx={{ my: 2, display: "block", fontWeight: "bold", textDecoration: 'none', color: theme.palette.text.primary }}
                                >
                                    Wallet
                                </Button>
                            </Link>
                            <Link to='/blogs/coin' style={{ textDecoration: 'none' }}>
                                <Button
                                    sx={{ my: 2, display: "block", fontWeight: "bold", textDecoration: 'none', color: theme.palette.text.primary }}
                                >
                                    Coin
                                </Button>
                            </Link>
                            <Link to='/blogs/trading' style={{ textDecoration: 'none' }}>
                                <Button
                                    sx={{ my: 2, display: "block", fontWeight: "bold", textDecoration: 'none', color: theme.palette.text.primary }}
                                >
                                    Trading
                                </Button>
                            </Link>
                            <Link to='/prices' style={{ textDecoration: 'none' }}>
                                <Button
                                    sx={{ my: 2, display: "block", fontWeight: "bold", textDecoration: 'none', color: theme.palette.text.primary }}
                                >
                                    Prices
                                </Button>
                            </Link>
                            <Link to='/apps' style={{ textDecoration: 'none' }}>
                                <Button
                                    sx={{ my: 2, display: "block", fontWeight: "bold", textDecoration: 'none', color: theme.palette.text.primary }}
                                >
                                    Apps
                                </Button>
                            </Link>

                            <Button onMouseOver={handleClick}
                                onClick={handleClick}
                                sx={{ my: 2, display: "block", fontWeight: "bold", textDecoration: 'none', color: theme.palette.text.primary }}
                            >
                                About <FcExpand size={12} />
                            </Button>
                            <Menu
                                // id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                MenuListProps={{ onMouseLeave: handleClose }}
                            >
                                <MenuItem onClick={handleClose}>About</MenuItem>
                                <MenuItem onClick={handleClose}>Contact</MenuItem>
                                <MenuItem onClick={handleClose}>Sitemap</MenuItem>
                                <MenuItem onClick={handleClose}>Privacy Policy</MenuItem>
                                <MenuItem onClick={handleClose}>Advertise</MenuItem>
                            </Menu>
                            <IconButton onClick={toggleMode} sx={{
                                ':hover': {
                                    bgcolor: 'transparent'
                                },
                                ':active': {
                                    bgcolor: 'transparent'
                                },
                                ':focus': {
                                    bgcolor: 'transparent'
                                }
                            }} >
                                {/* <Button onClick={toggleMode}> */}
                                {/* {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} */}
                                {theme.palette.mode === 'dark' ? <FcLandscape size={24} /> : <FcNightLandscape size={24} />}
                                {/* </Button> */}
                            </IconButton>
                        </Box>
                        {token ?
                            <Box sx={{ flexGrow: 0 }}>

                                <Tooltip title="Profile">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        {user && user.image ?
                                            <Avatar alt="Profile" src={user && user.image} />
                                            : <Skeleton variant="circular" width={40} height={40} />
                                        }
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" component="a" href="profile" sx={{ textDecoration: 'none' }}>Profile</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" component="a" href="profile" sx={{ textDecoration: 'none' }}>Account</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={handleLogout} sx={{ textDecoration: 'none' }}>Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            : ''}

                        {/* ================== web nav ended ================== */}
                    </Toolbar>
                    {/* </Container> */}
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <FcNext size={24} /> : <FcPrevious size={24} />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />

                    {token ?
                        <>
                            <Box sx={{ textAlign: 'center', mt: 2, textDecoration: 'none', color: 'inherit' }} component='a' href='/profile'>
                                {/* <Avatar src={profilePic} sx={{ margin: 'auto', border: 1 , borderColor: 'green'}}/> */}
                                <Stack direction="row" spacing={2} >
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                        variant="dot"
                                        sx={{ margin: 'auto' }}
                                    >
                                        {user && user.image ?
                                            <Avatar alt="Profile" src={user && user.image} sx={{ margin: 'auto' }} />
                                            :
                                            <Skeleton variant="circular" width={40} height={40} />
                                        }
                                    </StyledBadge>

                                </Stack>
                                <Typography variant='h6' id='userName' sx={{ display: 'none' }}> {user && `${"Hi, " + user.name}`}</Typography>
                                <Typography variant='body2' id='userEmail' sx={{ display: 'none' }}>{user && user.email}</Typography>

                            </Box>
                            <Divider sx={{ mt: 1 }} />

                            <List>
                                <Link to='/dashboard' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {/* <Dashboard /> */}
                                                <FcDataSheet size={24} />
                                            </ListItemIcon>
                                            <ListItemText primary="Dashboard" />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                                <Link to='/create-blog' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {/* <NoteAdd /> */}
                                                <FcPlus size={24} />
                                            </ListItemIcon>
                                            <ListItemText primary="Add Blog Post" />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>

                            </List>
                        </>
                        : ''}
                    <Divider />

                    <Divider />
                    <List>
                        <Link to='/blogs' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* <Book /> */}
                                    <FcNews size={24} />
                                </ListItemIcon>
                                <ListItemText primary="Blog" />
                            </ListItemButton>
                        </Link>
                        <Link to='/blogs/blockchain' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* <Hub /> */}
                                    <FcOrgUnit size={24} />
                                </ListItemIcon>
                                <ListItemText primary="Blockchain" />
                            </ListItemButton>
                        </Link>
                        <Link to='/blogs/wallet' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* <AccountBalanceWallet /> */}
                                    <FcLibrary size={24} />
                                </ListItemIcon>
                                <ListItemText primary="Wallet" />
                            </ListItemButton>
                        </Link>
                        <Link to='/blogs/coin' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* <CurrencyBitcoin /> */}
                                    <FcSalesPerformance size={24} />
                                </ListItemIcon>
                                <ListItemText primary="Coin" />
                            </ListItemButton>
                        </Link>
                        <Link to='/blogs/trading' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* <AttachMoney /> */}
                                    <FcPositiveDynamic size={24} />
                                </ListItemIcon>
                                <ListItemText primary="Trading" />
                            </ListItemButton>
                        </Link>
                        <Link to='/blogs/trading' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* <QueryStats /> */}
                                    <FcCurrencyExchange size={24} />
                                </ListItemIcon>
                                <ListItemText primary="Prices" />
                            </ListItemButton>
                        </Link>
                        <Link to='/apps' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* <Apps /> */}
                                    <FcAndroidOs size={24} />
                                </ListItemIcon>
                                <ListItemText primary="Apps" />
                            </ListItemButton>
                        </Link>
                    </List>
                </Drawer>
                <Outlet />
                {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                     ============= content goes here =============
                </Box> */}
            </Box>
            <Box id="footer" sx={{ marginLeft: '64px', width: 'calc(100% - 64px)', p: 0 }}><MuiFooter />
            </Box>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            {/* <Outlet /> */}
        </>
    );
}