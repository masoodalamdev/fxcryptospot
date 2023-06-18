import './App.css';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import Home from './Pages/Home/Home';
import { CssBaseline } from '@mui/material';
import Contact from './Pages/Contact/Contact';
import About from './Pages/About/About';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
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
import React, { useContext } from 'react';
import { useTheme } from '@emotion/react';
import Prices from './Pages/Prices/Prices';
import Dashboard from './Pages/Dashboard/Dashboard';
import CreateBlog from './Pages/CreateBlog/CreateBlog';
import Blogs from './Pages/Blogs/Blogs';
import Advertise from './Pages/Advertise/Advertise';
import MiniDrawer from './Components/Drawer/Drawer';
import Test2 from './Test2';
import Test3 from './Test3';
import Sidebar from './Components/Sidebar/Sidebar';
import BlogView from './Pages/Blogs/BlogView';
import RightSidebar from './Components/RightSidebar/RightSidebar';
import Test4 from './Pages/Test4';
import Test5 from './Pages/Test5';
import BlogEditor from './Pages/Blogs/BlogEditor';
import Profile from './Pages/Profile/Profile';
import Sitemap from './Pages/Sitemap/Sitemap';
import Blockchain from './Pages/Blogs/Blockchain/Blockchain';
import Wallet from './Pages/Blogs/Wallet/Wallet';
import Trading from './Pages/Blogs/Trading/Trading';
import Coin from './Pages/Blogs/Coin/Coin';
import Author from './Pages/Author/Author';
import MuiFooter from './Components/Footer/MuiFooter';


function App() {

  return (
   
      <BrowserRouter>
      <Routes>
       
        <Route path='/' element={<Sidebar/>} >
        <Route index element={<Home />}/>
        <Route path='/fxcryptospot' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/create-blog' element={<CreateBlog/>} />
        <Route path='/blogs' element={<Blogs/>} />
        <Route path='/blog/:id' element={<BlogView/>} />
        <Route path='/blog-edit/:id' element={<BlogEditor/>} />
        <Route path='/blogs/blockchain' element={<Blockchain/>} />
        <Route path='/blogs/wallet' element={<Wallet/>} />
        <Route path='/blogs/coin' element={<Coin/>} />
        <Route path='/blogs/trading' element={<Trading/>} />
        <Route path='/exchange' element={<Exchange/>} />
        <Route path='/prices' element={<Prices/>} />
        <Route path='/apps' element={<Apps/>} />
        <Route path='/advertise' element={<Advertise/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/sitemap' element={<Sitemap/>} />
        <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
        <Route path='/*' element={<NotFound/>} />
        <Route path='/test' element={<Test/>} />
        <Route path='/test2' element={<Test2/>} />
        {/* <Route path='/test4' element={<Test4/>} /> */}
        <Route path='/test5' element={<Test5/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/author/:id' element={<Author/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        </Route>

      {/* <Route path="/admin" element={<Sidebar />}>
      <Route index element={<Dashboard />}/>
      <Route path="/admin/create-blog" element={<CreateBlog/>}/>
     
      </Route> */}
        <Route path='/test4' element={<Test4/>} />
        <Route path='/test5' element={<Test5/>} />
        <Route path='/test3' element={<Test3/>} />
      

      </Routes>
      {/* <MuiFooter /> */}
    <CssBaseline/>
    </BrowserRouter>
  
  );
}

export default App;
