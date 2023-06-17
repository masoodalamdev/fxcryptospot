import { Button, ThemeProvider, createTheme, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { ColorModeContext } from '../../Store'



export default function MuiButton(props) {
 const theme = useTheme()
  const {text, variant, type, href,onMouseOver, onClick, sx} = props
  return (
    <Button
    variant={variant}
    type={type}
    fullWidth
    href={href}
    onMouseOver={onMouseOver}
    onClick={onClick}
    sx={{ textTransform: 'capitalize', fontWeight: 'bold', color: theme.palette.text.primary, ... sx }}
    >
      {text}
    </Button>
  )
}

