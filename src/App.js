import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Contact from './Pages/Contact/Contact';
import About from './Pages/About/About';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import Register from './Pages/Auth/Register/Register';
import Login from './Pages/Auth/Login/Login';
import NotFound from './Pages/NotFound/NotFound';
import Exchange from './Pages/Exchange/Exchange';
import Apps from './Pages/Apps/Apps';
import React, { useState } from 'react';
import Prices from './Pages/Prices/Prices';
import CreateBlog from './Pages/PrivateRoutes/Blog/CreateBlog';
import Blogs from './Pages/Blogs/Blogs';
import Advertise from './Pages/Advertise/Advertise';
import BlogView from './Pages/Blogs/BlogView';
import BlogEditor from './Pages/PrivateRoutes/Blog/BlogEditor';
import Sitemap from './Pages/Sitemap/Sitemap';
import Blockchain from './Pages/Blogs/Blockchain/Blockchain';
import Wallet from './Pages/Blogs/Wallet/Wallet';
import Trading from './Pages/Blogs/Trading/Trading';
import Coin from './Pages/Blogs/Coin/Coin';
import Author from './Pages/Author/Author';
import PrivateRoutes from './Utils/PrivateRoutes';
import Profile from './Pages/PrivateRoutes/Profile/Profile'
import Dashboard from './Pages/PrivateRoutes/Dashboard/Dashboard'
import RootLayout from './Layouts/RootLayout';
import BlogLayout from './Layouts/BlogLayout';
import Test from './Test';
import { HelmetProvider } from 'react-helmet-async';

function App() {

  const [searchBar, setSearchBar] = useState(false)
  const router = createBrowserRouter(
    createRoutesFromElements(

      <>
      
        <Route path="/" element={<RootLayout setSearchBar = {setSearchBar} />} >
          <Route index element={<Blogs searchBar={searchBar} />} />
          <Route path='blog/:id' element={<BlogView searchBar={searchBar} />} />
          <Route path='exchange' element={<Exchange searchBar={searchBar} />} />
          <Route path='prices' element={<Prices searchBar={searchBar} />} />
          <Route path='apps' element={<Apps searchBar={searchBar} />} />
          <Route path='advertise' element={<Advertise searchBar={searchBar} />} />
          <Route path='about' element={<About searchBar={searchBar} />} />
          <Route path='contact' element={<Contact searchBar={searchBar} />} />
          <Route path='sitemap' element={<Sitemap searchBar={searchBar} />} />
          <Route path='privacy-policy' element={<PrivacyPolicy searchBar={searchBar} />} />
          <Route path='*' element={<NotFound searchBar={searchBar} />} />
          <Route path='author/:id' element={<Author searchBar={searchBar} />} />
          <Route path='register' element={<Register searchBar={searchBar} />} />
          <Route path='login' element={<Login searchBar={searchBar} />} />
          <Route path='test' element={<Test searchBar={searchBar} />} />
        </Route>

        <Route path="blogs" element={<BlogLayout setSearchBar = {setSearchBar}/>} >
          <Route index element={<Blogs searchBar={searchBar} />} />
          <Route path='blockchain' element={<Blockchain searchBar={searchBar} />} />
          <Route path='wallet' element={<Wallet searchBar={searchBar} />} />
          <Route path='coin' element={<Coin searchBar={searchBar} />} />
          <Route path='trading' element={<Trading searchBar={searchBar} />} />
        </Route>

        <Route element={<PrivateRoutes setSearchBar = {setSearchBar}/>} >
          <Route path='/dashboard' element={<Dashboard searchBar={searchBar} />} />
          <Route path='/profile' element={<Profile searchBar={searchBar}/>} />
          <Route path='/create-blog' element={<CreateBlog searchBar={searchBar}/>} />
          <Route path='/blog-edit/:id' element={<BlogEditor searchBar={searchBar}/>} />
        </Route>
      </>
    )
  )
  return (

    // <Router>
    //   <Sidebar setSearchBar={setSearchBar} />
    //   <Routes>

    //     <Route path='/' element={<Home />} >
    //       <Route path='blogs' element={<Blogs searchBar={searchBar} />} />
    //       <Route path='blog/:id' element={<BlogView searchBar={searchBar} />} />
    //       <Route path='blogs/blockchain' element={<Blockchain searchBar={searchBar} />} />
    //       <Route path='blogs/wallet' element={<Wallet searchBar={searchBar} />} />
    //       <Route path='blogs/coin' element={<Coin searchBar={searchBar} />} />
    //       <Route path='blogs/trading' element={<Trading searchBar={searchBar} />} />
    //       <Route path='exchange' element={<Exchange searchBar={searchBar} />} />
    //       <Route path='prices' element={<Prices searchBar={searchBar} />} />
    //       <Route path='apps' element={<Apps searchBar={searchBar} />} />
    //       <Route path='advertise' element={<Advertise searchBar={searchBar} />} />
    //       <Route path='about' element={<About searchBar={searchBar} />} />
    //       <Route path='contact' element={<Contact searchBar={searchBar} />} />
    //       <Route path='sitemap' element={<Sitemap searchBar={searchBar} />} />
    //       <Route path='privacy-policy' element={<PrivacyPolicy searchBar={searchBar} />} />
    //       <Route path='*' element={<NotFound searchBar={searchBar} />} />
    //       <Route path='author/:id' element={<Author searchBar={searchBar} />} />
    //       <Route path='register' element={<Register searchBar={searchBar} />} />
    //       <Route path='login' element={<Login searchBar={searchBar} />} />
    //       <Route path='test3' element={<Test3 />} />
    //       <Route path='test4' element={<Test4 />} />
    //       <Route path='test5' element={<Test5 />} />

    //     </Route>



    //     {/* <Route path='/' element={<Sidebar setSearchBar = {setSearchBar} />} >
    //       <Route index element={<Home />} />
    //       <Route path='/fxcryptospot' element={<Home />} />
    //       <Route path='/blogs' element={<Blogs searchBar = {searchBar} />} />
    //       <Route path='/blog/:id' element={<BlogView searchBar = {searchBar} />} />

    //       <Route path='/blogs/blockchain' element={<Blockchain searchBar = {searchBar} />} />
    //       <Route path='/blogs/wallet' element={<Wallet searchBar = {searchBar} />} />
    //       <Route path='/blogs/coin' element={<Coin searchBar = {searchBar} />} />
    //       <Route path='/blogs/trading' element={<Trading searchBar = {searchBar} />} />
    //       <Route path='/exchange' element={<Exchange searchBar = {searchBar} />} />
    //       <Route path='/prices' element={<Prices searchBar = {searchBar} />} />
    //       <Route path='/apps' element={<Apps searchBar = {searchBar} />} />
    //       <Route path='/advertise' element={<Advertise searchBar = {searchBar} />} />
    //       <Route path='/about' element={<About searchBar = {searchBar} />} />
    //       <Route path='/contact' element={<Contact searchBar = {searchBar} />} />
    //       <Route path='/sitemap' element={<Sitemap searchBar = {searchBar} />} />
    //       <Route path='/privacy-policy' element={<PrivacyPolicy searchBar = {searchBar} />} />
    //       <Route path='/*' element={<NotFound searchBar = {searchBar} />} />
    //       <Route path='/test3' element={<Test3/>} />
    //       <Route path='/test4' element={<Test4/>} />
    //       <Route path='/test5' element={<Test5 />} />
    //       <Route path='/author/:id' element={<Author searchBar = {searchBar} />} />
    //       <Route path='/register' element={<Register searchBar = {searchBar} />} />
    //       <Route path='/login' element={<Login searchBar = {searchBar} />} />

    //     </Route> */}

    //     {/* =============Protected Routes============  */}

    //     <Route element={<PrivateRoutes setSearchBar={setSearchBar} />}>
    //       <Route path='/dashboard' element={<Dashboard searchBar={searchBar} />} />
    //       <Route path='/profile' element={<Profile />} />
    //       <Route path='/create-blog' element={<CreateBlog />} />
    //       <Route path='/blog-edit/:id' element={<BlogEditor />} />
    //     </Route>

    //     {/* =============Protected Routes============  */}


    //     {/* <Route path='/test4' element={<Test4/>} />
    //     <Route path='/test5' element={<Test5/>} />
    //     <Route path='/test3' element={<Test3/>} /> */}


    //   </Routes>
    //   <MuiFooter />
    //   {/* <MuiFooter /> */}
    //   <CssBaseline />
    // </Router>
    <HelmetProvider>

    <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
