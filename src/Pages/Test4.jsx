import React from 'react'
import MuiFooter from '../Components/Footer/MuiFooter'
import Sidebar from '../Components/Sidebar/Sidebar'
import { Box, Toolbar, useTheme } from '@mui/material'

export default function Test4() {
  const theme = useTheme()
  return (
   <div>
     <Sidebar/>
    <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, px: { xs: 3, sm: 10, md: 12, lg: 8, xl: 32 }, minHeight: 100 + 'vh' }} >
    <Toolbar/>
    <div>

    its box component========
    </div>
</Box>
    <MuiFooter/>
   </div>
  )
}
