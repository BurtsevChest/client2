/**
 * 
 * @param {*} page Принимает path текущей страницы 
 * @result Закрывает доступ к userAcount, если пользователь не зарегистрирован
 */
export function restrictAccess(page) {
   if(page.includes('/user_account')) {
      // Если нет данных о токене и нет данных о юзере
      if(!localStorage.token && !localStorage.user) {
         history.back();
      }
   }
}