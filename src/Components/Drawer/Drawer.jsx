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
import { Book, DashboardOutlined, ExpandLess, ExpandMore, Newspaper, TryRounded, VideoLibrary, Work, ManageAccounts, Key, Logout, People, PeopleRounded, NoteAdd } from '@mui/icons-material';
import { Link, Outlet } from 'react-router-dom';
import { Avatar, Collapse, Stack } from '@mui/material';
import profilePic from '../../Assets/Images/user2.jpg'
import logo from '../../Assets/logo.png'
import logo2 from '../../Assets/logoMini.png'
import Badge from "@mui/material/Badge";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
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

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openList, setOpenList] = React.useState(true);

  const handleClickList = () => {
    setOpenList(!openList);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    document.getElementById('userName').setAttribute('style', 'display:block');
    document.getElementById('userEmail').setAttribute('style', 'display:block');
    // document.getElementById('Appbar').setAttribute('style', 'margin-left:240px');
  };

  const handleDrawerClose = () => {
    setOpen(false);
    document.getElementById('userName').setAttribute('style', 'display:none');
    document.getElementById('userEmail').setAttribute('style', 'display:none');
    // document.getElementById('Appbar').setAttribute('style', 'margin-left:64px');

  };

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      {/* <div id="Appbar">
      <Navbar/>
      </div> */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          
          {/* <IconButton > */}
            {/* {open === true ? <ChevronLeftIcon onClick={handleDrawerClose} /> : <ChevronRightIcon onClick={handleDrawerOpen} />} */}
            {open === true ?  <img src={logo} onClick={handleDrawerClose} height='64px' width='100%' /> : <img src={logo2} onClick={handleDrawerOpen} height='50px' width='50px' />}
          {/* </IconButton> */}
         
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </DrawerHeader>
        {/* <img src={logo} />
        <img src={logo2} /> */}
        <Box sx={{textAlign: 'center'}}>
          {/* <Avatar src={profilePic} sx={{ margin: 'auto', border: 1 , borderColor: 'green'}}/> */}
          <Stack direction="row" spacing={2} >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        sx={{ margin: 'auto'}}
      >
        <Avatar alt="Remy Sharp" src={profilePic} sx={{ margin: 'auto'}} />
      </StyledBadge>
    
    </Stack>
          <Typography variant='body2' id='userName'>Masood Alam</Typography>
          <Typography variant='body2' id='userEmail'>masoodg@gmail.com</Typography>
        
          </Box>
        <Divider sx={{mt:1}} />
        <List>
          <Link to='/dashboard' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardOutlined />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </Link>

          <ListItemButton onClick={handleClickList}>
        <ListItemIcon>
        <Book />
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
            <Book />
            </ListItemIcon>
            <ListItemText primary="Create Wallet" />
          </ListItemButton>
          </Link>
      <Link to='/create-coin' style={{ textDecoration: 'none', color: 'inherit' }}>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
            <Book />
            </ListItemIcon>
            <ListItemText primary="Create Coin" />
          </ListItemButton>
          </Link>
      <Link to='/create-trading' style={{ textDecoration: 'none', color: 'inherit' }}>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
            <Book />
            </ListItemIcon>
            <ListItemText primary="Create Trading" />
          </ListItemButton>
          </Link>
        </List>
      </Collapse>



      

          <Link to='/news' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Newspaper />
                </ListItemIcon>
                <ListItemText primary="News" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/create-blog' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <NoteAdd />
                </ListItemIcon>
                <ListItemText primary="Add New Post" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/blogs' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Book />
                </ListItemIcon>
                <ListItemText primary="Blog Posts" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/videos' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <VideoLibrary />
                </ListItemIcon>
                <ListItemText primary="Videos" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/jobs' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                <ListItemText primary="Jobs" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <ListItemButton onClick={handleClickList}>
        <ListItemIcon>
          <ManageAccounts />
        </ListItemIcon>
        <ListItemText primary="Account" />
        {openList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <Key />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Collapse>
        </List>
    <Footer/>
      </Drawer>

    </Box>
    <Outlet/>
    </>
  );
}