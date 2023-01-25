// Достаем локаль из истории бразуера
const LOCALE = localStorage.locale

// нужно будет сделать обработки, достающие локаль из бд, когда юзер уже выбрал себе локализацию
// Сначала сохранить локаль в историю бразуера. Если там пусто, обратиться к бд
// При регистрации нового юзера нужно опрделить локаль по настройке бразуера (navigator.language)

/**
 * @class Класс для управлением локализацией
 * @getTranslate Функция, возвращающая импорт json-а с переводом
 * @params Имя компонента, которому нужен первод
 */
class Lang {
   getTranslate(componentName) {
      return import('@/components/lang/'+componentName+'/'+LOCALE+'.json')
   }
}

export default new Lang()