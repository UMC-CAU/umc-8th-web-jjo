import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomeLayout from './layouts/HomeLayout';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import { RouteObject } from 'react-router-dom';


//publicRoutes: 인증 없이 접근 가능한 라우트
const publicRoutes = RouteObject[] = [
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
    },
  ],
},
];

//privateRoutes: 인증이 필요한 라우트
const protectedRoutes = RouteObject[] = [
  {
    path:"/",
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],

  },
];

const router = createBrowserRouter([...publicRoutes]);

function App() {
  return (
  <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  );
}
export default App;
