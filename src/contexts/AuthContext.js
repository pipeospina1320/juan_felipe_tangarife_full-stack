import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import { getUser } from '../services/ApiServiceFecth';
import { setSession, getToken } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  })
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: 'jwt'
  // login: () => Promise.resolve(),
  // logout: () => Promise.resolve()
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = getToken();
        if (accessToken) {
          await getUser()
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              setSession(null);
              throw Error(response);
            })
            .then((response) => {
              const { display_name } = response;
              dispatch({
                type: 'INITIALIZE',
                payload: {
                  isAuthenticated: true,
                  user: display_name
                }
              });
            })
            .catch((error) => {
              setSession(null);
              const message =
                (error.response && error.response.data.message) || 'Credenciales inválidos';
              throw Error(message);
            });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        setSession(null);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  // const login = async (email, password) => {
  //   await loginFetch({ email, password })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw Error(response.statusText);
  //     })
  //     .then((response) => {
  //       const { token, user } = response;

  //       setSession(token);

  //       dispatch({
  //         type: 'LOGIN',
  //         payload: {
  //           user
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       const message = (error.response && error.response.data.message) || 'Credenciales inválidos';
  //       throw Error(message);
  //     });
  // };

  // const register = async (email, password, firstName, lastName) => {
  //   // const response = await axios.post('/api/account/register', {
  //   //   email,
  //   //   password,
  //   //   firstName,
  //   //   lastName,
  //   // });
  //   // const { accessToken, user } = response.data;

  //   // localStorage.setItem('accessToken', accessToken);

  //   dispatch({
  //     type: 'REGISTER',
  //     payload: {
  //       // user,
  //     },
  //   });
  // };

  // const logout = async () => {
  //   await logoutFetch()
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw Error(response.statusText);
  //     })
  //     .then(() => {
  //       setSession(null);
  //       dispatch({ type: 'LOGOUT' });
  //     })
  //     .catch((error) => {
  //       const message = error.response && error.response.data.message;
  //       throw Error(message);
  //     });
  // };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt'
        // login,
        // logout
        // register,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
