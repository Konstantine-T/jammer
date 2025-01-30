import { useQuery } from '@tanstack/react-query';
import PostCard from './components/PostCard';
import { fetchPosts } from '../../supabase/posts';
import CircularIndeterminate from '../../components/loading/loading';
import { Box, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
interface PostData {
  post_title: string | null;
  post_description: string | null;
  date: string;
  instruments: string[] | null;
  genres: string[] | null;
  userName: string | null;
  user_email: string | null;
  id: number;
}

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const { t } = useTranslation();
  const { data, isPending } = useQuery({
    queryKey: ['posts', searchQuery, selectedGenre],
    queryFn: () => fetchPosts(searchQuery, selectedGenre),
  });

  const allGenres = [
    t('rock'),
    t('hiphop'),
    t('blues'),
    t('jazz'),
    t('grunge'),
    t('punk'),
    t('funk'),
    t('pop'),
    t('metal'),
    t('fusion'),
  ];

  const filteredPosts = data?.filter((post) => {
    const matchesDate = searchQuery ? post.date === searchQuery : true;
    const matchesGenre = selectedGenre
      ? post.genres?.includes(selectedGenre)
      : true;
    return matchesDate && matchesGenre;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', my: 2 }}>
        <TextField
          type="date"
          label={t('searchByDate')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
        />
        <TextField
          select
          label={t('filterGenre')}
          variant="outlined"
          size="small"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          sx={{ width: '180px' }}
        >
          {allGenres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {isPending ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularIndeterminate />
        </Box>
      ) : (
        filteredPosts?.map((postData: PostData) => {
          return (
            <PostCard
              key={postData.id}
              post_title={postData.post_title}
              post_description={postData.post_description}
              date={postData.date}
              instruments={postData.instruments}
              genres={postData.genres}
              userName={postData.userName}
              user_email={postData.user_email}
              id={postData.id}
            />
          );
        })
      )}
    </Box>
  );
};

export default HomePage;
