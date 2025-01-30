/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addCommentToPost, fetchPostById } from '../../supabase/posts';
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/user/userContext';

const PostDetails: React.FC = () => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState<string>('');

  const { data: post, isPending } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(Number(id)),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const commentData = {
        userName: user.username || user.email,
        user_email: user.email,
        comment: newComment,
      };
      return addCommentToPost(Number(id), commentData);
    },
    onSuccess: () => {
      setNewComment('');
      queryClient.invalidateQueries(['post', id] as any);
    },
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  if (isPending) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!post) return <Typography textAlign="center">Post not found</Typography>;

  return (
    <Box
      sx={{
        width: '60%',
        margin: 'auto',
        p: 4,
        height: '100vh',
        borderRadius: '12px',
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {post.post_title}
      </Typography>

      <Typography variant="subtitle1" color="info" gutterBottom>
        <span style={{ color: 'grey' }}>By: </span>
        {post.userName || post.user_email}
      </Typography>

      <Chip label={post.date} color="warning" size="medium" />

      <Typography variant="body1" mt={2}>
        {post.post_description}
      </Typography>

      <Box mt={2} display="flex" gap={1}>
        {post.instruments?.map((instrument) => (
          <Chip
            key={instrument}
            label={instrument}
            color="warning"
            size="small"
          />
        ))}
        {post.genres?.map((genre) => (
          <Chip key={genre} label={genre} color="default" size="small" />
        ))}
      </Box>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>
        <Divider />

        {Array.isArray(post.comments) && post.comments.length > 0 ? (
          post.comments.map((comment: any, index) => (
            <Box
              key={index}
              sx={{
                mt: 2,
                p: 2,
                borderRadius: '8px',
                boxShadow: 1,
              }}
            >
              <Typography variant="subtitle2" color="primary">
                {comment?.userName || comment?.user_email}
              </Typography>
              <Typography variant="body2" mt={1}>
                {comment?.comment}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography mt={2} color="grey">
            No comments yet.
          </Typography>
        )}
      </Box>

      <Box mt={4} display="flex" gap={2} alignItems="center">
        <TextField
          label="Add a comment..."
          variant="outlined"
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => mutation.mutate()}
          disabled={!newComment.trim()}
        >
          Comment
        </Button>
      </Box>
    </Box>
  );
};

export default PostDetails;
