import { Box } from '@mui/material'
import React from 'react'
import PageHeader from '../../Components/PageHeader/PageHeader'
import { Info } from '@mui/icons-material'

export default function About() {
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#cfd8dc', minHeight: 100 + 'vh' }}>



    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <PageHeader
            icon={<Info />}
            title="About Posts"
            subTitle="Read Amazing Blogs"
        />
       Its About Page
    </Box>
</Box>
  )
}
