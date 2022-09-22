import PropTypes from 'prop-types';
import HttpStatus from 'http-status-codes';
import { createContext, useMemo } from 'react';
import { get, put } from '../services/ApiServiceFecth';
// ----------------------------------------------------------------------

const initialState = {
  doGet: () => {},
  doPut: () => {}
};

const ApiContext = createContext(initialState);

// ----------------------------------------------------------------------

function ApiProvider({ children }) {
  /**
   * All the request has the same behavour, we can handle this logic
   * inside a function that only returns the result.
   */
  const doRequest = async (type, url, data) => {
    const initialResponse = await type(url, data);

    if (initialResponse === undefined) {
      return null;
    }

    const json = await initialResponse.json();
    if (initialResponse.ok) {
      if (initialResponse.status === HttpStatus.NO_CONTENT) {
        return null;
      }
      return json;
    }
    throw Error(json);
  };

  /**
   * Allows to call a get request.
   */
  const doGet = (url, data) => doRequest(get, url, data);

  const doPut = (url, data) => doRequest(put, url, data);

  const value = useMemo(() => ({ doGet, doPut }), []);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { ApiProvider, ApiContext };
