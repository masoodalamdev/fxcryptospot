import { Box, Divider, InputBase, Typography, useTheme,  } from '@mui/material'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import MuiMiniCard from '../MuiMiniCard/MuiMiniCard'
import * as blogServices from '../../Services/blogServices'
import SearchIcon from '@mui/icons-material/Search';
import CategoryCounter from '../CategoryCounter/CategoryCounter'
import Tags from '../Tags/Tags'
import { ColorModeContext } from '../../Store'




export default function RightSidebar() {
  const [blogs, setBlogs] = useState([])
  const slicedBlogs = blogs.slice(0,3)
  // console.log(blogs.slice(0,3))
  // const { mode, toggleMode } = useContext(ColorModeContext)
  // const theme = createTheme({
  //   palette: {
  //     mode: mode
  //   }
  // });
  const theme = useTheme()
  const getBlogList = async () => {
    let response = await blogServices.getAllBlogs();
    setBlogs(response.data);
    // console.log(response.data)
    // console.log(blogs)
  }

  useEffect(() => {
    getBlogList();
  }, []);

  const styledHeader = {
    searchInput: {
        // opacity: '0.6',
        padding: '8px',
        fontSize: '1rem',
        height: '50px',
        backgroundColor: theme.palette.background.paper,
        // '&:hover': {
        //     backgroundColor: '#e3e3e3'
        // },
        // '& .MuiSvgIcon-root': {
        //     marginRight: '8px'
        // }
    }
  
  }
  return (
    <>
     {/* <ThemeProvider theme={theme}> */}
    {/* <CssBaseline /> */}
      <Box sx={{ minHeight: 100 + 'vh', borderRadius: '4px', bgcolor: theme.palette.background.default , p:1}}>
        <InputBase
        fullWidth
          sx={styledHeader.searchInput}
          placeholder='Search here'
          endAdornment={<SearchIcon fontSize="small" />}
        />
        <Typography variant="h6" textAlign='center' color='text.primary'>
          Category
        </Typography>
        <Divider/>
        <CategoryCounter/>
        <Typography variant="h6" textAlign='center' color='text.primary'>
          Popular Posts
        </Typography>
        <Divider/>
        <br/>
        {slicedBlogs.map((item, index) => {
          return (
            <MuiMiniCard
              title={item.title}
              // category={item.category }
              image={item.image}
              content={item.content}
            />
          )
        })}
    <Typography variant="h6" textAlign='center' color='text.primary'>
          Tags
        </Typography>
        <Divider/>
        <br/>
        <Tags/>
      </Box>
      {/* </ThemeProvider> */}
    </>
  )
}
