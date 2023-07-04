import { Button, ThemeProvider, createTheme, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { ColorModeContext } from '../../Store'



export default function MuiButton(props) {
 const theme = useTheme()
  const {text, variant, type, fullWidth, href,onMouseOver, onClick, color, sx} = props
  return (
    <Button
    variant={variant}
    type={type}
    fullWidth={fullWidth}
    href={href}
    onMouseOver={onMouseOver}
    onClick={onClick}
    color={color}
    sx={{ textTransform: 'capitalize', fontWeight: 'bold', ... sx }}
    >
      {text}
    </Button>
  )
}

