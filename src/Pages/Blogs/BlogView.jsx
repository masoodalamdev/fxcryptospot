import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as blogServices from '../../Services/blogServices'
import { Box, Card, CardContent, Chip, Grid, Stack, Toolbar, Typography, useTheme } from '@mui/material'
import PageHeader from '../../Components/PageHeader/PageHeader'
import { Book } from '@mui/icons-material'
import MuiCardView from '../../Components/MuiCardView/MuiCardView'

export default function BlogView() {
  const { id } = useParams()
  const [blog, setBlog] = useState()
  const [tags, setTags] = useState([])
  console.log(blog)
  console.log(id)
  const theme = useTheme()

  useEffect(() => {
    getBlog();
  }, [])


  const getBlog = async () => {
    let response = await blogServices.getSingleBlog(id);
    setBlog(response.data);
    // setTags(response.data.tags)
    setTags(response.data.tags)
  }



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

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default, minHeight: 100 + 'vh' }}>
      <Toolbar/>
      <PageHeader
        icon={<Book />}
        title="Blog View"
        subTitle="Read Amazing Blogs"
      />
      <Grid container spacing={2}>

        <Grid item xs={12}>
          {blog ? <MuiCardView
            image={blog.image}
            profileImage='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
            title={blog.title}
            categoryAndDate={blog.createdAt.substring(0, 10) + " " + blog.category}
            description={blog.content}
            // id={item._id}
            MuiChip={
              
              tags.map((tag, index) => {
                return(
                <Chip label={tag} onClick={handleClick} sx={{m:1}} />
              )})
             
            }
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleFavorite={handleFavorite}
            handleShare={handleShare}
          />
            : ''}
        </Grid>

      </Grid>
    </Box>
  )
}