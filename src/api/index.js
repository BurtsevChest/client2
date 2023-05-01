import axios from "axios";
import { api_domain, protocol } from '@/components/Common/helpers/host';

const token = localStorage.accessToken;

const AxiosRequest = axios.create({
   baseURL: `${protocol}${api_domain}/apiV0/`,
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
   try {
      if(error.response.status === 401 && !originalRequest._isRetry) {
         originalRequest._isRetry = true;
         const response = await axios.get(`${protocol}${api_domain}/apiV0/refresh`, { withCredentials: true });
         localStorage.setItem('accessToken',  response.data.accessToken);
         originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

         return AxiosRequest.request(originalRequest);
      }
   } catch (e) {
      window.location.href = '/';
      localStorage.clear();
   }
})

export default AxiosRequest;
