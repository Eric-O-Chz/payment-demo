import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: false
});

instance.interceptors.request.use(
  config => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    return config;
  },
  err => Promise.reject(err)
);

export default instance;
