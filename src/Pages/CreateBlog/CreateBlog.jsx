import { Box, Button, Card, CardContent, Divider, Grid, MenuItem, Stack, TextField, Toolbar, Typography, useTheme } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from "jodit-pro-react";
import { Book, RestartAlt, Send } from '@mui/icons-material'
import FileInput from '../../Components/FileInput'
import AccordionComponent from '../../Components/Accordion/Accordion'
import * as userServices from '../../Services/UserServices.js'
import axios from 'axios';
import { getToken } from '../../Services/LocalStorageServices.js';
import * as blogServices from '../../Services/blogServices.js'
import { useNavigate } from 'react-router-dom';
import Notification from '../../Components/Notification/Notification'
import PageHeader from '../../Components/PageHeader/PageHeader';
import MuiSelect from '../../Components/MuiSelect/MuiSelect';
import Autocomplete from '@mui/material/Autocomplete';
import { FcPlus } from 'react-icons/fc';




export default function CreateBlog() {

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    tags: "",
    status: "PUBLISHED",
    createdAt: "",
    updatedAt: "",
    author: { authorID: "", authorName: "", authorEmail: "", authorImage: "" }
  });

  const { title, content, image, category, tags, status, createdAt, updatedAt, author: { authorID, authorName, authorEmail, authorImage } } = blog
  const [clearField, setClearField] = useState(blog)
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const navigate = useNavigate();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
const theme = useTheme()
  const editor = useRef(null)
  const [textEditorcontent, setTextEditorContent] = useState('')
  const config = {
    placeholder: 'Start writing your amazing blog...'
  }

  const token = getToken()
  const url = 'https://fxcryptospot.cyclic.app/api/user/loggeduser'

  useEffect(() => {
    getUserDetail()
  }, [])

  const getUserDetail = async () => {
    const response = await axios.get(url, {
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
        console.log(error);
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
    setTextEditorContent('')
  }

  const registerBlog = async () => {
    await blogServices.createBlog(blog)
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
    blog.createdAt = currentDate
    blog.updatedAt = currentDate
    // if (title && description && publishDate && publishBy && img) {
    registerBlog(blog)
    setNotify({
      isOpen: true,
      message: 'Blog Created Succesfully',
      type: 'success'
    })
    // console.log(blog)
    // addOrEdit(blog, resetForm);
    resetForm()
    // console.log(blog, 'success')
    // }
    // else {
    // console.log("Please enter complete blog details")
    // console.log(blog, 'failed')
    // }
  }


  const statusList = blogServices.getStatus().map((item, index) => {
    return (
      <MenuItem value={item.value} > {item.name}</MenuItem>
    )
  })
  const categoryList = blogServices.getCategory().map((item, index) => {
    return (
      <MenuItem value={item.value} > {item.name}</MenuItem>
    )
  })
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  return (

    <>
      {/* <Box sx={{ display: 'flex', backgroundColor: '#cfd8dc', minHeight: 100 + 'vh' }}> */}



        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default, minHeight: 100 + 'vh' }}>
          <Toolbar/>
          <PageHeader
            icon={<FcPlus size={24} />}
            title="Blog Posts"
            subTitle="Add New Post"
          />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Card sx={{ height: 100 + 'vh', maxWidth: '100%', p: 1 }}>

                  <Stack direction="column">

                    <TextField id="outlined-basic" label="Blog Title" variant="outlined" name="title" autoComplete='off' value={blog.title} onChange={handleInputChange} sx={{ marginTop: '12px' }} inputProps={{ maxLength: 60 }} />
                    <br />
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={newContent => setTextEditorContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={newContent => { blog.content = newContent }}
                    />

                    {/* {content} */}

                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column">
                  <Card sx={{ height: 100 + 'vh', p: 1 }}>
                    <Typography variant='h6' sx={{ margin: '12px', textAlign: 'center' }}>
                      Actions
                    </Typography>
                    <Divider />
                    <br/>
                    <MuiSelect
                      label="Category"
                      handleChange={handleInputChange}
                      name="category"
                      value={blog.category}
                      MenuItemList={
                        categoryList
                      }
                    />
                    {/* <br />
                    <br />
                    <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div> */}
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
                        setValue(newValue);
                        // console.log(value)
                        // console.log(value)
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
                    <Stack spacing={12} direction="row" sx={{ display: 'flex', margin: '0 auto', justifyContent: "center", alignItems: 'center' }}>

                      <Button endIcon={<RestartAlt />} variant="contained" onClick={resetForm}>Reset</Button>

                      <Button endIcon={<Send />} variant="contained" type='submit' > {blog.status === "PUBLISHED" ? 'Publish' : 'Save'} </Button>
                    </Stack>

                  </Card>
                  {/* <Box height={20} /> */}

                  {/* <Card sx={{ height: 290 }}>
                    <Typography variant='h6' sx={{ margin: '12px', textAlign: 'center' }}>
                      Recent Blog Posts
                    </Typography>
                    <Divider />
                    <AccordionComponent />
                  </Card> */}
                </Stack>
              </Grid>

            </Grid>
          </form>
        </Box>
      {/* </Box> */}


      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </>
  )
}
