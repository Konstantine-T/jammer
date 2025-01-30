import React from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Link,
  Paper,
} from '@mui/material';
import { login } from '../../supabase/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user/userContext';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const userData = await login(data);

      setUser(userData);

      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('An unknown error occurred:', err);
      }
      console.error(err);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {t('ready')}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('email')}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('password')}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              backgroundColor: 'rgb(209, 33, 33)',
            }}
          >
            {t('signIn')}
          </Button>
        </form>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {t('new')}{' '}
          <Link href="/register" variant="body2">
            {t('createAcc')}
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
