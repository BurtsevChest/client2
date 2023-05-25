import axios from "axios";

const token = localStorage.accessToken;

const AxiosRequest = axios.create({
   baseURL: `${process.env.VUE_APP_PROTOCOL}${process.env.VUE_APP_MAIN_API}/apiV0/`,
   withCredentials: true,
   headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
   }
});

AxiosRequest.interceptors.request.use((config) => {
   return config;
})

AxiosRequest.interceptors.response.use((response) => {
   return response;
}, async (error) => {
   const originalRequest = error?.config;
   if(error.response) {
      if(error.response.status === 401 && !originalRequest._isRetry) {
         originalRequest._isRetry = true;
         const response = await axios.get(`${process.env.VUE_APP_PROTOCOL}${process.env.VUE_APP_MAIN_API}/apiV0/refresh`, { withCredentials: true });
         localStorage.setItem('accessToken',  response.data.accessToken);
         originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
         return AxiosRequest.request(originalRequest);
      }
   }
   return Promise.reject(error);
})

export default AxiosRequest;
