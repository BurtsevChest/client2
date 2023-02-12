import axios from "axios";

const AxiosRequest = axios.create({
   baseURL: 'http://localhost:5763/apiV0/',
   withCredentials: true,
   headers: {
      "Authorization": "Bearer " + localStorage.accessToken,
      "Content-Type": "application/json",
   }
});

AxiosRequest.interceptors.request.use((config) => {
   config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
   return config;
})

AxiosRequest.interceptors.response.use((response) => {
   return response;
}, async (error) => {
   const originalRequest = error?.config;
   try {
      if(error.response.status === 401 && error?.config && !error?.config?._isRetry) {
         originalRequest._isRetry = true;

         const response = await axios.get('http://localhost:5763/apiV0/refresh', { withCredentials: true })
         
         localStorage.setItem('accessToken',  response.data.accessToken);
         originalRequest.headers = { ...originalRequest.headers };
         originalRequest.headers["Authorization"] = `Bearer ${response.data.access_token}`;
         return AxiosRequest.request(originalRequest);
      }
   } catch (e) {
      console.log('Fuck ass yourself');
   }
})

export default AxiosRequest;
