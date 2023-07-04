import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import logo from '../../Assets/logo.png'
import logoo from '../../Assets/logoo.png'
import logooo from '../../Assets/logooo.png'
import logolight from '../../Assets/logolight.png'
import { NavLink, useNavigate, } from 'react-router-dom';
import { AppBar, Avatar, Collapse, Menu, MenuItem, Skeleton, Stack, Tooltip } from '@mui/material';
import {  ExpandLess, ExpandMore, Search } from '@mui/icons-material';
import MuiButton from '../../Components/MuiButton/MuiButton';
import { getToken, removeToken } from '../../Services/LocalStorageServices.js';
import axios from 'axios';
import Notification from '../../Components/Notification/Notification'
import { ColorModeContext } from '../../Store';
import { FcNightLandscape, FcLandscape, FcMenu } from "react-icons/fc";
import Drawer from '@mui/material/Drawer';


const drawerWidth = 240;


// const pages = [
//     { name: "Home", url: "dashboard" },
//     { name: "Blog", url: "blogs" },
//     { name: "Wallet", url: "blogs/wallet" },
//     { name: "Coin", url: "blogs/coin" },
//     { name: "Trading", url: "blogs/trading" },
//     { name: "Prices", url: "prices" },
//     { name: "Apps", url: "apps" },
//     { name: "About", url: "about" }
// ];
// const settings = [
//     { name: "Profile", url: "profile" },
//     { name: "Account", url: "profile" },
//     { name: "Logout", url: "login" }
// ];



export default function Sidebar({setSearchBar}) {
    const { mode, toggleMode } = useContext(ColorModeContext)
    // console.log(mode, "mode")

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [openBlogMenu, setOpenBlogMenu] = React.useState(false);
    const [openAboutMenu, setOpenAboutMenu] = React.useState(false);

    const handleOpenBlogMenu = () => {
        setOpenBlogMenu(!openBlogMenu);
    };
    const handleOpenAboutMenu = () => {
        setOpenAboutMenu(!openAboutMenu);
    };
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ minHeight: '64px', maxHeight: '64px', py: '12px' }} onClick={handleDrawerToggle}>
                <img src={mode === 'light' ? logolight : logo} alt='logo' />
            </Box>
            <Divider />
            <List>
                <ListItemButton component="a" href="/">
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton onClick={handleOpenBlogMenu}>

                    <ListItemText primary="Blog" />
                    {openBlogMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openBlogMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/blogs/blockchain">
                            <ListItemText primary="Blockchain" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/blogs/wallet">
                            <ListItemText primary="Wallet" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/blogs/coin">
                            <ListItemText primary="Coin" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/blogs">
                            <ListItemText primary="Bitcoin" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/blogs" >
                            <ListItemText primary="Mining" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/blogs/crypto-currency">
                            <ListItemText primary="Crypto Currency" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/blogs/trading">
                            <ListItemText primary="Trading" />
                        </ListItemButton>

                    </List>
                </Collapse>
                <ListItemButton component="a" href="/blogs/wallet">
                    <ListItemText primary="Wallet" />
                </ListItemButton>
                <ListItemButton component="a" href="/blogs" >
                    <ListItemText primary="Earn" />
                </ListItemButton>
                <ListItemButton component="a" href="/blogs/coin">
                    <ListItemText primary="Coin" />
                </ListItemButton>
                <ListItemButton component="a" href="/blogs/trading">
                    <ListItemText primary="Trading" />
                </ListItemButton>
                <ListItemButton component="a" href="/exchange">
                    <ListItemText primary="Exchange" />
                </ListItemButton>
                <ListItemButton component="a" href="/prices">
                    <ListItemText primary="Prices" />
                </ListItemButton>
                <ListItemButton component="a" href="/apps">
                    <ListItemText primary="Apps" />
                </ListItemButton>
                <ListItemButton onClick={handleOpenAboutMenu}>

                    <ListItemText primary="About" />
                    {openAboutMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openAboutMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/about">
                            <ListItemText primary="About" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/contact">
                            <ListItemText primary="Contact" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/sitemap">
                            <ListItemText primary="Sitemap" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/privacy-policy/">
                            <ListItemText primary="Privacy Policy" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/advertise">
                            <ListItemText primary="Advertise" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Box>
    );
    const theme = useTheme();
    // console.log(theme)
    // const [open, setOpen] = React.useState(true);
    // const [openList, setOpenList] = React.useState(true);
    // const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, setUser] = React.useState()
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' })
    const [anchorEl, setAnchorEl] = React.useState(null);

    const navigate = useNavigate()

    // const handleOpenNavMenu = (event) => {
    //     setAnchorElNav(event.currentTarget);
    // };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null);
    // };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };




    const handleLogout = () => {
        handleCloseUserMenu()
        removeToken('token')
        navigate('/login')
    }

    // const StyledBadge = styled(Badge)(({ theme }) => ({
    //     "& .MuiBadge-badge": {
    //         backgroundColor: "#44b680",
    //         color: "#44b680",
    //         boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    //         "&::after": {
    //             position: "absolute",
    //             top: 0,
    //             left: 0,
    //             width: "100%",
    //             height: "100%",
    //             borderRadius: "50%",
    //             animation: "ripple 1.2s infinite ease-in-out",
    //             border: "1px solid currentColor",
    //             content: '""'
    //         }
    //     },
    //     "@keyframes ripple": {
    //         "0%": {
    //             transform: "scale(.8)",
    //             opacity: 1
    //         },
    //         "100%": {
    //             transform: "scale(2.4)",
    //             opacity: 0
    //         }
    //     }
    // }));


    const handleSearchBar = () => {
        setSearchBar(prev => !prev)
    }
    const token = getToken()
    const url = 'https://fxcryptospot.cyclic.app/api/user/loggeduser'

    useEffect(() => {
        getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getUserDetail = async () => {
        await axios.get(url, {
            'headers': {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response => {
                if (response.data.message === "Logged in User") {
                    const loggedUser = response.data.user
                    setUser(loggedUser)
                    // console.log(response.data)
                }
            }))
            .catch((error) => {
                // console.log(error);
                if (error.response.data.message === "Token Expired") {
                    //     setNotify({
                    //         isOpen: true,
                    //         message: "Session expired! Please login again",
                    //         type: 'error'
                    //     })
                    // navigate('/login')
                    // setTimeout(() => { navigate('/login') }, 2000);
                    removeToken('token');
                    setUser(null)
                    // console.log(error.response.data.message)
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

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={openBlogMenu || openAboutMenu} elevation={0} sx={{ bgcolor: theme.palette.background.paper, px: { xs: 3, sm: 10, md: 9, lg: 8, xl: 32 } }}>
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                // mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 680,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                                flexGrow: 1
                            }}
                        >
                            <img src={mode === "light" ? logoo : logooo} alt="web logo" />
                        </Typography>

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
                                fontWeight: 680,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none"
                            }}
                        >
                            <img src={mode === "light" ? logolight : logo} alt="mobile logo" />
                        </Typography>

                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? (mode === "light" ? "activeLight" : "activeDark") : ""
                            }
                            >
                                <MuiButton
                                    text="Home"
                                    sx={{ height: '64px', width: '68px', borderRadius: 0 }}
                                />
                            </NavLink>
                        <NavLink
                                to="/blogs"
                                className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? (mode === "light" ? "activeLight" : "activeDark") : ""
                            }
                                end
                            >
                                <MuiButton
                                    text="Blog"
                                    sx={{ height: '64px', width: '68px', borderRadius: 0 }}
                                />
                            </NavLink>
                        <NavLink
                                to="/blogs/coin"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? (mode === "light" ? "activeLight" : "activeDark") : ""
                                }
                            >
                                <MuiButton
                                    text="Coin"
                                    sx={{ height: '64px', width: '68px', borderRadius: 0 }}
                                />
                            </NavLink>
                         <NavLink
                                to="/blogs/wallet"
                                className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? (mode === "light" ? "activeLight" : "activeDark") : ""
                            }
                            >
                                <MuiButton
                                    text="Wallet"
                                    sx={{ height: '64px', width: '68px', borderRadius: 0 }}
                                />
                            </NavLink>
                         <NavLink
                                to="/prices"
                                className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? (mode === "light" ? "activeLight" : "activeDark") : ""
                            }
                            >
                                <MuiButton
                                    text="Prices"
                                    sx={{ height: '64px', width: '68px', borderRadius: 0 }}
                                />
                            </NavLink>
                           <NavLink
                                to="/apps"
                                className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? (mode === "light" ? "activeLight" : "activeDark") : ""
                            }
                            >
                                <MuiButton
                                    text="Apps"
                                    sx={{ height: '64px', width: '68px', borderRadius: 0 }}
                                />
                            </NavLink>

                            <MuiButton 
                                onClick={handleClick}
                                text='About'
                                sx={{ height: '64px', width: '68px', borderRadius: 0 }}
                            >
                            </MuiButton>
                           
                     
                            <Menu
                                // id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                MenuListProps={{ onMouseLeave: handleClose }}

                                sx={{ mt: "45px" }}
                                            // id="menu-appbar"
                                            // anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "right"
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: "top",
                                                horizontal: "right"
                                            }}
                                            // open={Boolean(anchorElUser)}
                                            // onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleClose} component='a' href='/about'>About</MenuItem>
                                <MenuItem onClick={handleClose} component='a' href='/contact'>Contact</MenuItem>
                                <MenuItem onClick={handleClose} component='a' href='/sitemap'>Sitemap</MenuItem>
                                <MenuItem onClick={handleClose} component='a' href='/privacy-policy'>Privacy Policy</MenuItem>
                                <MenuItem onClick={handleClose} component='a' href='/advertise'>Advertise</MenuItem>
                            </Menu>
                        </Box>

                        <Box>
                            <Stack direction='row'>

                                <Tooltip title="Search">
                                    <IconButton onClick={handleSearchBar} sx={{ bgcolor: 'rgba(0,0,0,0.04)', ml: 1, mr: 1, }} >
                                  <Search size={24} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Dak mode">
                                    <IconButton onClick={toggleMode} sx={{ bgcolor: 'rgba(0,0,0,0.04)', ml: 1, mr: 1, }} >
                                        {theme.palette.mode === 'dark' ? <FcLandscape size={24} /> : <FcNightLandscape size={24} />}
                                    </IconButton>
                                </Tooltip>



                                {token ?
                                    <Box>
                                        <Tooltip title="Profile">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 1, bgcolor: 'rgba(0,0,0,0.04)', mx: 1 }}>
                                                {user && user.image ?
                                                    <Avatar alt="Profile" src={user && user.image} sx={{ width: 24, height: 24 }} />
                                                    : <Skeleton variant="circular" width={24} height={24} />
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
                                                <Typography textAlign="center" component="a" href="profile" sx={{ textDecoration: 'none', color: theme.palette.text.primary }}>Profile</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center" component="a" href="dashboard" sx={{ textDecoration: 'none', color: theme.palette.text.primary }}>Dashboad</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center" component="a" href="create-blog" sx={{ textDecoration: 'none', color: theme.palette.text.primary }}>Create Post</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center" onClick={handleLogout} sx={{ textDecoration: 'none', color: theme.palette.text.primary }}>Logout</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                    : ''}
                                <Tooltip title="Menu">
                                    <IconButton onClick={handleDrawerToggle} sx={{ display: { md: 'none' }, bgcolor: 'rgba(0,0,0,0.04)' }}>
                                        <FcMenu size={24} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        // container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'block', },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>

                {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                ============= content goes here =============
                </Box> */}
                {/* <Outlet /> */}
            </Box>


            {/* <MuiFooter /> */}
            {/* <MuiFooter/> */}



            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            {/* <Outlet /> */}
        </>
    );
}