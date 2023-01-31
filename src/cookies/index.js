// /**
//  * 
//  * @param {*} name Принимает имя куки
//  * @returns Возвращает куки с указанным именем. Или undefined, если ничего не найдено
//  */
// export function getCookie(name) {
//    let matches = document.cookie.match(new RegExp(
//      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//    ));
//    return matches ? decodeURIComponent(matches[1]) : undefined;
//  }

//  /**
//  * 
//  * @param {*} name Имя создаваемой куки
//  * @param {*} value Значение куки
//  * @param {*} options Настройки куки
//  */
//  export function setCookie(name, value, options = {}) {

//    options = {
//      path: '/',
//      domain: 'localhost:5763',
//      ...options
//    };

//    if (options.expires instanceof Date) {
//      options.expires = options.expires.toUTCString();
//    }

//    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

//    for (let optionKey in options) {
//      updatedCookie += "; " + optionKey;
//      let optionValue = options[optionKey];
//      if (optionValue !== true) {
//        updatedCookie += "=" + optionValue;
//      }
//    }

//    document.cookie = updatedCookie;
//  }

// /**
//  * 
//  * @param {*} name Принимает имя куки
//  * @result Удаляет куки, с заданным именем
//  */
// export function deleteCookie(name) {
//    setCookie(name, "", {
//      'max-age': -1
//    })
//  }