import './App.css'
//import tailwindcss from '@tailwindcss/vite';

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from './pages/home';
import MoviePage from './pages/moviePage';
import NotFound from './pages/not-found';
import RootLayout from './layout/root-layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFound/>,

        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'movies',
                element: <MoviePage/>,
            },
            {
                path: 'movies/:movieId', // :movieId는 동적 라우팅을 위한 파라미터
                element: <MoviePage/>
            }
        ]
    },
])

function App() {
    return <RouterProvider router={router}/>
}

export default App
