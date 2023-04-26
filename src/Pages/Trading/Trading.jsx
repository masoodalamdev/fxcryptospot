import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Book } from '@mui/icons-material'
import * as tradingServices from '../../Services/tradingServices'
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PageHeader from '../../Components/PageHeader/PageHeader'


export default function Trading() {

    const [trading, setTrading] = useState([])

    const getTradingList = async () => {
        let response = await tradingServices.getAllTradings();
        setTrading(response.data);
        console.log(response.data)
        console.log(trading)
    }

    useEffect(() => {
      getTradingList();
    }, []);

    const updateTrading = async (trading, id) => {
        let response = await tradingServices.editTrading(trading, id);
        if (response.status === 200) {
            console.log("Records Updated Succesfully")
        }
    }

   
      
    return (

        // <Box sx={{ display: 'flex', backgroundColor: '#cfd8dc', minHeight: 100 + 'vh' }}>



<Box component="main" sx={{  flexGrow: 1, p: 3 , bgcolor: '#cfd8dc'}}>

                <PageHeader
                    icon={<Book />}
                    title="Trading Posts"
                    subTitle="Read Amazing Trading"
                />
                <Grid container spacing={2}>
                    
                            {trading.map((item, index)=> {
                                const desc = item.description
                               return(
                            <Grid item xs={3}>
                                      <Card sx={{minHeight: '465px'}}>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={item.img}
                                    alt="blog image"
                                />
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            sx={{ bgcolor: red[500] }}
                                            aria-label="recipe"
                                            src="https://thumbs.dreamstime.com/z/blogging-concept-white-background-d-rendering-image-38891869.jpg"
                                        ></Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={item.title}
                                    subheader={item.publishDate.substring(0,10)}
                                />

                                <CardContent>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        style={{
                                            // overflow: "hidden",
                                            // maxWidth: "100ch",
                                            // textOverflow: "ellipsis",
                                            // whiteSpace: "nowrap"
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitLineClamp: 4,
                                            WebkitBoxOrient: 'vertical'
                                        }}
                                       dangerouslySetInnerHTML={{ __html: desc }} 
                                    >
                                       
                                      
                                       
                                    </Typography>
                                        
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>

                                </CardActions>

                            </Card>
                            </Grid>
                                 )
})}
                          
                      


                </Grid>
            </Box>
        // </Box>
    )
}
