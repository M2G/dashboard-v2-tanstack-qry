import axios from 'axios';
import { toast } from 'react-toastify';

import Config from './constants';

const api = axios.create({
  // base URL is read from the "constructor"
  baseURL: 'http://localhost:8181',
  // here are some default headers
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  // 20 second timeout...
  timeout: 20000,

  transformRequest: [
    function (data, headers) {
      // Do whatever you want to transform the data
      const { token } = Config.GLOBAL_VAR;
      if (token && headers) {
        headers.Authorization = `Bearer ${token}`;
      }

      return data;
    },
    ...(axios.defaults.transformRequest as any),
  ],
});

/*
api.addAsyncRequestTransform((request) => async () => {
  const { token } = Config.GLOBAL_VAR;
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
});

});
*/

const myInterceptor = api.interceptors.response.use(
  (response) => response,
  (error) => {
    /*
     * @see https://github.com/axios/axios#interceptors
     * https://github.com/axios/axios/issues/2321
     * https://stackoverflow.com/questions/57251719/acquiring-a-new-token-with-axios-interceptors
     * https://stackoverflow.com/questions/51646853/automating-access-token-refreshing-via-interceptors-in-axios
     */
    toast.error(`${error?.message} : ${error?.response.data.error}`);

    api.interceptors.response.eject(myInterceptor);
    (import.meta as any).env.MODE === 'development'
      ? console.error(JSON.stringify(error?.response))
      : '';
    return Promise.reject(error);
  },
);

export default api;
