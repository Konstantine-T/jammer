import { Container, Paper } from '@mui/material';

import Intro from './components/Intro';
import Features from './components/Features';
import CardFooter from './components/CardFooter';

const AboutUs: React.FC = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Intro />
        <Features />
        <CardFooter />
      </Paper>
    </Container>
  );
};

export default AboutUs;
