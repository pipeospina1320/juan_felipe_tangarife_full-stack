import { useContext } from 'react';
import { ApiContext } from '../contexts/ApiContext';
// ----------------------------------------------------------------------

const useApi = () => {
  const context = useContext(ApiContext);

  if (!context) throw new Error('Api context must be use inside ApiProvider');

  return context;
};

export default useApi;
