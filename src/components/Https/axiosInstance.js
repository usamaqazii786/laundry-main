import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.laundry.dev-iuh.xyz/api/',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Request Interceptor:", config);
    return {
      ...config,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined
      }
    };
  },

  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something Went Wrong"
    )
);
export default axiosInstance;



