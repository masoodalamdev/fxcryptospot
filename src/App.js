import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import Home from './Pages/Home/Home';
import { CssBaseline } from '@mui/material';
import Contact from './Pages/Contact/Contact';
import About from './Pages/About/About';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import Wallet from './Pages/Wallet/Wallet';
import Coin from './Pages/Coin/Coin';
import Trading from './Pages/Trading/Trading';
import Register from './Pages/Auth/Register/Register';
import Login from './Pages/Auth/Login/Login';
import NotFound from './Pages/NotFound/NotFound';
import Exchange from './Pages/Exchange/Exchange';
import Apps from './Pages/Apps/Apps';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Test from './Pages/Test';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import { useTheme } from '@emotion/react';
import Prices from './Pages/Prices/Prices';
import Dashboard from './Pages/Dashboard/Dashboard';
import CreateBlog from './Pages/CreateBlog/CreateBlog';
import Blogs from './Pages/Blogs/Blogs';
import CreateWallet from './Pages/CreateWallet/CreateWallet';
import CreateCoin from './Components/CreateCoin/CreateCoin';
import Advertise from './Pages/Advertise/Advertise';
import CreateTrading from './Pages/CreateTrading/CreateTrading';
import MiniDrawer from './Components/Drawer/Drawer';
import Test2 from './Test2';
import Test3 from './Test3';
import Sidebar from './Components/Sidebar/Sidebar';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {


//   const theme = useTheme();
//   const colorMode = React.useContext(ColorModeContext);
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         width: '100%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         bgcolor: 'background.default',
//         color: 'text.primary',
//         borderRadius: 1,
//         p: 3,
//       }}
//     >
//       {theme.palette.mode} mode
//       <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
//         {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//       </IconButton>
//     </Box>
//   );
// }

// export default  function ToggleColorMode() {
//   const [mode, setMode] = React.useState('light');
//   const colorMode = React.useMemo(
//     () => ({
//       toggleColorMode: () => {
//         setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//       },
//     }),
//     [],
//   );

//   const theme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//         },
//       }),
//     [mode],
//   );
const theme = createTheme({
  
});





  return (
    // <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        {/* <Route path='/dashboard' element={<Dashboard/>} /> */}
        {/* <Route path='/create-blog' element={<CreateBlog/>} /> */}
        {/* <Route path='/blogs' element={<Blogs/>} /> */}
        {/* <Route path='/create-wallet' element={<CreateWallet/>} /> */}
        {/* <Route path='/wallet' element={<Wallet/>} /> */}
        {/* <Route path='/create-coin' element={<CreateCoin/>} /> */}
        {/* <Route path='/coin' element={<Coin/>} /> */}
        {/* <Route path='/create-trading' element={<CreateTrading/>} /> */}
        {/* <Route path='/trading' element={<Trading/>} /> */}
        {/* <Route path='/about' element={<About/>} /> */}
        {/* <Route path='/contact' element={<Contact/>} /> */}
        {/* <Route path='/privacy-policy' element={<PrivacyPolicy/>} /> */}
        {/* <Route path='/*' element={<NotFound/>} /> */}
        <Route path='/test' element={<Test/>} />
        <Route path='/test2' element={<Test2/>} />
        <Route path='/test3' element={<Test3/>} />

        <Route path='/' element={<Sidebar/>} >
        <Route index element={<Dashboard />}/>
        <Route path="/create-blog" element={<CreateBlog/>}/>
        <Route path='/create-wallet' element={<CreateWallet/>} />
        <Route path='/create-coin' element={<CreateCoin/>} />
        <Route path='/create-trading' element={<CreateTrading/>} />
        <Route path='/blogs' element={<Blogs/>} />
        <Route path='/wallet' element={<Wallet/>} />
        <Route path='/coin' element={<Coin/>} />
        <Route path='/trading' element={<Trading/>} />
        <Route path='/exchange' element={<Exchange/>} />
        <Route path='/prices' element={<Prices/>} />
        <Route path='/apps' element={<Apps/>} />
        <Route path='/advertise' element={<Advertise/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
        <Route path='/*' element={<NotFound/>} />
        </Route>



      <Route path="/admin" element={<MiniDrawer />}>
      <Route index element={<Dashboard />}/>
      <Route path="/admin/create-blog" element={<CreateBlog/>}/>
      <Route path="/admin/create-wallet" element={<CreateWallet />}/>
      <Route path="/admin/create-coin" element={<CreateCoin />}/>
      <Route path="/admin/create-trading" element={<CreateTrading />}/>
      </Route>

      </Routes>

      {/* <Footer/> */}
    <CssBaseline/>
    </BrowserRouter>
  </ThemeProvider>
  // </ColorModeContext.Provider>
     
  );
}

export default App;
