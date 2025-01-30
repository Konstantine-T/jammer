import { Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Intro: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        {t('aboutJam')}
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />
      <Typography variant="body1" gutterBottom>
        {t('aboutIntro')}
      </Typography>
    </>
  );
};

export default Intro;
