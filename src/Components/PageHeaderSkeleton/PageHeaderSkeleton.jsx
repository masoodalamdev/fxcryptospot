import { Card, CardHeader, Skeleton, useTheme } from '@mui/material'
import React from 'react'

export default function PageHeaderSkeleton() {
    const theme = useTheme()
  return (

    <Card elevation={0} sx={{ bgcolor: theme.palette.background.paper, borderRadius: '1rem', my: 2 }}>
    <CardHeader
        avatar={
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
        }
        title={<Skeleton
            animation="wave"
            height={30}
            width="80%"
            style={{ marginBottom: 6 }}
          />}
          subheader={<Skeleton animation="wave" height={20} width="40%" />}
    />
   
</Card >
   
  )
}
