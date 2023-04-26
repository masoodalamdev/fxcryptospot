import * as React from 'react';
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
import logo2 from '../../Assets/logo2.png'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Avatar, Collapse, InputBase, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import { AccountBalance, AccountBalanceWallet, Add, AttachMoney, Book, CurrencyBitcoin, Dashboard, ExpandLess, ExpandMore, NoteAdd } from '@mui/icons-material';
import Badge from "@mui/material/Badge";
import MuiButton from '../../Components/MuiButton/MuiButton';
import { getToken, removeToken } from '../../Services/LocalStorageServices.js';
import SearchIcon from '@mui/icons-material/Search';
import profileImg from '../../Assets/Images/user2.jpg'



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
        paddingLeft: '10px'
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

export default function Sidebar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [openList, setOpenList] = React.useState(true);
    const token = getToken()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, setUser] = React.useState(null)
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
        document.getElementById('userName').setAttribute('style', 'display:block');
        document.getElementById('userEmail').setAttribute('style', 'display:block');
        document.getElementById('footer').setAttribute("style", "width:calc(100% - 240px); margin-left:240px;")
    };

    const handleDrawerClose = () => {
        setOpen(false);
        document.getElementById('userName').setAttribute('style', 'display:none');
        document.getElementById('userEmail').setAttribute('style', 'display:none');
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


    const styledHeader = {
        searchInput: {
            opacity: '0.6',
            padding: '0px 8px',
            fontSize: '0.8rem',
            '&:hover': {
                backgroundColor: '#f2f2f2'
            },
            '& .MuiSvgIcon-root': {
                marginRight: '8px'
            }
        }

    }
    return (
        <>
            <Box sx={{ display: "flex" }}>

                <CssBaseline />
                <AppBar position="fixed" open={open} sx={{ bgcolor: '#fff' }}>
                    <Toolbar disableGutters="true" >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                margin: 0,

                                ...(open && { display: 'none' }),
                            }}
                        >
                            {/* <MenuIcon /> */}
                            <img src={logo2} height='50px' width='50px' />
                        </IconButton>


                        <Link to='/blogs'>
                            <MuiButton
                                variant='text'
                                text='Blog'
                            />
                        </Link>
                        <Link to='/blockchain'>
                            <MuiButton
                                variant='text'
                                text='Blockchain'
                            />
                        </Link>
                        <Link to='/wallet'>
                            <MuiButton
                                variant='text'
                                text='Wallet'
                            />
                        </Link>
                        <Link to='/coin'>
                            <MuiButton
                                variant='text'
                                text='Coin'
                            />
                        </Link>
                        <Link to='/prices'>
                            <MuiButton
                                variant='text'
                                text='Prices'
                            />
                        </Link>
                        <Link to='/trading'>
                            <MuiButton
                                variant='text'
                                text='Trading'
                            />
                        </Link>

                        <Link to='/apps'>
                            <MuiButton
                                variant='text'
                                text='Apps'
                            />
                        </Link>
                        <Link to='/trading'>
                            <MuiButton
                                variant='text'
                                text='Buy Crypto'
                            />
                        </Link>
                        <Link to='/trading'>
                            <MuiButton
                                variant='text'
                                text='Sell Crypto'
                            />
                        </Link>
                        <Link to='/trading'>
                            <MuiButton
                                variant='text'
                                text='Exchange Crypto'
                            />
                        </Link>
                        <Link to='/advertise'>
                            <MuiButton
                                variant='text'
                                text='Advertise'
                            />
                        </Link>

                        <InputBase
                            sx={styledHeader.searchInput}
                            placeholder='Search here'
                            endAdornment={<SearchIcon fontSize="small" />}
                        />

                        {token ? <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Semy Sharp" src={profileImg} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
                                <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </Box>
                            :
                            <>
                                <Link to='/register'>
                                    <MuiButton
                                        variant='text'
                                        text='Register'
                                    />
                                </Link>
                                <Link to='/login'>
                                    <MuiButton
                                        variant='text'
                                        text='Login'
                                    />
                                </Link>
                            </>
                        }
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader sx={{ margin: '0 auto' }}>
                        <IconButton onClick={handleDrawerClose} sx={{ p: 0 }}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <img src={logo} height='64px' width='100%' />}
                        </IconButton>
                    </DrawerHeader>
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        {/* <Avatar src={profilePic} sx={{ margin: 'auto', border: 1 , borderColor: 'green'}}/> */}
                        <Stack direction="row" spacing={2} >
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                variant="dot"
                                sx={{ margin: 'auto' }}
                            >
                                <Avatar alt="Remy Sharp" src={profileImg} sx={{ margin: 'auto' }} />
                            </StyledBadge>

                        </Stack>
                        <Typography variant='body2' id='userName'>Masood Alam</Typography>
                        <Typography variant='body2' id='userEmail'>masoodg@gmail.com</Typography>

                    </Box>
                    <Divider sx={{ mt: 1 }} />

                    <List>
                        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Dashboard />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard" />
                                </ListItemButton>
                            </ListItem>
                        </Link>

                        <ListItemButton onClick={handleClickList}>
                            <ListItemIcon>
                                <Add />
                            </ListItemIcon>
                            <ListItemText primary="Add Blog Post" />
                            {openList ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openList} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link to='/create-blog' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <NoteAdd />
                                        </ListItemIcon>
                                        <ListItemText primary="Create Blog Post" />
                                    </ListItemButton>
                                </Link>
                                <Link to='/create-wallet' style={{ textDecoration: 'none', color: 'inherit' }}>

                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <AccountBalanceWallet />
                                        </ListItemIcon>
                                        <ListItemText primary="Create Wallet" />
                                    </ListItemButton>
                                </Link>
                                <Link to='/create-coin' style={{ textDecoration: 'none', color: 'inherit' }}>

                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <CurrencyBitcoin />
                                        </ListItemIcon>
                                        <ListItemText primary="Create Coin" />
                                    </ListItemButton>
                                </Link>
                                <Link to='/create-trading' style={{ textDecoration: 'none', color: 'inherit' }}>

                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <AttachMoney />
                                        </ListItemIcon>
                                        <ListItemText primary="Create Trading" />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>
                    </List>
                    <Divider />
            


                    <Divider />

                    <List>
                        <Link to='/blogs' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Book />
                                </ListItemIcon>
                                <ListItemText primary="Blog" />
                            </ListItemButton>
                        </Link>
                        <Link to='/wallet' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountBalanceWallet />
                                </ListItemIcon>
                                <ListItemText primary="Wallet" />
                            </ListItemButton>
                        </Link>
                        <Link to='/coin' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CurrencyBitcoin />
                                </ListItemIcon>
                                <ListItemText primary="Coin" />
                            </ListItemButton>
                        </Link>
                        <Link to='/trading' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AttachMoney />
                                </ListItemIcon>
                                <ListItemText primary="Trading" />
                            </ListItemButton>
                        </Link>
                    </List>

                  
                </Drawer>
                <Outlet />
                {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
     
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box> */}
            </Box>
            <div id="footer" style={{ marginLeft: '240px', width: 'calc(100% - 240px)' }}>

                <Footer />

            </div>

        </>

    );
}