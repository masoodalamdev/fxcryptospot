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
import { AppBar, Avatar, Button, Collapse, Grid, InputBase, Menu, MenuItem, Skeleton, Stack, Tooltip, createTheme } from '@mui/material';
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
import { FcOrgUnit, FcPositiveDynamic, FcCurrencyExchange, FcLibrary, FcAndroidOs, FcSalesPerformance, FcNews, FcDataSheet, FcPlus, FcPrevious, FcNext, FcNightLandscape, FcLandscape, FcExpand, FcMenu } from "react-icons/fc";
import MuiFooter from '../Footer/MuiFooter';
import Drawer from '@mui/material/Drawer';


const drawerWidth = 240;






// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//         // paddingLeft: '10px',
//         // color: theme.palette.background.default
//     }),
//     ...(open && {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     }),
// }));




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

    const [mobileOpen, setMobileOpen] = React.useState(false);
     const [open, setOpen] = React.useState(false);

  const handleClickNav = () => {
    setOpen(!open);
  };
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 1 }}>
                <img src={mode === 'light' ? logolight : logo} />
            </Typography>
            <Divider />
            <List>
                {/* {pages.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
                  <ListItemButton>
        <ListItemText primary="Home" />
      </ListItemButton>
          <ListItemButton onClick={handleClickNav}>
        
        <ListItemText primary="Blog" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton >
            <ListItemText primary="Blockchain" />
          </ListItemButton>
           <ListItemButton >
            <ListItemText primary="Bitcoin" />
          </ListItemButton>
           <ListItemButton >
            <ListItemText primary="Mining" />
          </ListItemButton>
           <ListItemButton >
            <ListItemText primary="Crypto Currency" />
          </ListItemButton>
            <ListItemButton >
            <ListItemText primary="Trading" />
          </ListItemButton>
       
        </List>
      </Collapse>
       <ListItemButton>
        <ListItemText primary="Wallet" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Earn" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Coin" />
      </ListItemButton>
       <ListItemButton>
        <ListItemText primary="Trading" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Prices" />
      </ListItemButton>
       <ListItemButton>
        <ListItemText primary="Apps" />
      </ListItemButton>
      <ListItemButton onClick={handleClickNav}>
        
        <ListItemText primary="About" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton >
            <ListItemText primary="About" />
          </ListItemButton>
           <ListItemButton >
            <ListItemText primary="Contact" />
          </ListItemButton>
           <ListItemButton >
            <ListItemText primary="Sitemap" />
          </ListItemButton>
           <ListItemButton >
            <ListItemText primary="Privacy Policy" />
          </ListItemButton>
            <ListItemButton >
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
    const [openList, setOpenList] = React.useState(true);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, setUser] = React.useState('')
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' })
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
    const url = 'https://fxcryptospot.cyclic.app/api/user/loggeduser'

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

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} elevation={0} sx={{ bgcolor: theme.palette.background.paper, px:{xs:3, sm:10, md:12, lg:8, xl:32}}}>
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
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                                flexGrow: 1
                            }}
                        >
                            <img src={mode === "light" ? logolight : logo} alt="web logo" />
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
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none"
                            }}
                        >
                            <img src={mode === "light" ? logolight : logo} alt="mobile logo" />
                        </Typography>

                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                                <MuiButton
                                text='Home'
                                href='/'
                                />
                                <MuiButton
                                text='Blog'
                                href='/blogs'
                                />
                                <MuiButton
                                text='Earn'
                                href='/blogs'
                                />
                                <MuiButton
                                text='Wallet'
                                href='/blogs/wallet'
                                />
                                {/* <MuiButton
                                text='Coin'
                                href='/blogs/coin'
                                /> */}
                                {/* <MuiButton
                                text='Trading'
                                href='/blogs/trading'
                                /> */}
                                <MuiButton
                                text='Prices'
                                href='/prices'
                                />
                                <MuiButton
                                text='Apps'
                                href='/apps'
                                />
                            
                        
                           

                            <MuiButton onMouseOver={handleClick}
                                onClick={handleClick}
                            text='About'
                            >
                                 
                            </MuiButton>
                            <Menu
                                // id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                MenuListProps={{ onMouseLeave: handleClose }}
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
                            <Tooltip title="Dak mode">
                                <IconButton onClick={toggleMode} sx={{bgcolor: 'rgba(0,0,0,0.04)', ml:2}} >
                                    {theme.palette.mode === 'dark' ? <FcLandscape size={24} /> : <FcNightLandscape size={24}  />}
                                </IconButton>
                                </Tooltip>



                                {token ?
                                    <Box>
                                        <Tooltip title="Profile">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 1,  bgcolor: 'rgba(0,0,0,0.04)', mx:1 }}>
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
                                                <Typography textAlign="center" component="a" href="create-blog" sx={{ textDecoration: 'none', color: theme.palette.text.primary }}>Create Post</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center" onClick={handleLogout} sx={{ textDecoration: 'none', color: theme.palette.text.primary }}>Logout</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                    : ''}
                               <Tooltip title="Menu">
                                <IconButton onClick={handleDrawerToggle} sx={{  display: { md: 'none' }, bgcolor: 'rgba(0,0,0,0.04)'  }}>
                                   <FcMenu size={24}  />
                                </IconButton>
                                </Tooltip>
                            </Stack>
                        </Box>
                        {/* ================== web nav ended ================== */}
                    </Toolbar>
                    {/* </Container> */}
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
                            display: { xs: 'block', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
               
                <Outlet />
                {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                     ============= content goes here =============
                </Box> */}
            </Box>
            <MuiFooter />
           

            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            {/* <Outlet /> */}
        </>
    );
}