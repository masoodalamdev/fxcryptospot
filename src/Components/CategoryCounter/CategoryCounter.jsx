import React, { useEffect, useState } from 'react'
import * as blogServices from '../../Services/blogServices'
import { Chip, List, ListItem, ListItemButton, ListItemText, Stack, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

export default function CategoryCounter() {
    const [blockchain, setBlockchain] = useState('')
    const [wallet, setWallet] = useState('')
    const [coin, setCoin] = useState('')
    const [trading, setTrading] = useState('')
    const theme = useTheme()
    const blockchainCounter = async () => {
        let response = await blogServices.getBlockchainBlogs();
        setBlockchain(response.data.length);
        // console.log(response.data)
        // console.log(blogs)
    }
    const walletCounter = async () => {
        let response = await blogServices.getWalletBlogs();
        setWallet(response.data.length);
        // console.log(response.data)
        // console.log(blogs)
    }
    const coinCounter = async () => {
        let response = await blogServices.getCoinBlogs();
        setCoin(response.data.length);
        // console.log(response.data)
        // console.log(blogs)
    }
    const TradingCounter = async () => {
        let response = await blogServices.getTradingBlogs();
        setTrading(response.data.length);
        // console.log(response.data)
        // console.log(blogs)
    }

    useEffect(() => {
        blockchainCounter()
        walletCounter()
        coinCounter()
        TradingCounter()
    }, []);

    return (
        <>
            <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/blogs/blockchain">
              <ListItemText primary="Blockhain" />
              <Chip label={`${blockchain}`} color='primary' sx={{ borderRadius: 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/blogs/wallet">
              <ListItemText primary="Wallet" />
              <Chip label={`${wallet}`} color="primary" sx={{ borderRadius: 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="blogs/coin">
              <ListItemText primary="Coin" />
              <Chip label={`${coin}`} color="primary" sx={{ borderRadius: 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="blogs/trading">
              <ListItemText primary="Trading" />
              <Chip label={`${trading}`} color="primary" sx={{ borderRadius: 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        </>

    )
}
