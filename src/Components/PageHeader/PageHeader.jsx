import { Card, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import { styled } from "@mui/material/styles";

export default function PageHeader(props) {
    const theme = useTheme()
    const {icon, title, subTitle} = props;

    const styledHeader = {
        root:{backgroundColor: theme.palette.background.default},
        pageHeader: { display: 'flex', marginBottom: '6px'},
        pageIcon: {display: 'inline-block', padding: '6px',  backgroundColor: theme.palette.background.default, },
        pageTitle: {paddingLeft: '6px'},
        pageSubTitle: {opacity: 1}
    }
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));
  return (
    <>
    {/* <DrawerHeader /> */}
    <Paper elevation={0} square sx={styledHeader.root}>
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