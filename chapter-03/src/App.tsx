import './App.css'
//import tailwindcss from '@tailwindcss/vite';

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import MoviePage from './pages/MoviePage';
import NotFound from './pages/not-found';
import RootLayout from './layout/root-layout';
import MovieDetailPage from './pages/MovieDetailPage.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: 'movies/:category',
                element: <MoviePage/>,
            },
            {
                //path: 'movies?:category/:movieId', // react v6에서는 지원이 안된다 어쩌고
                path: 'movies/detail/:movieId',
                element: <MovieDetailPage/>
            },


        ]
    },
]);



function App() {
    return <RouterProvider router={router}/>
}

export default App
