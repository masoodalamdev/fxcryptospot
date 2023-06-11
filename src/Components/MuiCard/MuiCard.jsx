import React from 'react'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Grow, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material'
// import { getToken } from './Services/LocalStorageServices'
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import { getToken } from '../../Services/LocalStorageServices';
import blogPostImg from '../../Assets/Images/blog.jpg'
import profileImg from '../../Assets/Images/user2.jpg'
import { FcTreeStructure, FcLikePlaceholder } from "react-icons/fc";




export default function MuiCard(props) {
  const {image, profileImage, title, categoryAndDate, id, handleEdit, handleDelete, handleFavorite, handleShare, clickHandler, authorID} = props
  const token = getToken('token')
  const theme = useTheme()
  const [checked, setChecked] = React.useState(true);

  // const handleDel = ()=>{
  //   console.log('Del clicked succesfully')
  // }

  return (
    <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}
        >
    <Card sx={{ minHeight: '400px', maxHeight: '400px', bgcolor: theme.palette.background.paper}}>
    <a href={`/blog/${id}`} style={{textDecoration: 'none'}} >

        <CardMedia
          component="img"
          height="250"
          image={image}
          alt="blog image"
        />
        <CardHeader
          avatar={
            <Avatar
              aria-label="profile IMG"
              src={profileImage}
              href={`/author/${authorID}`}
              component="a"
            >
            </Avatar>
          }

          titleTypographyProps={{ variant: "body", fontFamily: "sans-serif Roboto Helvetica Arial"}}
          title={title}
          subheader={categoryAndDate}
          sx={{color: "text.primary", minHeight: '100px', maxHeight: '100px' }}
          
        />

        {/* <CardContent
        sx={{minHeight: '150px', maxHeight: '150px' }}
        >

          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              border: '1px solid green'
            }}
           dangerouslySetInnerHTML={{ __html: description }} 
           
          >
          </Typography>

        </CardContent> */}
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
            {/* <FavoriteIcon onClick={handleFavorite} /> */}
            <FcLikePlaceholder onClick={handleFavorite} size={24}/>
            
          </IconButton>
          <IconButton aria-label="share">
            <FcTreeStructure onClick={handleShare} size={24}/>
            {/* <ShareIcon onClick={handleShare} size={24}/> */}
          </IconButton>
        </CardActions>

      </Card>
      </Grow>
    )
}
