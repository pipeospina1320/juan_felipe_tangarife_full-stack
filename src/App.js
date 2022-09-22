import { RouterProvider } from 'react-router-dom';
import { ApiProvider } from './contexts/ApiContext';
import router from './routes';
import './theme/index.css';

function App() {
  return (
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  );
}

export default App;
