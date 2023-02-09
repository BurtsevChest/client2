import axios from "axios";

const AxiosRequest = axios.create({
   baseURL: 'http://localhost:5763/apiV0/',
   headers: {
      withCredentials: true,
      "Authorization": "Bearer " + localStorage.accessToken,
      "Content-Type": "application/json",
   }
});

AxiosRequest.interceptors.response.use((response) => {
   return response;
}, (error) => {
   if(error.request.status === 401) {
      refreshToken()
      return AxiosRequest.request(error.config);
   }
})

function refreshToken() {
   AxiosRequest.get('refresh', { headers: {
      "Authorization": "Bearer " + localStorage.accessToken
   }})
      .then((res) => {
         AxiosRequest.defaults.headers = {
            "Authorization": "Bearer " +  res.data.accessToken,
         }
         localStorage.accessToken = res.data.accessToken;
         localStorage.refreshToken = res.data.refreshToken;
         localStorage.user = JSON.stringify(res.data.user);
      })
}

export default AxiosRequest;