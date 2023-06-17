import React from 'react'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, Grow, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material'
// import { getToken } from './Services/LocalStorageServices'
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import { getToken } from '../../Services/LocalStorageServices';
import blogPostImg from '../../Assets/Images/blog.jpg'
import profileImg from '../../Assets/Images/user2.jpg'
import { FcTreeStructure, FcLikePlaceholder } from "react-icons/fc";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappIcon, WhatsappShareButton
} from "react-share";


export default function MuiCard(props) {
  const {image, profileImage, title, category, chipColor, createdAt, id, slug, handleEdit, handleDelete, clickHandler, authorID, shareUrl} = props
  const token = getToken('token')
  const theme = useTheme()
  const [checked, setChecked] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  

  function handleShareClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleShareClose() {
    setAnchorEl(null);
  }


  // const handleDel = ()=>{
  //   console.log('Del clicked succesfully')
  // }

  return (
    <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}
        >
    <Card sx={{ minHeight: '430px', maxHeight: '430px', bgcolor: theme.palette.background.paper, position: 'relative', borderRadius: '1rem'  ,  ':hover': {
              boxShadow: 20, // theme.shadows[20]
            }}}>
    <a href={`/blog/${slug}`} style={{textDecoration: 'none'}} >
    <Chip label={category} color={chipColor} sx={{ borderRadius: 0, position: 'absolute', top:'8px', left: '8px' }} />
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

          titleTypographyProps={{ variant: "h6", fontFamily: "Montserrat", fontWeight: 'bold', lineHeight: 1.35, fontSize:{sm: '1rem'}}}
          title={title}
          subheader={createdAt}
          sx={{color: "text.primary", minHeight: '130px', maxHeight: '130px' }}
          
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
          <IconButton aria-label="delete" onClick={clickHandler} >
            {/* <Delete onClick={() => clickHandler("Hello World!")}/> */}
            {/* <Delete onClick={(event) => clickHandler(event, id)}/> */}
            <Delete />
          </IconButton>
          </>
          : ''
        }
          {/* <IconButton aria-label="add to favorites" onClick={handleFavorite}> */}
            {/* <FavoriteIcon onClick={handleFavorite} /> */}
            {/* <FcLikePlaceholder  size={24}/> */}
            
          {/* </IconButton> */}
          <IconButton aria-label="share" onMouseOver={handleShareClick}
        onClick={handleShareClick}>
            <FcTreeStructure  size={24}/>
            {/* <ShareIcon onClick={handleShare} size={24}/> */}
          </IconButton>
          <Menu
        // id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleShareClose}
        MenuListProps={{ onMouseLeave: handleShareClose }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleShareClose}> <FacebookShareButton
         url={shareUrl}
         quote={'Forex Crypto Spot'}
         hashtag="#fxcryptospot"
        >
          <FacebookIcon size={24} round />
        </FacebookShareButton></MenuItem>
        <MenuItem onClick={handleShareClose}>     <TwitterShareButton
          url={shareUrl}
          quote={'Forex Crypto Spot'}
          hashtag="#fxcryptospot"
        >
          <TwitterIcon size={24} round />
        </TwitterShareButton></MenuItem>
        <MenuItem onClick={handleShareClose}>      <WhatsappShareButton
          url={shareUrl}
          quote={'Forex Crypto Spot'}
          hashtag="#fxcryptospot"
        >
          <WhatsappIcon size={24} round />
        </WhatsappShareButton></MenuItem>

      </Menu>
        </CardActions>

      </Card>
      </Grow>
    )
}
