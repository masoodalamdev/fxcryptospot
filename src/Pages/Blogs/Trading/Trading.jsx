import { Box, Grid, Toolbar,useTheme, InputBase } from '@mui/material'
import React, { useEffect, useState } from 'react'
import * as blogServices from '../../../Services/blogServices'
import PageHeader from '../../../Components/PageHeader/PageHeader'
import MuiCard from '../../../Components/MuiCard/MuiCard'
import Notification from '../../../Components/Notification/Notification'
import ConfirmDialog from '../../../Components/ConfirmDialog/ConfirmDialog'
import RightSidebar from '../../../Components/RightSidebar/RightSidebar'
import MuiCardSkeleton from '../../../Components/MuiCardSkeleton/MuiCardSkeleton'
import { FcPositiveDynamic , FcCancel, } from 'react-icons/fc';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import SearchIcon from '@mui/icons-material/Search';
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


export default function Trading(props) {

  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
  const theme = useTheme()
  const currentUrl = window.location.href
  const {searchBar} = props
  const [searchQuery, setSearchQuery] = useState({ "searchQuery": ""})
  const [searchedBlog, setSearchedBlog] = useState([])
  const [searchHeader, setSearchHeader] = useState({title: "Search something amazing", subTitle: "Learn crypto earn crypto", icon: true})

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value })
  }
  const handleSearch = async () => {
    await blogServices.getSearchBlogs(searchQuery)
      .then((response => {
        if(response.data.data.length > 0){
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


  const getBlogList = async () => {
    let response = await blogServices.getTradingBlogs();
    const blogsArray = response.data.reverse()
    setBlogs(blogsArray);
    setLoading(true);

  }

  useEffect(() => {
    getBlogList();
  }, []);

  // const updateBlog = async (blog, id) => {
  //   let response = await blogServices.editBlog(blog, id);
  //   if (response.status === 200) {
  //     console.log("Records Updated Succesfully")
  //   }
  // }


  const handleFavorite = () => {
    alert('favorite added succesfully')
    console.log('favorite added succesfully')
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
        getBlogList();
      }))
      .catch((response) => {
        // console.log(error);
        console.log(response.data.message)
      })

  }
  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, px:{xs:3, sm:10, md:9, lg:8, xl:32}, minHeight: 100 + 'vh' }} >
    <Toolbar/>
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
            icon={<FcPositiveDynamic size={40} />}
            title="Trading"
            subTitle="Learn Crypto Earn Crypto"
          />
        }
   
     <Grid container >
              {/* <Stack direction="row"> */}
              <Grid item xs={12} sm={12} md={9} lg={9}>
              <Grid container >
            {loading ? (
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
             blogs.map((item, index) => {
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
            )
              :
              <>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ pr: { md: 4 }, pb: { xs: 4, sm: 4, md: 4, } }}>
                  <MuiCardSkeleton />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ pr: { md: 4 }, pb: { xs: 4, sm: 4, md: 4, } }}>
                  <MuiCardSkeleton />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ pr: { md: 4 }, pb: { xs: 4, sm: 4, md: 4, } }}>
                  <MuiCardSkeleton />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ pr: { md: 4 }, pb: { xs: 4, sm: 4, md: 4, } }}>
                  <MuiCardSkeleton />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ pr: { md: 4 }, pb: { xs: 4, sm: 4, md: 4, } }}>
                  <MuiCardSkeleton />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ pr: { md: 4 }, pb: { xs: 4, sm: 4, md: 4, } }}>
                  <MuiCardSkeleton />
                </Grid>
              </>
}
          </Grid>
</Grid>
            <Grid item xs={0} sm={0} md={3} lg={3}>
            <RightSidebar/>
            </Grid>

            {/* </Stack> */}

    </Grid>
    <Notification
      notify={notify}
      setNotify={setNotify}
    />
    <ConfirmDialog
    confirmDialog= {confirmDialog}
    setConfirmDialog = {setConfirmDialog}
    />
    <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
  </Box>
  )
}
