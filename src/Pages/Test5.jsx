import { Box, Card, CardContent, Grid, Skeleton, Stack, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MiniDrawer from '../Components/Drawer/Drawer'
// import PageHeader from '../../Components/PageHeader/PageHeader'
import { Book } from '@mui/icons-material'
import * as blogServices from '../Services/blogServices'
import { styled, useTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PageHeader from '../Components/PageHeader/PageHeader'
import MuiCard from '../Components/MuiCard/MuiCard'
import Notification from '../Components/Notification/Notification'
import ConfirmDialog from '../Components/ConfirmDialog/ConfirmDialog'
import RightSidebar from '../Components/RightSidebar/RightSidebar'
import MuiCardSkeleton from '../Components/MuiCardSkeleton/MuiCardSkeleton'

export default function Test5() {

  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const theme = useTheme();

  // console.log(blogs)
  // console.log(blogs.length)
  const getBlog = async () => {
    let response = await blogServices.getAllBlogs();
    setBlogs(response.data);
    setLoading(true);
    // console.log(response)
  }

  // console.log(blogs)
  // console.log(blogs.length)

  // async function logJSONData() {
  //   const response = await fetch("https://fxcryptospot.cyclic.app/api/fxcryptospot/blogs");
  //   const jsonData = await response;
  //   console.log("response DATA=> ", jsonData);
  //   console.log("response DATA text=> ", jsonData.text());
  //   const jsonDataa = await response.json();
  //   console.log("JSONDATA=> ", jsonDataa);
  // }
  useEffect(() => {
    getBlog();
    // logJSONData()
  }, [])

  const handleFavorite = () => {
    alert('favorite added succesfully')
    console.log('favorite added succesfully')
  }
  const handleShare = () => {
    alert('share succesfully')
  }
  const clickHandler = (id) => {
    // console.log("event=>", event, "message=>", id)
    blogServices.deleteBlog(id)
      .then((response => {
        // console.log(response)
        const msg = response.data
        // console.log("Redirecting to blog portal..!")
        // setTimeout(() => { navigate('/blogs') }, 2000);
        setConfirmDialog({
          ...setConfirmDialog,
          isOpen: false
        })
        setNotify({
          isOpen: true,
          message: msg,
          type: 'success'
        })
        getBlog();
      }))
      .catch((response) => {
        // console.log(error);
        // console.log(response.data.message)
      })

  }

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default, minHeight: 100 + 'vh' }}>
        <Toolbar />
        <PageHeader
          icon={<Book />}
          title="Blog Posts"
          subTitle="Read Amazing Blogs"
        />
        <Grid container spacing={2}>
          {/* <Stack direction="row"> */}
          <Grid item xs={9}>
            <Grid container spacing={2}>
              {loading ?

                blogs.map((item, index) => {
                  return (
                    <Grid item xs={6} md={4} sx={{ p: 1 }}>

                      <MuiCard
                        image={item.image}
                        profileImage='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
                        title={item.title}
                        // date={item.publishDate.substring(0,10)}
                        categoryAndDate={item.createdAt.substring(0, 10) + " " + item.category}
                        description={item.content}
                        id={item._id}
                        // handleEdit={handleEdit}
                        clickHandler={() => {
                          // handleDelete(item._id)
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => { clickHandler(item._id) }
                          })
                        }}
                        // clickHandler={clickHandler}
                        handleFavorite={handleFavorite}
                        handleShare={handleShare}
                      />
                    </Grid>
                  )
                })
                :
                <>
                <Grid item xs={6} md={4} sx={{ p: 1 }}>
                  <MuiCardSkeleton />
                </Grid>
                <Grid item xs={6} md={4} sx={{ p: 1 }}>
                  <MuiCardSkeleton />
                </Grid>
                <Grid item xs={6} md={4} sx={{ p: 1 }}>
                  <MuiCardSkeleton />
                </Grid>
                </>
                }
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <RightSidebar />
          </Grid>

          {/* </Stack> */}

        </Grid>
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Box>
    </>
  )
}