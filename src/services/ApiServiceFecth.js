import { getAuthorizationBearer } from '../utils/jwt';

const HEAD_CONTENT = { 'Content-Type': 'application/json', Accept: 'application/json' };

const PATH = process.env.REACT_APP_URL_API;

const createPath = (url) => {
  if (!url) {
    throw new Error('La URL es requerida para este metodo');
  }
  return PATH + url;
};

const configRequest = (method, body) => {
  const authorizationBearer = { Authorization: getAuthorizationBearer() };
  Object.assign(HEAD_CONTENT, authorizationBearer);
  return {
    method,
    headers: HEAD_CONTENT,
    body: JSON.stringify(body)
  };
};

const get = async (path, params = {}) => {
  const urlPath = createPath(path);
  const searchParams = new URLSearchParams(params);
  const url = `${urlPath}?${searchParams.toString()}`;
  const response = await fetch(url, configRequest('GET'));
  return response;
};

const put = async (path) => {
  const urlPath = createPath(path);
  const optionsFetch = configRequest('PUT');
  // optionsFetch.body = JSON.stringify(data);
  const response = await fetch(urlPath, optionsFetch);
  return response;
};

const del = async (path) => {
  const urlPath = createPath(path);
  const optionsFetch = configRequest('DELETE');
  const response = await fetch(urlPath, optionsFetch);
  return response;
};

const getUser = async () => {
  return get('/me');
};

export { get, put, getUser, del };
