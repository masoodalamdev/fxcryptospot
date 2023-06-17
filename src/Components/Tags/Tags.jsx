import { Box, Chip, useTheme } from '@mui/material'
import React from 'react'

export default function Tags() {
  const theme = useTheme()
  return (
  
                <Box sx={{p: 1, bgcolor: theme.palette.background.paper , borderRadius: '1rem'}}>
                <Chip label="Blockchain" sx={{m:1}} component="a" href="/blogs/blockchain" clickable />
                <Chip label="Coin" sx={{m:1}} component="a" href="/blogs/coin" clickable />
                <Chip label="Wallet" sx={{m:1}} component="a" href="/blogs/wallet" clickable />
                <Chip label="Crypto Currency" sx={{m:1}} component="a" href="/blogs/cryptocurrency" clickable />
                <Chip label="Mining" sx={{m:1}} component="a" href="/blogs/mining" clickable />
                <Chip label="Trading" sx={{m:1}} component="a" href="/blogs/trading" clickable />
                <Chip label="Bitcoin" sx={{m:1}} component="a" href="/blogs/bitcoin" clickable />
                </Box>
         
  )
}
