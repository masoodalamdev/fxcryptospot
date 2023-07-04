import { Box, Toolbar, useTheme, InputBase, Grid } from '@mui/material'
import React, { useState } from 'react'
import PageHeader from '../../Components/PageHeader/PageHeader'
import MuiCardFullView from '../../Components/MuiCardFullView/MuiCardFullView'
import { FcAndroidOs, FcCancel } from 'react-icons/fc'
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import SearchIcon from '@mui/icons-material/Search';
import * as blogServices from '../../Services/blogServices'
import MuiCard from '../../Components/MuiCard/MuiCard'
import Notification from '../../Components/Notification/Notification'
import ConfirmDialog from '../../Components/ConfirmDialog/ConfirmDialog'

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


export default function App(props) {
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
  return (

    <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, px: { xs: 3, sm: 10, md: 9, lg: 8, xl: 32 }, minHeight: 100 + 'vh' }} >
      <Toolbar />
      <PageHeader
        icon={searchBar ? (searchHeader.icon === true ? <SearchIcon size={24} /> : <FcCancel size={24} />) : <FcAndroidOs size={24} />}
        title={searchBar ? searchHeader.title : "Apps"}
        subTitle={searchBar ? searchHeader.subTitle : "Learn Crypto Earn Crypto"}
      />
      {searchBar ?
        <InputBase
        autoComplete='off'
          fullWidth
          sx={{ bgcolor: theme.palette.background.paper, mb: 4, height: '50px', p: 2, borderRadius: '1rem' }}
          placeholder='Search here'
          name="searchQuery" value={searchQuery.searchQuery}
          endAdornment={<SearchIcon fontSize="small" onClick={handleSearch} sx={{ cursor: 'pointer' }} />}
          onChange={handleSearchInput}
        />
        : ''
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
            <MuiCardFullView
              image='https://miro.medium.com/v2/resize:fit:1200/1*EBTWmUxeduGh0n7gv4EiNA.jpeg'
              profileImage='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
              title="Crypto Apps"
              categoryAndDate="01-01-2018"
              description="Welcome to Forex Crypto Spot, a blog website dedicated to providing valuable information and insights on Forex trading, cryptocurrency, buying and selling, and exchanging crypto coins My name is Masood Alam and I am the founder and primary contributor to this website With years of experience in the financial industry particularly in Forex and cryptocurrency trading I have gained a wealth of knowledge and expertise that I am passionate about sharing with my readers Through this blog I aim to provide readers with relevant and up-to-date information on Forex and crypto trading including market trends, analysis, and trading strategies. I believe that the world of finance is constantly evolving, and keeping up with the latest developments is crucial for anyone looking to make informed investment decisions Whether you are a seasoned trader or just starting in the world of finance, my goal is to provide you with valuable insights and resources to help you succeed in your investment journey. From beginner-friendly guides to in-depth analysis, Forex Crypto Spot is your go-to source for all things Forex and crypto Thank you for visiting my website, and I hope you find the information here helpful and informative. If you have any questions or comments, please don't hesitate to get in touch!"

            />
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

  )
}
