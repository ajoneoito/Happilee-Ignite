import axios from 'axios';
import {Appconfig} from '../../config/config';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {store} from '../../redux/store/store';
import {REFRESH_AUTH_TOKEN_ACTION} from '../../redux/actions/auth.action';
const MMKV = new MMKVLoader().initialize();

const getToken = async () => {
  let string = await MMKV.getStringAsync('authToken');
  return string;
};

const getRefreshToken = async () => {
  let string = await MMKV.getStringAsync('refreshToken');
  return string;
};

const apiBody = {
  baseURL: Appconfig.BASE_URL,
  //withCredentials: true,
};

const request = axios.create(apiBody);

request.interceptors.request.use(async config => {
  if (config.url === '/tokenRefresh') {
    config.headers = {
      Authorization: `Bearer ${await getRefreshToken()}`,
    };
  } else {
    config.headers = {
      Authorization: `Bearer ${await getToken()}`,
    };
  }
  return config;
});

request.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      await store.dispatch({type: REFRESH_AUTH_TOKEN_ACTION});
      originalRequest.headers.Authorization = `Bearer ${await getToken()}`;
      return request(originalRequest);
    }
    return Promise.reject(error);
  },
);

export {request};
