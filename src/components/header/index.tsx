import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  Switch,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/user/userContext';
import { useThemeContext } from '../../context/theme/themeContext';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuIcon from '@mui/icons-material/Menu';
import { useLanguage } from '../../context/language/languageContext';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Header: React.FC = () => {
  const { user } = useUser();
  const { toggleTheme, darkMode } = useThemeContext();
  const { toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  const navButtonNames: string[] = [t('home'), t('about'), t('write')];
  const navButtonPaths: string[] = ['/', '/about', '/write'];

  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <AppBar
      position="fixed"
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
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexGrow: 1,
              }}
            >
              {navButtonNames.map((buttonName, index) => {
                return (
                  <Button
                    component={Link}
                    key={index}
                    to={navButtonPaths[index]}
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      backgroundColor: 'rgba(206, 99, 99, 0.33)',
                      mx: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  >
                    {buttonName}
                  </Button>
                );
              })}
            </Box>
          )}
          {isMobile && (
            <IconButton
              sx={{ color: '#FFFFFF' }}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Switch checked={darkMode} onChange={toggleTheme} />
              <IconButton onClick={toggleLanguage} sx={{ color: '#FFFFFF' }}>
                <TranslateIcon />
              </IconButton>
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
                {user ? t('profile') : t('signIn')}
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>

      <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <List sx={{ width: 250 }}>
          {navButtonNames.map((buttonName, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={navButtonPaths[index]}
                onClick={() => setMenuOpen(false)}
              >
                <ListItemText primary={buttonName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleTheme}>
              <ListItemText primary={t('toggleTheme')} />
              <Switch checked={darkMode} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleLanguage}>
              <ListItemText primary={t('changeLanguage')} />
              <TranslateIcon />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={user ? '/profile' : '/login'}
              onClick={() => setMenuOpen(false)}
            >
              <ListItemText primary={user ? t('profile') : t('signIn')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
