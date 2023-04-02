/**
 * 
 * @param {*} imageRef Принимает ref картинки пользователя, ВЫЗЫВАТЬ ЧЕРЕЗ CALL(this, 'imageRef')
 * @returns В случае, если картинка не пришла с сервера, грузит заглушку с клиента
 */
export function downloadImageUser(imageRef) {
   let img = this.$refs[imageRef];

   img.onerror = () => {
      img.src = require(`@/components/UserAccount/pages/Home/resources/images/users/empty_avatar.png`)
   }
}

// TODO: поробовать её добить, нужна более универсальная штука
export function safelyLoadImage(imageRef, alternativeImageSrc) {
   let img = this.$refs[imageRef];

   img.onerror = () => {
      img.src = require(alternativeImageSrc);
   }
}
