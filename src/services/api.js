import axios from "axios";
import { getToken, logout } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    console.log("interceptor error: ", error);

    if (error && error.response.status === 401) {
      window.location = "/login";
      logout();
      return error;
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log("interceptor error: ", response);

    return response;
  },
  function (error) {
    console.log("interceptor error: ", error);

    if (error && error.response.status === 401) {      
      window.location = "/login";
      logout();
      return error;
    }
    return Promise.reject(error);
  }
);

export default api;
