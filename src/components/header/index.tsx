import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/user/userContext';

const Header = () => {
  const { user } = useUser();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#FF5722',
        width: '100%',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 'bold', color: '#FFFFFF' }}
          >
            Jammer
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            <Button
              component={Link}
              to="/"
              sx={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                textTransform: 'none',
                mx: 2,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/about"
              sx={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                textTransform: 'none',
                mx: 2,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
              }}
            >
              About Us
            </Button>
          </Box>

          <Button
            component={Link}
            to={user ? '/profile' : '/login'}
            variant="outlined"
            sx={{
              color: '#FFFFFF',
              borderColor: '#FFFFFF',
              fontWeight: 'bold',
              textTransform: 'none',
              backgroundColor: 'rgb(209, 33, 33)',
              '&:hover': {
                backgroundColor: 'rgba(138, 209, 201, 0.7)',
                borderColor: '#FFFFFF',
              },
            }}
          >
            {user ? 'Profile' : 'Sign In'}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
