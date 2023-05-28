import React from 'react'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material'
// import { getToken } from './Services/LocalStorageServices'
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import { getToken } from '../../Services/LocalStorageServices';
import blogPostImg from '../../Assets/Images/blog.jpg'
import profileImg from '../../Assets/Images/user2.jpg'





export default function MuiCard(props) {
  const {image, profileImage, title, categoryAndDate, description, id, handleEdit, handleDelete, handleFavorite, handleShare, clickHandler} = props
  const token = getToken('token')
  const theme = useTheme()
  // const handleDel = ()=>{
  //   console.log('Del clicked succesfully')
  // }

  return (
    <Card sx={{ minHeight: '550px', maxHeight: '550px', bgcolor: theme.palette.background.paper}}>
    <a href={`/blog/${id}`} style={{textDecoration: 'none'}} >

        <CardMedia
          component="img"
          height="200"
          image={image}
          alt="blog image"
        />
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: 'red' }}
              aria-label="profile IMG"
              src={profileImage}
            >
            </Avatar>
          }

          titleTypographyProps={{ variant: "body", fontFamily: "sans-serif Roboto Helvetica Arial"}}
          title={title}
          subheader={categoryAndDate}
          sx={{color: "text.primary", minHeight: '150px', maxHeight: '150px' }}
          
        />

        <CardContent
        sx={{minHeight: '150px', maxHeight: '150px' }}
        >

          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical'
            }}
           dangerouslySetInnerHTML={{ __html: description }} 
           
          >
          </Typography>

        </CardContent>
        </a>
        
        <CardActions disableSpacing sx={{minHeight: '50px', maxHeight: '50px', justifyContent: 'space-between' }}>
        {token ? <>
          <IconButton aria-label="edit">
    <a href={`/blog-edit/${id}`} style={{textDecoration: 'none', color: 'inherit'}}>

            <Edit 
            // onClick={handleEdit}
            />
            </a>
          </IconButton>
          <IconButton aria-label="delete" >
            {/* <Delete onClick={() => clickHandler("Hello World!")}/> */}
            {/* <Delete onClick={(event) => clickHandler(event, id)}/> */}
            <Delete onClick={clickHandler}/>
          </IconButton>
          </>
          : ''
        }
          <IconButton aria-label="add to favorites">
            <FavoriteIcon onClick={handleFavorite} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon onClick={handleShare} />
          </IconButton>
        </CardActions>

      </Card>
    )
}
