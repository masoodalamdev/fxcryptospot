import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as blogServices from '../../Services/blogServices'
import { Box, Card, CardContent, Chip, Grid, Stack, Toolbar, Typography, useTheme } from '@mui/material'
import PageHeader from '../../Components/PageHeader/PageHeader'
import { Book } from '@mui/icons-material'
import MuiCardView from '../../Components/MuiCardView/MuiCardView'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'
import MuiCardViewSkeleton from '../../Components/MuiCardViewSkeleton/MuiCardViewSkeleton'

export default function BlogView() {
  const { id } = useParams()
  const [blog, setBlog] = useState()
  const [tags, setTags] = useState([])
  // console.log(blog)
  // console.log(id)
  const theme = useTheme()

  useEffect(() => {
    getBlog();
  }, [])


  const getBlog = async () => {
    let response = await blogServices.getBlogBySlug(id);
    setBlog(response.data);
    setTags(response.data.tags)
    // console.log(response.data[0])
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
    <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, px: { xs: 3, sm: 10, md: 12, lg: 8, xl: 32 }, minHeight: 100 + 'vh' }} >
      <Toolbar />
      <PageHeader
        icon={<Book />}
        title="Blog View"
        subTitle="Learn Crypto Earn Crypto"
      />
      <Grid container>

        <Grid item xs={12} sm={12} md={9} lg={9} sx={{pr:4}}>
          {blog ?
              <MuiCardView
                image={blog.image}
                profileImage={blog.author.authorImage}
                title={blog.title}
                categoryAndDate={blog.createdAt.substring(0, 10) + " " + blog.category}
                description={blog.content}
                // id={item._id}
                MuiChip={
                  tags && tags.map((tag, index) => {
                    return(
                    <Chip key={index} label={tag} sx={{m:1}} component="a" href={`/blogs/${tag.toLowerCase()}`} clickable />
                  )})
                }
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                // handleFavorite={handleFavorite}
                handleShare={handleShare}
              />
            : 
           
        // <Grid item xs={12} sm={12} md={9} lg={9} sx={{pr:4}}>
              <MuiCardViewSkeleton/>
            // </Grid>
           
           } 
             </Grid> 
            
        <Grid item xs={0} sm={0} md={3} lg={3}><RightSidebar /></Grid>
      </Grid>
    </Box>
  )
}
