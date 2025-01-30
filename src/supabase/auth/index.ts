import { supabase } from '..';

export const register = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    const { user } = authData;

    if (user) {
      const { error: dbError } = await supabase.from('users').insert({
        user_uuid: user.id,
        email,
        username,
        created_at: new Date().toISOString(),
        password,
      });

      if (dbError) throw dbError;
    }

    return { success: true, message: 'User registered successfully!' };
  } catch (error) {
    console.error('Error during user registration:', error);
    return { success: false };
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { user } = data;

  if (user) {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('user_uuid', user.id)
      .single();

    if (userError) {
      throw new Error(userError.message);
    }

    return {
      email: userData.email,
      username: userData.username,
      id: userData.user_uuid,
      created_at: userData.created_at,
    };
  }

  throw new Error('User not found');
};

export const updateUsername = async (userId: string, newUsername: string) => {
  try {
    const { error } = await supabase
      .from('users')
      .update({ username: newUsername })
      .eq('user_uuid', userId);

    if (error) throw error;

    return { success: true, message: 'Username updated successfully!' };
  } catch (error) {
    console.error('Error updating username:', error);
    return { success: false, message: 'Failed to update username.' };
  }
};
