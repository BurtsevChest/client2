import AxiosRequest from '@/api';
import { api_domain, protocol } from '@/components/Common/helpers/host';

const userPhotoBaseUrl = `${protocol}${api_domain}/apiV0/photo/`;

/**
 * 
 * @param {*} user_id Принимает id пользователя
 * @returns Возвращает url его аватарки, если она существует. Если нет, вернет url заглушки.
 */
export function loadUserImage(user_id) {
   let userPhotoUrl = userPhotoBaseUrl + user_id;
   const alternativeImageUrl = require(`@/components/UserAccount/pages/Home/resources/images/users/empty_avatar.png`);

   return new Promise((resolve) => {
      AxiosRequest.get(userPhotoUrl)
         .then((res) => {
            if(!res.status===200) {
               userPhotoUrl = alternativeImageUrl;
            }
         })
         .catch(() => {
            userPhotoUrl = alternativeImageUrl;
         })
         .finally(() => {
            resolve(userPhotoUrl)
         })
   })
}

// TODO: доделать, чтобы возвращало файл, а потом пехать в картинку
/**
 * 
 * @param {*} user_id Принимает id пользователя
 * @returns Возвращает new File его аватарку. И заглушку, если что-то пошло не так, или картинки нет.
 */
export function downloadImageUser(user_id) {
   let userPhotoUrl = userPhotoBaseUrl + user_id;

   return new Promise((resolve) => {
      let file = new URL();

      AxiosRequest.get(userPhotoUrl)
         .then((response) => {
            resolve(file.createObjectURL(response.data));
         })
   })
}
