import { Box, Button, ButtonGroup, Card, Divider, Grid, InputBase, MenuItem, TextField, Toolbar, Typography, useTheme } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react';
import { RestartAlt, Send } from '@mui/icons-material'
import FileInput from '../../../Components/FileInput'
import axios from 'axios';
import { getToken } from '../../../Services/LocalStorageServices.js';
import * as blogServices from '../../../Services/blogServices.js'
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../Components/PageHeader/PageHeader';
import MuiSelect from '../../../Components/MuiSelect/MuiSelect';
import Autocomplete from '@mui/material/Autocomplete';
import { FcCheckmark, FcPlus, FcCancel } from 'react-icons/fc';
import JoditEditor from 'jodit-react';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import SearchIcon from '@mui/icons-material/Search';
import MuiCard from '../../../Components/MuiCard/MuiCard'
import Notification from '../../../Components/Notification/Notification'
import ConfirmDialog from '../../../Components/ConfirmDialog/ConfirmDialog'

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

export default function CreateBlog(props) {

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    tags: [],
    status: "PUBLISHED",
    buttonText: "",
    refLink: "",
    createdAt: "",
    updatedAt: "",
    author: { authorID: "", authorName: "", authorEmail: "", authorImage: "" }
  });

  const { title, content, image, category, tags, status, buttonText, refLink, createdAt, updatedAt, author: { authorID, authorName, authorEmail, authorImage } } = blog
  const [clearField, setClearField] = useState(blog)
  // const [currentDate, setCurrentDate] = React.useState(new Date());
  const currentDate = new Date();
  const navigate = useNavigate();
  const editor = useRef(null)
  const [textEditorContent, setTextEditorContent] = useState('')
  const config = {
    placeholder: 'Start writing your amazing blog...'
  }

  const token = getToken()
  const url = 'https://fxcryptospot.cyclic.app/api/user/loggeduser'
  const theme = useTheme()
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
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

  useEffect(() => {
    getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUserDetail = async () => {
      await axios.get(url, {
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response => {
        const authorInfo = response.data.user
        // console.log(authorInfo)
        blog.author.authorID = authorInfo._id
        blog.author.authorName = authorInfo.name
        blog.author.authorEmail = authorInfo.email
        blog.author.authorImage = authorInfo.image
        // console.log(response.data.user)
      }))
      .catch((error) => {
        // console.log(error);
      })

  };

  const handleInputChange = (e) => {
    // let {name, value} = e.target.value;
    setBlog({ ...blog, [e.target.name]: e.target.value })

  }
  const handleInputState = (name, value) => {
    setBlog((prev) => ({ ...prev, [name]: value }));

  }

  const resetForm = () => {
    setBlog(clearField)
    setClearField(clearField)
    setTextEditorContent('')
    blog.content = ""
  }

  const registerBlog = async () => {
    await blogServices.createBlog(blog)
      .then((response => {
        setNotify({
          isOpen: true,
          message: response.data.message,
          type: response.data.status
        })
        resetForm()
        setTimeout(() => { navigate('/blogs') }, 2000);
      }))
      .catch((response) => {
        // console.log(error);
        console.log(response.data.message)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    blog.createdAt = currentDate
    blog.updatedAt = currentDate
    blog.tags = tagsValue
    if (title && content && image && category && tags && status && buttonText && refLink && createdAt && updatedAt && authorID && authorName && authorEmail && authorImage) {
      registerBlog(blog)
      console.log(blog)
    }
    else {
      setNotify({
        isOpen: true,
        message: 'All fields are required',
        type: 'error'
      })
      // console.log(blog)
    }
  }


  const statusList = blogServices.getStatus().map((item, index) => {
    return (
      <MenuItem value={item.value} key={item.name} > {item.name}</MenuItem>
    )
  })
  const categoryList = blogServices.getCategory().map((item, index) => {
    return (
      <MenuItem value={item.value} key={item.name} > {item.name}</MenuItem>
    )
  })
  const [tagsValue, setTagsValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  return (

    <>
      {/* <Box sx={{ display: 'flex', backgroundColor: '#cfd8dc', minHeight: 100 + 'vh' }}> */}



      <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, px: { xs: 3, sm: 10, md: 9, lg: 8, xl: 32 }, minHeight: 100 + 'vh' }} >
        <Toolbar />
      
        <PageHeader
        icon={searchBar ? (searchHeader.icon === true ? <SearchIcon size={24} /> : <FcCancel size={24} />) : <FcPlus size={24} />}
        title={searchBar ? searchHeader.title : "Create Blog"}
        subTitle={searchBar ? searchHeader.subTitle : "Add New Post"}
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
            <Grid item xs={12}>
 <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} sm={12} md={9} lg={9} sx={{ pr: { md: 4 }, pb: { xs: 4, sm: 4, md: 4, } }} >
              <Card sx={{ height: 150 + 'vh', p: 2, borderRadius: '1rem' }}>


                <TextField label="Blog Title" variant="outlined" fullWidth
                  name="title" autoComplete='off' 
                  value={blog.title} onChange={handleInputChange} 
                  sx={{ marginTop: '12px' }}
                  inputProps={{ maxLength: 60 }}
                  error={!blog.title ? true : false}
                  helperText={!blog.title ? 'Blog title required' : <FcCheckmark />}
                />
                <br />
                <br />
                <JoditEditor
                  ref={editor}
                  value={textEditorContent}
                  config={config}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={newContent => setTextEditorContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={newContent => { blog.content = newContent }}
                />

                {/* {content} */}

              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>

              {/* <Stack direction="column"> */}
              <Card sx={{ height: 150 + 'vh', p: 2, borderRadius: '1rem' }}>
                <Typography variant='h6' sx={{ margin: '12px', textAlign: 'center' }}>
                  Actions
                </Typography>
                <Divider />
                <br />
                <MuiSelect
                  label="Category"
                  handleChange={handleInputChange}
                  name="category"
                  value={blog.category}
                  MenuItemList={
                    categoryList
                  }
                  error={!blog.category ? true : false}
                  helperText={!blog.category ? 'Category required' : <FcCheckmark />}
                />
                <br />
                <br />

                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={blogServices.getTags()}
                  getOptionLabel={(option) => option}
                  // isOptionEqualToValue={(option, value) => option === value.name}
                  // defaultValue={[top100Films[2]]}
                  filterSelectedOptions
                  onChange={(event, newValue) => {
                    setTagsValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    // console.log(inputValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="Bitcoin"
                      error={blog.tags.length === 0 ? true : false}
                      helperText={blog.tags.length === 0 ? 'Tags required' : <FcCheckmark />}
                    />
                  )}
                />
                <br />
                <TextField label="Button Text" variant="outlined"
                  name="buttonText" fullWidth autoComplete='off'
                  value={buttonText} onChange={handleInputChange}
                  sx={{ marginTop: '12px' }}
                  error={!blog.buttonText ? true : false}
                  helperText={!blog.buttonText ? 'Button text required' : <FcCheckmark />}
                />
                <br />
                <br />
                <TextField label="Refferal URL" variant="outlined"
                  name="refLink" fullWidth autoComplete='off' value={refLink}
                  onChange={handleInputChange} sx={{ marginTop: '12px' }}
                  error={!blog.refLink ? true : false}
                  helperText={!blog.refLink ? 'Refferal link required' : <FcCheckmark />}
                />
                <br />
                <br />
                <MuiSelect
                  label="Status"
                  handleChange={handleInputChange}
                  name="status"
                  // defaultValue="123"
                  value={blog.status}
                  MenuItemList={
                    statusList
                  }
                />
                <br />
                <br />

                <FileInput
                  name="image"
                  label="Choose Blog Image"
                  handleInputState={handleInputState}
                  type="image"
                  value={blog.image}
                />
                <br />
                <Divider />
                <br />

                <ButtonGroup size="medium" aria-label="large button group" fullWidth>

                  <Button endIcon={<RestartAlt />} onClick={resetForm} sx={{ textTransform: 'capitalize' }}>Reset</Button>

                  <Button endIcon={<Send />} type='submit' sx={{ textTransform: 'capitalize' }}> {blog.status === "PUBLISHED" ? 'Publish' : 'Save'} </Button>
                </ButtonGroup>
              </Card>
            </Grid>

          </Grid>
        </form>
        </Grid>
        }
      </Grid>
       
      </Box>

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
    </>
  )
}
