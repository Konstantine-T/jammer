import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import MultipleSelectChip from './components/MultiSelect';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useUser } from '../../context/user/userContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addPost } from '../../supabase/posts';
import { useTranslation } from 'react-i18next';

const postSchema = z.object({
  title: z
    .string()
    .nonempty({ message: 'Title is required' })
    .max(100, { message: 'Title must not exceed 100 characters' }),
  description: z
    .string()
    .nonempty({ message: 'Description is required' })
    .max(600, { message: 'Description must not exceed 600 characters' }),
  instruments: z.array(z.string()),
  genres: z.array(z.string()),
  date: z
    .date({ required_error: 'Date is required' })
    .refine((value) => value >= new Date(), {
      message: 'Date must be today or later',
    }),
});

type FormData = {
  title: string;
  description: string;
  date: Date;
  instruments: string[];
  genres: string[];
};

const WritePost: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const instruments = [
    t('aGuitar'),
    t('eGuitar'),
    t('bGuitar'),
    t('piano'),
    t('sax'),
    t('trumpet'),
    t('harp'),
    t('drums'),
    t('flute'),
    t('violin'),
    t('singer'),
  ];

  const genres = [
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

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      description: '',
      instruments: [],
      genres: [],
      date: new Date(),
    },
  });

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      reset();
      navigate('/');
    },
    onError: (error: Error) => {
      console.error('Error adding post:', error.message);
    },
  });

  const onSubmit = (data: FormData) => {
    const postData = {
      title: data.title,
      description: data.description,
      instruments: data.instruments,
      genres: data.genres,
      date: dayjs(data.date).format('YYYY-MM-DD'),
      userName: user?.username || '',
      user_email: user?.email || '',
      comments: [],
    };

    mutation.mutate(postData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          maxWidth: 600,
          margin: '2rem auto',
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {t('createPost')}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardContent>
              <Box mb={2}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t('postTitle')}
                      fullWidth
                      variant="outlined"
                      placeholder="Enter the title"
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />
              </Box>
              <Box mb={2}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t('postDesc')}
                      fullWidth
                      multiline
                      minRows={4}
                      variant="outlined"
                      placeholder="Enter the description"
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Box>
              <Box mb={2}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label={t('date')}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(newValue) =>
                        field.onChange(newValue?.toDate() || null)
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.date,
                          helperText: errors.date?.message,
                        },
                      }}
                    />
                  )}
                />
              </Box>
              <Controller
                name="instruments"
                control={control}
                render={({ field }) => (
                  <MultipleSelectChip
                    {...field}
                    value={field.value || []}
                    onChange={field.onChange}
                    itemsList={instruments}
                    label={t('instruments')}
                  />
                )}
              />
              <Controller
                name="genres"
                control={control}
                render={({ field }) => (
                  <MultipleSelectChip
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    itemsList={genres}
                    label={t('genres')}
                  />
                )}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, backgroundColor: 'rgb(209, 33, 33)' }}
              >
                {t('submitPost')}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default WritePost;
