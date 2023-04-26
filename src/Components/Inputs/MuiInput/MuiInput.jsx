import { TextField } from '@mui/material'
import React from 'react'

export default function MuiInput(props) {
    const { label, variant, type , name, value, onChange} = props
    return (
        <TextField id="outlined-basic"
         label={label} 
         variant="outlined" 
         type={type}
          fullWidth
           onChange={onChange} 
           name={name}
           value={value}
            />
    )
}
