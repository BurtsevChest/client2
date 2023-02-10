import axios from "axios";

const AxiosRequest = axios.create({
   baseURL: 'http://localhost:5763/apiV0/',
   withCredentials: true,
   headers: {
      "Authorization": "Bearer " + localStorage.accessToken,
      "Content-Type": "application/json",
   }
});

AxiosRequest.interceptors.response.use((response) => {
   return response;
}, async (error) => {
   const originalRequest = error.config;
   try {
      if(error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
         const access_token  = await axios.get('http://localhost:5763/apiV0/refresh', { withCredentials: true })
         AxiosRequest.defaults.headers.common['Authorization'] = 'Bearer ' + access_token.data.accessToken;
         localStorage.setItem('accessToken',  access_token.data.accessToken);
         return AxiosRequest(originalRequest);
      }
   } catch (e) {
      console.log('Fuck ass yourself');
   }
   
})

export default AxiosRequest;