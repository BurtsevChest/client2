/**
 * 
 * @param {*} imageRef Принимает ref картинки пользователя, ВЫЗЫВАТЬ ЧЕРЕЗ CALL(this, 'imageRef')
 * @returns В случае, если картинка не пришла с сервера, грузит заглушку с клиента
 */
export function downloadImageUser(imageRef) {
   safelyLoadImage.call(this, imageRef, 'components/UserAccount/pages/Home/resources/images/users/empty_avatar.png');
}

/**
 * 
 * @param {*} imageRef Принимает ref картинки, ВЫЗЫВАТЬ ЧЕРЕЗ CALL(this, 'imageRef', 'alternateSrc')
 * @param {*} alternativeImageSrc Путь до альтернативной картинки (начинать с 'components/...')
 * @returns В случае, если картинка не пришла с сервера, грузит альтернативную картинку
 */
export function safelyLoadImage(imageRef, alternativeImageSrc) {
   const img = this.$refs[imageRef];

   img.onerror = () => {
      img.src = require(`@/${alternativeImageSrc}`);
   }
}
