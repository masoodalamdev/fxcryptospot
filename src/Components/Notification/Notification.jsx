import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export default function Notification(props) {
    const {notify, setNotify} = props
    const handleClose = (event, reason) =>{
      if (reason === 'clickaway'){
        return
      }
      setNotify({
        ...notify,
        isOpen: false
      })
    }
  return (
    <Snackbar
    open = {notify.isOpen}
    autoHideDuration={3000}
    anchorOrigin={{vertical: 'top', horizontal : 'right'}}
    onClose={handleClose}
    sx={{marginTop: '62px'}}
    >
        <Alert severity={notify.type}
         onClose={handleClose}>
            {notify.message}
        </Alert>
    </Snackbar>
  )
}
