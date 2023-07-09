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
import axios from 'axios';


export function TestButton() {
  const [searchedBlog, setSearchedBlog] = useState([{"title": "title 1"}, {"title": "title 2"}, {"title": "title 3"}])
  // {searchedBlog.map((item, index) => {
  //   return (
  //     <>
  //     <MuiMiniCard
  //     key={index}
  //       title={item.title}
  //       // category={item.category }
  //       // image={item.image}
  //       // content={item.content}
  //       slug={item.slug}
  //     />
     
  //     </>
  //   )
  // })}
  return (
    <div>test button</div>
  )
}


export default function RightSidebar() {
  const [blogs, setBlogs] = useState([])
  const slicedBlogs = blogs.slice(0,3)
  const [searchQuery, setSearchQuery] = useState({"searchQuery" : ""})
  const [searchedBlog, setSearchedBlog] = useState([])
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

  const handleSearchInput = (e)=> {
    e.preventDefault();
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value })
  }
  const handleSearch = async ()=> {
    // console.log(searchQuery)
    // await blogServices.getSearchBlogs(searchQuery)
    await axios.post("https://fxcryptospot.cyclic.app/api/fxcryptospot/blogs/search",  searchQuery)
    .then((response => {
      console.log(response.data)
      setSearchedBlog(response.data)
      console.log(searchedBlog)
  }))
    .catch((response) => {
      // console.log(error);
      console.log(response)
    })
  }
  return (
    <>
      <Box sx={{ minHeight: 100 + 'vh', bgcolor: theme.palette.background.default}}>
        {/* <InputBase
        fullWidth
          sx={{bgcolor: theme.palette.background.paper, mb: 4, height: '50px', p:2, borderRadius: '1rem' }}
          placeholder='Search here'
          name="searchQuery" value={searchQuery.searchQuery}
          endAdornment={<SearchIcon fontSize="small" onClick={handleSearch} sx={{cursor: 'pointer'}}/>}
          onChange={handleSearchInput}
        /> */}

        <Typography variant="h6" textAlign='center' color='text.primary' sx={{pb:1}} component="h3">
          Category
        </Typography>
        <Divider/>
        <CategoryCounter/>
        <Typography variant="h6" textAlign='center' color='text.primary'  sx={{mt: 2, pb:1}}component="h4">
          Popular Posts
        </Typography>
        <Divider/>
        <br/>
        {slicedBlogs.map((item, index) => {
          return (
            <MuiMiniCard
            key={index}
              title={item.title}
              // category={item.category }
              // image={item.image}
              // content={item.content}
              slug={item.slug}
            />
          )
        })}
    <Typography variant="h6" textAlign='center' color='text.primary' sx={{mb:1}} component="h5">
          Tags
        </Typography>
        <Divider/>
        <br/>
        <Tags/>
      </Box>
    </>
  )
}

