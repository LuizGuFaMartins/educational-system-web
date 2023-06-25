import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "./auth";

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

api.interceptors.response.use(async (res, error) => {
  if (error && error.response.status === 401) {
    const navigate = useNavigate();
    navigate("/login");
    return error;
  }
  return res;
});

export default api;
