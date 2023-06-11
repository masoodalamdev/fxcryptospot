import React from 'react'
import { Box, Grid, Toolbar, useTheme} from '@mui/material'
import PageHeader from '../../Components/PageHeader/PageHeader'
import { ErrorOutline } from '@mui/icons-material';
import { FcCancel } from 'react-icons/fc';

export default function NotFound() {
  const theme = useTheme();
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default, minHeight: 100 + 'vh' }}>
      <Toolbar/>
      <PageHeader
        icon={<FcCancel size={24} />}
        title="Not Found"
        subTitle="Back to Home"
      />
       <Grid container spacing={2}>
                {/* <Stack direction="row"> */}
              <Grid item xs={12}>
                </Grid>
                </Grid>
                </Box>
  )
}
