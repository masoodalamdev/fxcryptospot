import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



export default function MuiSelect(props) {
    const { label, name, value, defaultValue, handleChange, MenuItemList } = props


 

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name={name}
                value={value}
                defaultValue={defaultValue}
                label={label}
                onChange={handleChange}
            >
                {/* <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem> */}
           
                {MenuItemList}
            </Select>
        </FormControl>
        
    )
}
