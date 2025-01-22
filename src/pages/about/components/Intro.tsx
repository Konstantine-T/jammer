import { Divider, Typography } from '@mui/material';

const Intro = () => {
  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        About Jammer
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />
      <Typography variant="body1" gutterBottom>
        Welcome to our platform for musicians! Our mission is to bring musicians
        together and make it easier to connect, collaborate, and create
        beautiful music. Whether you're a beginner or a seasoned professional,
        this is the perfect place to find your next jam buddy.
      </Typography>
    </>
  );
};

export default Intro;
