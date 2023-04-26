import { Button } from '@mui/material'
import React from 'react'

export default function MuiButton(props) {
  const {text, variant, type, sx} = props
  return (
    <Button
    variant={variant}
    type={type}
    fullWidth
    sx={{ textTransform: 'capitalize', fontWeight: 'bold', color: '#444',... sx }}
    >
      {text}
    </Button>
  )
}

