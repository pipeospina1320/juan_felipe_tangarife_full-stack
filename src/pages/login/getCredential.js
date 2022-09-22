import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSession } from '../../utils/jwt';

export default function GetCredential() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = () => {
      const token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];
      console.log(hash);
      console.log(token);

      if (token) {
        setSession(token);
        navigate('/', { replace: true });
      }
    };

    getToken();
  }, []);

  return <></>;
}
