import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login';
import Buscador from '../pages/buscador';
import Artist from '../pages/artista';
import MyAlbum from '../pages/myalbum';
import GetCredential from '../pages/login/getCredential';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/get-credential',
    element: <GetCredential />
  },
  {
    path: '/',
    element: <Buscador />
  },
  {
    path: '/artist/:id',
    element: <Artist />
  },
  {
    path: '/my-albums',
    element: <MyAlbum />
  }
]);

export default router;
