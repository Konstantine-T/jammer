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

const Features = () => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Features:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <MusicNoteIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Create an account and share your musical interests." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <GroupIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Fill out the instruments you play and your favorite genres." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PostAddIcon color="success" />
          </ListItemIcon>
          <ListItemText primary="Post when and where you want to jam and connect with other musicians." />
        </ListItem>
      </List>
    </Box>
  );
};

export default Features;
