import API from '@/api/index';

export function checkAuthorize() {
   API.get('checkToken', localStorage.accessToken).then((res) => {
      return res.data
   }).catch((error) => {
      try {
         if(error.response.status === 401) {
            API.get('refresh').then((res) => {
               API.defaults.headers = {
                headers: {
                   "Authorization": "Bearer " + res.data.accessToken,
                   "Content-Type": "application/json",
                }
               } 
             })
         }
      } catch(e) {
         window.location.href = '/main';
      }
   })
}