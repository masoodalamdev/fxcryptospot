import { Box, Button, Grid, Toolbar, Typography, useTheme, InputBase } from '@mui/material'
import React, { useState } from 'react'
import bgImg from '../../../Assets/Images/bg.jpeg'
import MuiInput from '../../../Components/Inputs/MuiInput/MuiInput'
import { Navigate, useNavigate } from 'react-router-dom'
import * as UserServices from '../../../Services/UserServices'
import { storeToken, getToken } from '../../../Services/LocalStorageServices';
import PageHeader from '../../../Components/PageHeader/PageHeader'
import { LockOutlined, LoginOutlined } from '@mui/icons-material'
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import * as blogServices from '../../../Services/blogServices'
import { FcLock } from 'react-icons/fc'
import SearchIcon from '@mui/icons-material/Search';
import MuiCard from '../../../Components/MuiCard/MuiCard'
import Notification from '../../../Components/Notification/Notification'
import ConfirmDialog from '../../../Components/ConfirmDialog/ConfirmDialog'
import { Helmet } from 'react-helmet-async'
import SearchHeader from '../../../Components/SearchHeader/SearchHeader'
import SearchFound from '../../../Assets/Images/SearchFound.png'
import SearchNotFound from '../../../Assets/Images/SearchNotFound.png'
// =================== back to top button started =========================

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

// =================== back to top button ended =========================

export default function Login(props) {

  const token = getToken()

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // eslint-disable-next-line
  const [clearField, setClearField] = useState(user)
  // eslint-disable-next-line

  const theme = useTheme()
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const { searchBar } = props
  const [searchQuery, setSearchQuery] = useState({ "searchQuery": ""})
  const [searchedBlog, setSearchedBlog] = useState([])
  const [searchHeader, setSearchHeader] = useState({ title: "Search something amazing", subTitle: "Learn crypto earn crypto", icon: true })

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value })
  }
  const handleSearch = async () => {
    await blogServices.getSearchBlogs(searchQuery)
      .then((response => {
        if (response.data.data.length > 0) {
          setSearchedBlog(response.data.data)
          setSearchHeader({
            title: `You have searched for "${searchQuery.searchQuery}"`,
            subTitle: `${response.data.data.length} results found`,
            icon: true
          })
        }
      }))
      .catch((response) => {
        // console.log(error);
        setSearchedBlog(null)
        setSearchHeader({
          title: 'Your search did not match any results!',
          subTitle: 'Try to search some another keywords',
          icon: false
        })
      })
  }
  const currentUrl = window.location.href

  const handleFavorite = () => {
    alert('favorite added succesfully')
  }

  const handleDelete = (id) => {
    // console.log("event=>", event, "message=>", id)
    blogServices.deleteBlog(id)
      .then((response => {
        // console.log(response)
        const msg = response.data
        // console.log("Redirecting to blog portal..!")
        // setTimeout(() => { navigate('/blogs') }, 2000);
        setConfirmDialog({
          ...setConfirmDialog,
          isOpen: false
        })
        setNotify({
          isOpen: true,
          message: msg,
          type: 'success'
        })
      }))
      .catch((response) => {
        // console.log(error);
        console.log(response.data.message)
      })

  }

  const resetForm = () => {
    setUser(clearField)
  }

  const { email, password } = user

  const navigate = useNavigate();

  const loginUser = async () => {
    await UserServices.loginUser(user)
      .then((response => {
        console.log(response.data.message)
        console.log("Hello " + response.data.name)
        // console.log(user)
        setNotify({
          isOpen: true,
          message: 'Login Succesfully',
          type: 'success'
        })
        resetForm()
        // TOKEN STORE
        storeToken(response.data.token)
        setTimeout(() => { navigate('/dashboard') }, 500);
      }))
      .catch((response) => {
        console.log(response.data.message)
      })
  }

  const handleInputChange = (e) => {
    // let {name, value} = e.target.value;
    setUser({ ...user, [e.target.name]: e.target.value })

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("All fields are required")
    } else {
      loginUser(user)
      // resetForm()

    }
  }

  return (
    !token ?
      <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, px: { xs: 3, sm: 10, md: 9, lg: 8, xl: 32 }, minHeight: 100 + 'vh' }} >
        <Toolbar />
        {searchBar ?
          <>
            <SearchHeader
              icon={searchHeader.icon === true ? SearchFound : SearchNotFound}
              title={searchHeader.title}
              subTitle={searchHeader.subTitle}
            />

            <InputBase
              autoComplete='off'
              fullWidth
              sx={{ bgcolor: theme.palette.background.paper, mb: 4, height: '50px', p: 2, borderRadius: '1rem' }}
              placeholder='Search here'
              name="searchQuery" value={searchQuery.searchQuery}
              endAdornment={<SearchIcon fontSize="small" onClick={handleSearch} sx={{ cursor: 'pointer' }} />}
              onChange={handleSearchInput}
            />
          </>
          :
          <PageHeader
            icon={<FcLock size={40} />}
            title="Login"
            subTitle="Learn Crypto Earn Crypto"
          />
        }
        
        <Grid container >
          {
            searchBar ?
              searchedBlog && searchedBlog.map((item, index) => {

                return (
                  <Grid item xs={12} sm={12} md={6} lg={6} sx={{ pr: { md: 4 }, pb: { xs: 4, sm: 4, md: 4, } }} >

                    <MuiCard
                      key={index}
                      image={item.image}
                      profileImage={item.author.authorImage}
                      title={item.title}
                      // date={item.publishDate.substring(0,10)}
                      category={item.category}
                      chipColor={item.category === 'Bitcoin' ? 'primary' : (item.category === 'CryptoCurrency') ? 'secondary' : (item.category === 'Blockchain') ? 'error' : (item.category === 'Ethereum') ? 'success' : (item.category === 'Blockchain') ? 'info' : (item.category === 'Mining') ? 'warning' : 'primary'}
                      createdAt={item.createdAt.substring(0, 10)}
                      // description={item.content}
                      id={item._id}
                      slug={item.slug}
                      shareUrl={currentUrl + '/' + item.slug}
                      authorID={item.author.authorID}
                      handleDelete={() => {
                        // handleDelete(item._id)
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => { handleDelete(item._id) }
                        })
                      }}
                      // clickHandler={clickHandler}
                      handleFavorite={handleFavorite}
                    />
                  </Grid>
                )

              })
              :
              <>
                <Grid item xs={12} sm={6} md={8} lg={8} xl={8} sx={{ pr: { sm: 4 }, pb: { xs: 4, sm: 0 } }}>
                  <img src={bgImg} alt="backgroundImage" width='100%' height='100%' style={{ borderRadius: '1rem' }} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ bgcolor: theme.palette.background.paper, borderRadius: '1rem' }}>

                  <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: '25%', }}>
                    Login
                  </Typography>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { my: 2 },
                      p: 2
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <MuiInput
                      label='Email'
                      fullWidth
                      name='email'
                      value={user.email}
                      onChange={handleInputChange}
                    />
                    <br />
                    <MuiInput
                      label='Password'
                      type='password'
                      name='password'
                      value={user.password}
                      onChange={handleInputChange}

                    />
                    <Typography />

                    {/* <MuiButton
              text='Submit'
              variant='text'
              type='submit'
              fullWidth
              sx={{ bgcolor: '#444', color: '#fff', "&:hover": { bgcolor: '#444', color: '#fff', my:2 } }}
            /> */}
                    <Button endIcon={<LockOutlined />} sx={{ textTransform: 'capitalize', py: 2 }} variant='outlined' fullWidth type='submit'>Submit</Button>

                  </Box>
                </Grid>
              </>
          }
        </Grid>


        <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
        <ScrollTop {...props}>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Box>
      :
      <Navigate to='/dashboard' />
  )
}
