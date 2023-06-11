import { AppBar, Avatar, Box, Container, IconButton, InputBase, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchIcon from '@mui/icons-material/Search';
import MuiButton from '../MuiButton/MuiButton';
import profileImg from '../../Assets/Images/user2.jpg'
import axios from 'axios';
import  {getToken, removeToken}  from '../../Services/LocalStorageServices.js';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = useState(null)
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


  const token = getToken()
  const url = 'http://localhost:8000/api/user/loggeduser'

  useEffect(()=> {
    getUserDetail()
  }, [])
  
  const getUserDetail = async() => {
    const response = await axios.get(url, { 'headers': { 'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    } })
      .then((response => {
        const userLoggedIn = response.data.user
        setUser(userLoggedIn)        
        // console.log(userLoggedIn)
        
      }) )
      .catch((error) => {
        console.log(error);
        setUser(null)
      })
  
  };

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

  const handleLogout = () => {
    handleCloseUserMenu()
    removeToken('token')
    navigate('/login')
  }

  return (
    <AppBar position='static' sx={{backgroundColor: '#fff', paddingLeft: '240px'}}>

      <Toolbar>
      
         
          <Link to='/fxcryptospot'>
          <MuiButton
          variant='text'
          text='Home'
          />
              </Link>
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
  )
}
