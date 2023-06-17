import React from 'react'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
// import { getToken } from './Services/LocalStorageServices'
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import { getToken } from '../../Services/LocalStorageServices';
import blogPostImg from '../../Assets/Images/blog.jpg'
import profileImg from '../../Assets/Images/user2.jpg'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappIcon, WhatsappShareButton
} from "react-share";
import { FcTreeStructure } from 'react-icons/fc';
export default function MuiCardView(props) {
  const { image, profileImage, title, categoryAndDate, description, id, MuiChip, handleEdit, handleDelete, handleFavorite, handleShare } = props
  const token = getToken('token')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const shareUrl = window.location.href;

  function handleShareClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleShareClose() {
    setAnchorEl(null);
  }
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
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
          <IconButton aria-label="edit" onClick={handleEdit} >
            <Edit />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </>
          : ''
        }
        {/* <IconButton aria-label="add to favorites" onClick={handleFavorite} >
          <FavoriteIcon />
        </IconButton> */}
        <IconButton aria-label="share" onMouseOver={handleShareClick}
          onClick={handleShareClick}>
          <FcTreeStructure size={24} />
          {/* <ShareIcon onClick={handleShare} size={24}/> */}
        </IconButton>
        <Menu
          // id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleShareClose}
          MenuListProps={{ onMouseLeave: handleShareClose }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Stack direction='row'>
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
          </Stack>
        </Menu>
      </CardActions>

    </Card>
  )
}
