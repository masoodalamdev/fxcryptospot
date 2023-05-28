import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
// import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/system';
import { Grid, useTheme } from '@mui/material';
import { Link } from '@mui/material';
import logo from '../../Assets/logo5.png'
import logo3 from '../../Assets/logo555.png'
import { ColorModeContext } from '../../Store';


export default function Footer() {
  const theme = useTheme()
  const {mode, toggleMode} = useContext(ColorModeContext)

  return (
    <TableContainer component={Paper} style={{position: 'static', backgroundColor: theme.palette.background.paper}} > 
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
  
          <Divider/>
          <TableRow style={{}}>
            <TableCell>
            <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
                     <img src={mode === "light" ? logo : logo3} height="60px" width="250px" />

        </Typography>
            </TableCell>
            <TableCell sx={{fontWeight: 700}} align="left">Learn & Earn</TableCell>
            <TableCell sx={{fontWeight: 700}} align="left">Products</TableCell>
            <TableCell sx={{fontWeight: 700}} align="left">How To</TableCell>
            <TableCell sx={{fontWeight: 700}} align="left">Community</TableCell>
       
          </TableRow>
          <TableRow>
            <TableCell component="a" href={"/fxcryptospot"} sx={{textDecoration: 'none'}}>Home</TableCell>
            <TableCell align="left">Academy</TableCell>
            <TableCell align="left">Wallet</TableCell>
            <TableCell align="left">Buy Crypto</TableCell>
            <TableCell align="left">Tips & tutorials</TableCell>
       
          </TableRow>
          <TableRow>
            
            <TableCell component="a" href={"/about"}  sx={{textDecoration: 'none'}}>About</TableCell>
           
            
            <TableCell align="left">Institute</TableCell>
            <TableCell align="left">Exchange</TableCell>
            <TableCell align="left">Sell Crypto</TableCell>
            <TableCell align="left">Market updates</TableCell>
       
          </TableRow>
          <TableRow style={{}}>
          <TableCell component="a" href={"/contact"}  sx={{textDecoration: 'none'}}>Contact</TableCell>
            <TableCell align="left">Online Platforms</TableCell>
            <TableCell align="left">Prices</TableCell>
            <TableCell align="left">Transfer Crypto</TableCell>
            <TableCell align="left">What is Bitcoin?</TableCell>
       
          </TableRow>
          <TableRow style={{}}>
          <TableCell component="a" href={"/fxcryptospot"}  sx={{textDecoration: 'none'}}>Sitemap</TableCell>
            <TableCell align="left">Online Courses</TableCell>
            <TableCell align="left">Trading</TableCell>
            <TableCell align="left">Exchange Crypto</TableCell>
            <TableCell align="left">What is crypto?</TableCell>
       
          </TableRow>
          <TableRow style={{}}>
          <TableCell component="a" href={"/privacy-policy"}  sx={{textDecoration: 'none'}}>Privacy Policy</TableCell>
            <TableCell align="left">Guidlines</TableCell>
            <TableCell align="left">Crypto Banks</TableCell>
            <TableCell align="left">Hold Crypto</TableCell>
            <TableCell align="left">What is a blockchain?</TableCell>
       
          </TableRow>
          <TableRow style={{}}>
          <TableCell component="a" href={"/advertise"}  sx={{textDecoration: 'none'}}>Advertise with us</TableCell>

            <TableCell align="left">Knowledge World</TableCell>
            <TableCell align="left">Crypto Cards</TableCell>
            <TableCell align="left">Earn Crypto</TableCell>
            <TableCell align="left">How to set up a crypto wallet</TableCell>
       
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => ( */}


        </TableBody>
      </Table>
    </TableContainer>
  );
}
