import React from 'react'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
// import { getToken } from './Services/LocalStorageServices'
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import { getToken } from '../../Services/LocalStorageServices';
import blogPostImg from '../../Assets/Images/blog.jpg'
import profileImg from '../../Assets/Images/user2.jpg'

export default function MuiCardView(props) {
  const {image, profileImage, title, categoryAndDate, description, id, MuiChip, handleEdit, handleDelete, handleFavorite, handleShare} = props
  const token = getToken('token')

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  return (
    <Card sx={{ minHeight: '465px' }}>

        <CardMedia
          component="img"
          height="250"
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

          titleTypographyProps={{ variant: "h6", fontFamily: "sans-serif Roboto Helvetica Arial" }}
          title={title}
          subheader={categoryAndDate}
        />

        <CardContent>

          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              // display: '-webkit-box',
              // overflow: 'hidden',
              // WebkitLineClamp: 4,
              // WebkitBoxOrient: 'vertical'
            }}
           dangerouslySetInnerHTML={{ __html: description }} 
          >
          </Typography>

        {MuiChip}
        </CardContent>

        <CardActions disableSpacing>
        {token ? <>
          <IconButton aria-label="edit">
            <Edit onClick={handleEdit} />
          </IconButton>
          <IconButton aria-label="delete">
            <Delete onClick={handleDelete} />
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
