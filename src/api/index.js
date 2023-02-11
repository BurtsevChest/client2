import axios from "axios";

const API = axios.create({
   baseURL: 'http://localhost:5763/apiV0/',
   withCredentials: true,
   headers: {
      "Authorization": "Bearer " + localStorage.accessToken,
      "Content-Type": "application/json",
   }
});


API.interceptors.response.use((response) => {
   return response;
}, async (error) => {
   const originalRequest = error.config;
   if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await API.get('refresh', { withCredentials: true }).then((res) => res.data.accessToken);
      console.log(accessToken);
      API.defaults.headers = {
         "Authorization": "Bearer " + accessToken,
      }
      return API(originalRequest);
   }
   return Promise.reject(error);
})



// AxiosRequest.interceptors.response.use((response) => {
//    return response;
// }, async (error) => {
//    const originalRequest = error.config;
//    if(error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       await axios.get('http://localhost:5763/apiV0/refresh', { withCredentials: true }).then((res) => {
//          AxiosRequest.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken;
//          localStorage.setItem('accessToken', res.data.accessToken);
//       }).finally(() => {

//          return AxiosRequest(originalRequest);
//       })
//    }
//    return Promise.reject(error);
// })

export default API;