import { RouterProvider } from 'react-router-dom';
import { ApiProvider } from './contexts/ApiContext';
import { AuthProvider } from './contexts/AuthContext';
import router from './routes';
import './theme/index.css';

function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <RouterProvider router={router} />
      </ApiProvider>
    </AuthProvider>
  );
}

export default App;
