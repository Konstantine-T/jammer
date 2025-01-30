import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post_title: string | null;
  post_description: string | null;
  date: string;
  instruments: string[] | null;
  genres: string[] | null;
  userName: string | null;
  user_email: string | null;
  id: number;
}

const PostCard: React.FC<PostCardProps> = ({
  post_title,
  post_description,
  date,
  instruments,
  genres,
  userName,
  user_email,
  id,
}) => {
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Link
      to={`/post/${id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card
        variant="outlined"
        sx={{
          width: isMobile ? '95%' : isTablet ? '80%' : '60%',
          margin: 'auto',
          p: isMobile ? 1 : 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: '12px',
          boxShadow: 2,
          marginTop: '30px',
        }}
      >
        <CardContent>
          <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
            {post_title}
          </Typography>

          <Typography variant="body2" color="info" gutterBottom>
            {userName ? userName : user_email}
          </Typography>

          <Typography variant="body2" color="warning" gutterBottom>
            {date}
          </Typography>

          <Typography variant={isMobile ? 'body2' : 'body1'} mb={2}>
            {post_description}
          </Typography>
        </CardContent>

        <Box
          display="flex"
          justifyContent="space-between"
          mt={2}
          flexWrap="wrap"
        >
          <Box display="flex" gap={1} flexWrap="wrap">
            {instruments?.map((instrument: string) => (
              <Chip
                key={instrument}
                label={instrument}
                color="warning"
                size={isMobile ? 'small' : 'medium'}
              />
            ))}
          </Box>
          <Box display="flex" gap={1} flexWrap="wrap">
            {genres?.map((genre: string) => (
              <Chip
                key={genre}
                label={genre}
                color="default"
                size={isMobile ? 'small' : 'medium'}
              />
            ))}
          </Box>
        </Box>
      </Card>
    </Link>
  );
};

export default PostCard;
