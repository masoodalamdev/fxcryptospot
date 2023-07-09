import { Avatar, Box, Card, CardHeader, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'

export default function BlogHeader(props) {
    const theme = useTheme()
    const { icon, authorProfile, title, subTitle } = props;

    return (
            <Card elevation={0} sx={{ bgcolor: theme.palette.background.paper, borderRadius: '1rem', my: 2 }}>
                <CardHeader
                    avatar={
                        <a href={`/author/${authorProfile}`}>
                        <Avatar 
                        aria-label="Author Profile"
                        src={icon}
                        alt="Forex Crypto Spot Author"
                        >
                        </Avatar>
                        </a>
                    }

                    title={title}
                    titleTypographyProps={{ component:"h1", variant: "h5", fontFamily: "Montserrat", fontWeight: 'bold', lineHeight: 1.35, }}
                    subheaderTypographyProps={{ component:"h2", variant: "subtitle1", fontFamily: "Montserrat", fontWeight: 'bold', lineHeight: 1.35, }}
                    subheader={subTitle}
                />
               
            </Card >
    )
}
