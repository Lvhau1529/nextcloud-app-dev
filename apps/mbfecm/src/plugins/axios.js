import axios from "axios";
// import TokenService from "@/helpers/token";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

axiosInstance.interceptors.request.use((request) => {
  request.headers = {
    "Content-Type": "application/json",
    // ...TokenService.getHeader(),
  };

  request.params = { ...request.params, v: Date.now() };

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    response.data.success = true;
    return response.data;
  },
  () => {
    return {
      success: false,
    };
  }
);

export default axiosInstance;
