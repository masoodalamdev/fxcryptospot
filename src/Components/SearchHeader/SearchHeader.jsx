import { Avatar, Card, CardHeader, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'

export default function SearchHeader(props) {
    const theme = useTheme()
    const {icon, title, subTitle, sx} = props;

    const styledHeader = {
        // root:{backgroundColor: theme.palette.background.default, pt:2, pb: 2},
        pageHeader: { display: 'flex', marginBottom: '6px'},
        pageIcon: {display: 'inline-block', padding: '6px',  backgroundColor: theme.palette.background.default, },
        pageTitle: {paddingLeft: '6px'},
        pageSubTitle: {opacity: 1}
    }
   
  return (
    <>
 
 <Card elevation={0} sx={{ bgcolor: theme.palette.background.paper, borderRadius: '1rem', my: 2 }}>
                <CardHeader
                    avatar={
                        <Avatar 
                        aria-label="Search"
                        src={icon}
                        alt="Forex Crypto Spot"
                        >
                        </Avatar>
                    }

                    title={title}
                    titleTypographyProps={{ component:"h1", variant: "h5", fontFamily: "Montserrat", fontWeight: 'bold', lineHeight: 1.35, }}
                    subheaderTypographyProps={{ component:"h2", variant: "subtitle1", fontFamily: "Montserrat", fontWeight: 'bold', lineHeight: 1.35, }}
                    subheader={subTitle}
                />
               
            </Card >
    {/* <Paper elevation={0} square sx={{ bgcolor: theme.palette.background.default, py:4}} id="back-to-top-anchor">
        <div style={styledHeader.pageHeader} >
            <Card elevation={0} sx={styledHeader.pageIcon}>
            <Avatar
            aria-label="Search Icon"
            src={icon}
            alt="Forex Crypto Spot"
          >
          </Avatar>
                
            </Card>
            <div style={styledHeader.pageTitle}>
                <Typography
                variant='h5'
                component='h1'
                fontFamily= "Montserrat" fontWeight= 'bold' lineHeight= '1.35' color= 'rgba(0, 0, 0, 0.87)'
                >
                    {title}
                </Typography>
                <Typography
                variant='subtitle2'
                component='h2'
                sx={styledHeader.pageSubTitle}
                >
                    {subTitle}
                </Typography>
            </div>
        </div>
    </Paper> */}
            
</>
  )
}
