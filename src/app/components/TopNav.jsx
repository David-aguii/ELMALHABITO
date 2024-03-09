'use client'
 import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import "./navfiltro.css"
 
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation';
 
 
 
 
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));



 

export default function TopNav() {
  const router = useRouter()
  return (
    <Container>
    <Box position="static" className='caja' sx={{flexGrow: 1 }}>
      <AppBar  color="primary" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
           
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={()=>{router.push("/")}}
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
          >
         EL MAL HABITO
          </Typography>
          <Typography variant="h6">
          <a href='./favorite'>Favorite</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
   
    </Container>
 
  );
}