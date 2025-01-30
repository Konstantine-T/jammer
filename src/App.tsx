import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import DefaultLayout from './components/layout/DefaultLayout';
import HomePage from './pages/homePage';
import UserProfile from './pages/userProfile';
import AboutUs from './pages/about';
import WritePost from './pages/writePost';
import PostDetails from './pages/postDetails';
import { ThemeContextProvider } from './context/theme/themeContext';
import { LanguageProvider } from './context/language/languageContext';

function App() {
  return (
    <ThemeContextProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/login" element={<SignIn />}></Route>
              <Route path="/register" element={<SignUp />}></Route>
              <Route path="/profile" element={<UserProfile />}></Route>
              <Route path="/about" element={<AboutUs />}></Route>
              <Route path="/write" element={<WritePost />}></Route>
              <Route path="/post/:id" element={<PostDetails />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeContextProvider>
  );
}

export default App;
