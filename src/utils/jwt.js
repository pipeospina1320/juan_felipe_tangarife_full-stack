import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';
const BEARER_PREFIX = 'Bearer';

const getAuthorizationBearer = () => `${BEARER_PREFIX} ${getToken()}`;

/**
 * Metodo que contiene la logica necesaria para obtener el token de sesion
 * directamente desde el metodo de almacenamiento de información
 *
 * @return string el token de sesion o null si no existe
 */
const getToken = () => Cookies.get(TOKEN_KEY);

/**
 * Metodo que contiene la logica necesaria para guardar la informacion de la sesion,
 * despúes de que el usuario se ha autenticado exitosamente o renovado dicha
 * autenticación.
 *
 * @param sessionData los datos que retorna el proveedor de autenticación
 */
const setSession = (accessToken) => {
  if (accessToken) {
    Cookies.set(TOKEN_KEY, accessToken);
  } else {
    Cookies.remove(TOKEN_KEY);
  }
};

export { setSession, getToken, getAuthorizationBearer };
