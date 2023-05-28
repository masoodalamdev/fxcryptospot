import { Button, ThemeProvider, createTheme } from '@mui/material'
import React, { useContext } from 'react'
import { ColorModeContext } from '../../Store'



export default function MuiButton(props) {
  const { mode, toggleMode } = useContext(ColorModeContext)
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const {text, variant, type, sx} = props
  return (
    <ThemeProvider theme={theme}>

    <Button
    variant={variant}
    type={type}
    fullWidth
    sx={{ textTransform: 'capitalize', fontWeight: 'bold', ... sx }}
    >
      {text}
    </Button>
    </ThemeProvider>
  )
}

