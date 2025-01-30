import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const DefaultLayout: React.FC = () => {
  return (
    <Box sx={{ mt: 10 }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default DefaultLayout;
