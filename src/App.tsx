import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomeLayout from './layouts/HomeLayout';

const router = createBrowserRouter([
  {
  path: '/',
  element: <HomeLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true, element: <HomePage />
    },
    {
      path: 'login', element: <LoginPage />
    },
    {
      path: "signup",
      element: <SignupPage />
    }
    
  ]
},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
