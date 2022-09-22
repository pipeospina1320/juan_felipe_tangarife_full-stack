import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login';
import Buscador from '../pages/buscador';
import Artist from '../pages/artista';
import MyAlbum from '../pages/myalbum';
import GetCredential from '../pages/login/getCredential';
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';

const router = createBrowserRouter([
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        )
      },
      {
        path: 'get-credential',
        element: (
          <GuestGuard>
            <GetCredential />
          </GuestGuard>
        )
      }
    ]
  },
  {
    path: '/',
    children: [
      {
        path: '',
        element: (
          <AuthGuard>
            <Buscador />
          </AuthGuard>
        )
      },
      {
        path: 'artist/:id',
        element: (
          <AuthGuard>
            <Artist />
          </AuthGuard>
        )
      },
      {
        path: 'my-albums',
        element: (
          <AuthGuard>
            <MyAlbum />
          </AuthGuard>
        )
      }
    ]
  }
]);

export default router;
