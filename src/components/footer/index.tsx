import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

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
          {t('footer')}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
