import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import GroupIcon from '@mui/icons-material/Group';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useTranslation } from 'react-i18next';

const Features: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {t('aboutFeatures')}
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <MusicNoteIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={t('aboutCreateAcc')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <GroupIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary={t('aboutFill')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PostAddIcon color="success" />
          </ListItemIcon>
          <ListItemText primary={t('aboutPost')} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Features;
