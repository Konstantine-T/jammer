import { useUser } from '../../context/user/userContext';

const HomePage = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>Welcome, {user?.email || 'Guest'}!</h1>
    </div>
  );
};

export default HomePage;
