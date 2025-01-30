import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { useUser } from '../../context/user/userContext';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { updateUsername } from '../../supabase/auth';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { fetchPostsByUserEmail } from '../../supabase/posts';
import PostCard from '../homePage/components/PostCard';
import { zodResolver } from '@hookform/resolvers/zod';

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

const profileSchema = z.object({
  userName: z
    .string()
    .min(1, 'Username is required')
    .max(30, 'Username cannot exceed 30 characters'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userName: '',
    },
  });

  const { data: posts, isPending } = useQuery({
    queryKey: ['userPosts', user?.id],
    queryFn: () => fetchPostsByUserEmail(String(user?.email)),
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;

    const response = await updateUsername(String(user.id), data.userName);

    if (response.success) {
      alert('Username updated successfully!');
    } else {
      alert('Failed to update username.');
    }
  };

  return (
    <Box sx={{ p: 4, minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card
            sx={{
              width: '250px',
              textAlign: 'center',
            }}
          >
            <CardContent>
              <Typography variant="h6">
                {user?.username || 'Username'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {user?.email || 'user@example.com'}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Card sx={{ flex: 1 }}>
          <CardContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Box
              component={'form'}
              sx={{ display: 'flex', gap: 2 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Username"
                    type="text"
                    fullWidth
                    {...field}
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                  />
                )}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  alignSelf: 'flex-end',
                  backgroundColor: 'rgb(209, 33, 33)',
                }}
              >
                {t('changeUserName')}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          {t('myPosts')}
        </Typography>

        {isPending ? (
          <Typography>{t('loadingPosts')}</Typography>
        ) : (
          posts?.map((post: PostData) => (
            <PostCard
              key={post.id}
              post_title={post.post_title}
              post_description={post.post_description}
              date={post.date}
              instruments={post.instruments}
              genres={post.genres}
              userName={post.userName}
              user_email={post.user_email}
              id={post.id}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
