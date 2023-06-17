import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import * as blogServices from '../../Services/blogServices'
import PageHeader from '../../Components/PageHeader/PageHeader'
import { Box, Button, Card, Chip, CardContent, Divider, Grid, MenuItem, Stack, TextField, Toolbar, Typography, useTheme, ButtonGroup } from '@mui/material'
import { Book, RestartAlt, Send } from '@mui/icons-material'
import FileInput from '../../Components/FileInput'
import * as userServices from '../../Services/UserServices.js'
import axios from 'axios';
import { getToken } from '../../Services/LocalStorageServices.js';
import { useNavigate } from 'react-router-dom';
import Notification from '../../Components/Notification/Notification'
import MuiSelect from '../../Components/MuiSelect/MuiSelect';
import Autocomplete from '@mui/material/Autocomplete';
import { FcEditImage } from 'react-icons/fc';
import JoditEditor from 'jodit-react';

export default function BlogEditor() {
  const { id } = useParams()
  
  const theme = useTheme()
  const initialValue = {
      title: "",
      content: "",
      image: "",
      category: "",
      // tags: "556",
      status: "PUBLISHED",
      createdAt: "",
      updatedAt: "",
      // author: { authorID: "", authorName: "", authorEmail: "", authorImage: "" }
    }
    const [blog, setBlog] = useState(initialValue)
  const [tags, setTags] = useState()
  const getBlog = async () => {
    let response = await blogServices.getBlogById(id);
    setBlog(response.data);
    setTags(response.data.tags);
    // console.log(response.data);
  }

  useEffect(() => {
    getBlog();
  }, [])

  const { title, content, image, category, status, createdAt, updatedAt } = blog
  // console.info(title, content, image, category, tags, status, createdAt, updatedAt)
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState();
  // console.log("blog data=>", title, content, image, category, tags, status, createdAt, updatedAt)







  const handleEdit = () => {
    alert('edited succesfully')
  }
  const handleDelete = () => {
    alert('deleted succesfully')
  }
  const handleFavorite = () => {
    alert('favorite added succesfully')
  }
  const handleShare = () => {
    alert('share succesfully')
  }
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };


  //   const { title, content, image, category, tags, status, createdAt, updatedAt, author: { authorID, authorName, authorEmail, authorImage } } = blog
  const [clearField, setClearField] = useState(blog)
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const navigate = useNavigate();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' })
  // const theme = useTheme()
  const editor = useRef(null)
  const [textEditorcontent, setTextEditorContent] = useState('')
  const config = {
    placeholder: 'Start writing your amazing blog...'
  }

  const token = getToken()
  const url = 'http://localhost:8000/api/user/loggeduser'

  //   useEffect(() => {
  //     getUserDetail()
  //   }, [])

  //   const getUserDetail = async () => {
  //     const response = await axios.get(url, {
  //       'headers': {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //       .then((response => {
  //         const authorInfo = response.data.user
  //         // console.log(authorInfo)
  //         blog.author.authorID = authorInfo._id
  //         blog.author.authorName = authorInfo.name
  //         blog.author.authorEmail = authorInfo.email
  //         blog.author.authorImage = authorInfo.image
  //         // console.log(response.data.user)
  //       }))
  //       .catch((error) => {
  //         console.log(error);
  //       })

  //   };

  const handleInputChange = (e) => {
    // let {name, value} = e.target.value;
    setBlog({ ...blog, [e.target.name]: e.target.value })

  }
  const handleInputState = (name, value) => {
    setBlog((prev) => ({ ...prev, [name]: value }));

  }

  const resetForm = () => {
    setBlog(clearField)
    setTextEditorContent('')
  }

  const updateBlog = async () => {
    await blogServices.editBlog(id, blog)
      .then((response => {
        console.log(response.data.message)
        console.log("Redirecting to blog portal..!")
        setTimeout(() => { navigate('/blogs') }, 2000);
      }))
      .catch((response) => {
        // console.log(error);
        console.log(response.data.message)
      })
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    // blog.createdAt = currentDate
    // blog.updatedAt = currentDate
    // if (title && description && publishDate && publishBy && img) {
      updateBlog(blog)
    setNotify({
      isOpen: true,
      message: 'Blog Updated Succesfully',
      type: 'success'
    })
    // console.log(blog)
    // addOrEdit(blog, resetForm);
    // resetForm()
    // console.log(blog, 'success')
    // }
    // else {
    // console.log("Please enter complete blog details")
    // console.log(blog, 'failed')
    // }
  }


  const statusList = blogServices.getStatus().map((item, index) => {
    return (
      <MenuItem key={index}  value={item.value} > {item.name}</MenuItem>
    )
  })
  const categoryList = blogServices.getCategory().map((item, index) => {
    return (
      <MenuItem key={index} value={item.value} > {item.name}</MenuItem>
    )
  })


  return (
    <>
    <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, px:{xs:3, sm:10, md:12, lg:8, xl:32}, minHeight: 100 + 'vh' }} >
        <Toolbar />
        <PageHeader
          icon={<FcEditImage szie={24} />}
          title="Blog Editor"
          subTitle="Update This Blog"
        />
        {/* ============================ */}
        <form onSubmit={handleSubmit}>
          <Grid container>
          <Grid item xs={12} sm={12} md={9} lg={9} sx={{ pr: { md: 4 }, pb: { xs: 4, sm: 4, md: 4, } }} >

                <Card sx={{ height: 150 + 'vh', p:2, borderRadius: '1rem'}}>

                  <Stack direction="column">

                    <TextField id="outlined-basic" label="Blog Title" variant="outlined" name="title" autoComplete='off' value={title} onChange={handleInputChange} sx={{ marginTop: '12px' }} />
                    <br />
                    <JoditEditor
                      ref={editor}
                      value={blog.content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={newContent => setTextEditorContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={newContent => { blog.content = newContent }}
                    />

                    {blog.content}

                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}>

              {/* <Stack direction="column"> */}
                <Card sx={{ height: 150 + 'vh', p: 2 , borderRadius: '1rem'}}>
                  <Typography variant='h6' sx={{ margin: '12px', textAlign: 'center' }}>
                    Actions
                  </Typography>
                  <Divider />
                  <br />
                  <MuiSelect
                    label="Category"
                    handleChange={handleInputChange}
                    name="category"
                    value={category}
                    MenuItemList={
                      categoryList
                    }
                  />
                  <br />
                  <br />
                  {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
                  <div>{`inputValue: '${inputValue}'`}</div> */}
                  {/* <br />
                  <br /> */}
                  {tags && tags ? 
                 
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    // options={blogServices.getTags()}
                    options={tags}
                    //     options={[
                    //       'Bitcoin', 'Blockchain', 'Ethereum','Mining', 'Trading', 'Crypto Currency', 'Wallet', 'Coin'
                    //  ]}
                    // options={blog && blog.tags}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    //     defaultValue={[
                    //       'Bitcoin', 'Blockchain', 'Ethereum'
                    //  ]}
                    // defaultValue={null}
                    // value={blog.tags}
                    defaultValue={tags}
                    filterSelectedOptions
                    onChange={(event, newValue) => {
                      setValue(newValue);
                      // console.log(value)
                      // console.log(value)
                      // value = {inputValue || null}
                      blog.tags = newValue
                      // console.log(blog)
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
                      />
                    )}
                  />
                : '' }
                  <br />
                  <MuiSelect
                    label="Status"
                    handleChange={handleInputChange}
                    name="status"
                    // defaultValue="123"
                    value={status}
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
                    value={image}
                  />
                  <br />
                  <Divider />
                  <br />
                  <ButtonGroup size="medium" aria-label="large button group" fullWidth>

                      <Button endIcon={<RestartAlt />} onClick={resetForm} sx={{ textTransform: 'capitalize'}}>Reset</Button>

                      <Button endIcon={<Send />} type='submit'  sx={{ textTransform: 'capitalize'}}> {blog.status === "PUBLISHED" ? 'Publish' : 'Save'} </Button>
                    </ButtonGroup>
                </Card>
                {/* <Box height={20} /> */}

                {/* <Card sx={{ height: 290 }}>
                    <Typography variant='h6' sx={{ margin: '12px', textAlign: 'center' }}>
                      Recent Blog Posts
                    </Typography>
                    <Divider />
                    <AccordionComponent />
                  </Card> */}
              {/* </Stack> */}
            </Grid>

          </Grid>
        </form>
       
      </Box>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </>
  )
}
