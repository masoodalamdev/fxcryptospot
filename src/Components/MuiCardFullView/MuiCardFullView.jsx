import React from 'react'
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
// import { getToken } from './Services/LocalStorageServices'
import { Link } from 'react-router-dom'
import blogPostImg from '../../Assets/Images/blog.jpg'
import profileImg from '../../Assets/Images/user2.jpg'
export default function MuiCardFullView(props) {
  const { image, profileImage, title, categoryAndDate, description,} = props
  
  return (
    <Card sx={{ minHeight: '465px', borderRadius: '1rem' }}>

      <CardMedia
        component="img"
        // height="500"
        image={image}
        alt="blog image"
      />
      <CardHeader
        avatar={
          <Avatar
            aria-label="profile IMG"
            src={profileImage}
          >
          </Avatar>
        }
        titleTypographyProps={{ variant: "h5", fontFamily: "Montserrat", fontWeight: 'bold', lineHeight: 1.35, }}
        // titleTypographyProps={{ variant: "h6", fontFamily: "sans-serif Roboto Helvetica Arial" }}
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


      </CardContent>

     

    </Card>
  )
}
