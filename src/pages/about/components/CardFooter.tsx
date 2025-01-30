import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CardFooter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="body1">{t('aboutOutro')}</Typography>
    </Box>
  );
};

export default CardFooter;
