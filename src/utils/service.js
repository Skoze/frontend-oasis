import axios from 'axios';
import loading from './loading';

// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';

let config = {
  withCredentials: true, // Check cross-site Access-Control
  baseURL: process.env.VUE_APP_AJAX_BASE_URL
    ? process.env.VUE_APP_AJAX_BASE_URL
    : '', //provides base url
};

const service = axios.create(config);
service.interceptors.request.use(
  function (config) {
    if (!config.async) {
      loading.show();
    }
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (!response.config.async) {
      loading.hide();
    }
    const responseCode = response.status;
    if (responseCode === 200) {
      const { code, message, body } = response.data;
      console.log({ code, message, body });
      if (code === 0) {
        return Promise.resolve(body);
      }
    }
    return Promise.reject(response);
  },
  function (error) {
    // Do something with response error
    if (!error.config.async) {
      loading.hide();
    }
    return Promise.reject(error);
  }
);

export default service;
