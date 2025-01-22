import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { useUser } from '../../context/user/userContext';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

interface ProfileFormValues {
  userName: string;
  phone: string;
}

const ProfilePage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<ProfileFormValues>({
    defaultValues: {
      userName: '',
      phone: '',
    },
  });

  if (!user) {
    navigate('/login');
  }

  const onSubmit = (data: ProfileFormValues) => {
    console.log(data);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
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
              <Avatar
                sx={{
                  height: 80,
                  width: 80,
                  mx: 'auto',
                  mb: 2,
                }}
              />
              <Typography variant="h6">
                {user?.username || 'Username'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {user?.email || 'user@example.com'}
              </Typography>
              <Button variant="text" sx={{ mt: 2 }}>
                Change Avatar
              </Button>
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
                    defaultValue={user?.username || ''}
                    {...field}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Phone Number"
                    type="tel"
                    fullWidth
                    defaultValue={user?.id || ''}
                    {...field}
                  />
                )}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                alignSelf: 'flex-end',
                backgroundColor: 'rgb(209, 33, 33)',
              }}
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProfilePage;
