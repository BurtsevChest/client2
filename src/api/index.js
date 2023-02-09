import axios from "axios";

const AxiosRequest = axios.create({
   baseURL: 'http://localhost:5763/apiV0/',
   headers: {
      "Authorization": "Bearer " + localStorage.accessToken,
      "Content-Type": "application/json",
   }
});

AxiosRequest.interceptors.response.use((response) => {
   return response;
}, (error) => {
   if(error.request.status === 401) {
      refreshToken()
         .then(()=> {
            return axios.request(error.config)
         })
   }
   return Promise.reject(error);
})

async function refreshToken() {
   await AxiosRequest.post('refresh', { headers: {
      "Authorization": "Bearer " + localStorage.refreshToken
   }})
      .then((res) => {
         localStorage.accessToken = res.data.accessToken;
         localStorage.refreshToken = res.data.refreshToken;
         localStorage.user = JSON.stringify(res.data.user);
      })
}

export default AxiosRequest;