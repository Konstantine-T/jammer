import { supabase } from '..';

type comment = {
  userName: string;
  user_email: string;
  comment: string;
};

export const addPost = async (postData: {
  title: string;
  description: string;
  instruments: string[];
  genres: string[];
  date: string;
  userName: string;
  user_email: string;
  comments: comment[];
}) => {
  const dataForDB = {
    date: postData.date,
    post_title: postData.title,
    post_description: postData.description,
    instruments: postData.instruments,
    genres: postData.genres,
    userName: postData.userName,
    user_email: postData.user_email,
    comments: [],
  };
  const { data, error } = await supabase.from('posts').insert(dataForDB);
  if (error) throw new Error(error.message);
  return data;
};

export const fetchPosts = async (date?: string, genre?: string) => {
  let query = supabase.from('posts').select('*');

  if (date) {
    query = query.eq('date', String(date));
  }

  if (genre) {
    query = query.contains('genres', [genre]);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
};

export const fetchPostById = async (id: number) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

export const addCommentToPost = async (
  postId: number,
  newComment: {
    userName: string;
    user_email: string;
    comment: string;
  },
) => {
  try {
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('comments')
      .eq('id', postId)
      .single();

    if (fetchError) {
      throw new Error(`Failed to fetch post comments: ${fetchError.message}`);
    }

    const currentComments = Array.isArray(post?.comments)
      ? (post.comments as unknown[]).filter(
          (
            item,
          ): item is {
            userName: string;
            user_email: string;
            comment: string;
          } =>
            typeof item === 'object' &&
            item !== null &&
            'userName' in item &&
            'user_email' in item &&
            'comment' in item,
        )
      : [];

    const updatedComments = [...currentComments, newComment];

    const { error: updateError } = await supabase
      .from('posts')
      .update({ comments: updatedComments })
      .eq('id', postId);

    if (updateError) {
      throw new Error(`Failed to update post comments: ${updateError.message}`);
    }

    return updatedComments;
  } catch (err) {
    console.error('Error adding comment:', err);
    throw err;
  }
};

export const fetchPostsByUserEmail = async (userEmail: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_email', userEmail);

  if (error) throw new Error(error.message);
  return data;
};
