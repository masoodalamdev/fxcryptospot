import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar/Sidebar'
import MuiFooter from '../Components/Footer/MuiFooter'

export default function BlogLayout(props) {
  const {setSearchBar} = props
  return (
    <>
    <Sidebar setSearchBar = {setSearchBar}/>
    <Outlet/>
    <MuiFooter />

    </>
  )
}
