import { NotListedLocation } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React from 'react'
import { FcCancel } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
// import Button from "../../Components/Button/Button";
export default function NotAuthorized(props) {
    const {confirmDialog, setConfirmDialog } = props;
    const styledDialog = {
        dialogTitle: {
            textAlign: 'center',
            color: 'red',
            '&:hover': {
                cursor: 'default'
            },
        '& .MuiSvgIcon-root':{
            fontSize: '8rem',
            color: 'red',
            cursor: 'default'
        }
    },
    buttonNo:{
        color: '#fff',
        backgroundColor: 'gray',
        '&:hover': {
            color: '#fff',
        backgroundColor: 'gray',
        },
    },
    buttonYes:{
        color: '#fff',
        backgroundColor: 'red',
        '&:hover': {
            color: '#fff',
        backgroundColor: 'red',
        },
    }
}
  return (
    <Dialog open={confirmDialog.isOpen} fullScreen={confirmDialog.isFullWidth} sx={confirmDialog.sx}>
        <DialogTitle sx={styledDialog.dialogTitle} >
        <IconButton disableRipple >
        <FcCancel size={100} />
        </IconButton>
        </DialogTitle>
        <DialogContent>
        <Typography variant='h6'  sx={{textAlign: 'center'}}>
            {confirmDialog.title}
        </Typography>
        <Typography variant='subtitle2' sx={{textAlign: 'center'}}>
            {confirmDialog.subTitle}
        </Typography>
        </DialogContent>
        <DialogActions  sx={{justifyContent: 'center'}}>
        {/* <Button
        color= 'default'
        >
            No
        </Button> */}
        {/* <Button
        text='Yes'
        color= 'secondary'
        /> */}
        <Button sx={styledDialog.buttonNo} onClick={confirmDialog.notConfirm}>
            Back to Home
        </Button>
        <Button sx={styledDialog.buttonYes} onClick={confirmDialog.onConfirm} >
            Login
        </Button>
        </DialogActions>
    </Dialog>
  )
}
