import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.12)',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        marginTop: '3rem',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" color="text.secondary">
          © 2023 Jammer. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
