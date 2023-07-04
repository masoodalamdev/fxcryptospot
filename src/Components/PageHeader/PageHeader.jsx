import { Card, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'

export default function PageHeader(props) {
    const theme = useTheme()
    const {icon, title, subTitle} = props;

    const styledHeader = {
        // root:{backgroundColor: theme.palette.background.default, pt:2, pb: 2},
        pageHeader: { display: 'flex', marginBottom: '6px'},
        pageIcon: {display: 'inline-block', padding: '6px',  backgroundColor: theme.palette.background.default, },
        pageTitle: {paddingLeft: '6px'},
        pageSubTitle: {opacity: 1}
    }
   
  return (
    <>
    {/* <DrawerHeader /> */}
    <Paper elevation={0} square sx={{ bgcolor: theme.palette.background.default, py:2}} id="back-to-top-anchor">
        <div style={styledHeader.pageHeader} >
            <Card elevation={0} sx={styledHeader.pageIcon}>
                {icon}
            </Card>
            <div style={styledHeader.pageTitle}>
                <Typography
                variant='h6'
                component='div'
                
                >
                    {title}
                </Typography>
                <Typography
                variant='subtitle2'
                component='div'
                sx={styledHeader.pageSubTitle}
                >
                    {subTitle}
                </Typography>
            </div>
        </div>
    </Paper>
            
</>
  )
}
