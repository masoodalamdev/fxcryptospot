import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import Button from "../../Components/Button/Button";
import ActionButton from '../ActionButton/ActionButton';


export default function Popup(props) {
    const {title, children, openPopup, setOpenPopup} = props
    const dialogWrapper = {
        padding: '16px',
        position: 'absolute',
        top: '40px',
        border: '2px solid red'
    }
  return (
    <Dialog open={openPopup} maxWidth="md" className={{paper: dialogWrapper}}>
        <DialogTitle>
          <div style={{display: 'flex'}}>
            <Typography variant="h6" component="div" style={{flexGrow: '1'}}>
              {title}
            </Typography>
            {/* <Button
            text='X'
            customSX={{backgroundColor: 'red', color: '#fff', fontWeight: 'bold',  border: '1px solid red',  "&:hover": {backgroundColor: '#fff', color: 'red', fontWeight: 'bold', border: '1px solid red'}}}
            onClick
            /> */}
            <ActionButton
            onClick={()=>{setOpenPopup(false)}}>
                   
                        <Close fontSize='small' sx={{color: 'red'}}/>
                    </ActionButton>
            </div>
        </DialogTitle>
        <DialogContent dividers>
        {children}

        </DialogContent>
    </Dialog>
  )
}
