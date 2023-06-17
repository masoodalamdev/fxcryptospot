import React from 'react'
import { Card, CardContent, CardHeader, CardMedia, Grid, Stack, Typography, useTheme } from '@mui/material'

export default function MuiMiniCard(props) {
    const theme = useTheme()
    const {title, category, image, content, slug} = props
    return (
    <a href={`/blog/${slug}`} style={{textDecoration: 'none'}} >
        <Card sx={{mb:4, bgcolor: theme.palette.background.light , borderRadius: '1rem' ,  ':hover': {
            boxShadow: 20, // theme.shadows[20]
          }}} >
            <CardHeader
                titleTypographyProps={{ variant: "h6", fontSize: 16, fontFamily: "Montserrat", fontWeight: 'bold' }}
                title={title}
                // subheader={category}
                sx={{color: "text.primary" }}
            />
            <CardContent sx={{ pt: 0 }}>
                <Stack direction="row">
                    <CardMedia sx={{ width: '40%' }}
                        component="img"
                        height="100"
                        image={image}
                        alt="Blog Image"
                    />
                    <Typography variant="body2" color="text.primary" sx={{height: '100px', m:0, ml: 1}}
                    style={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                      }}
                     dangerouslySetInnerHTML={{ __html: content }} >
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
        </a>
    )
}
