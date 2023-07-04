import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

export default function MuiSelect(props) {
    const { label, name, value, defaultValue, handleChange, MenuItemList, error, helperText } = props


 

    return (
        <FormControl fullWidth error={error}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name={name}
                value={value}
                defaultValue={defaultValue}
                label={label}
                onChange={handleChange}
                // error={error}
            >
           
                {MenuItemList}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
        
    )
}
