import { Toolbar } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'


export default function Home() {
  return (
    <>
    <Toolbar/>
    <div>this is home</div>
    <Outlet/>
    </>
 
  )
}
