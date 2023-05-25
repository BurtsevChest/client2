import { createI18n } from 'vue-i18n';
import messages from '@/lang/translate/ru.json';

export const i18n = createI18n({
   locale: 'ru',
   fallbackLocale: 'en',
   messages: {
      ru: messages,
   }
})

const loadedLanguages = ['ru'];

export function getLocale() {
   let locale = localStorage.locale || navigator.language;
   locale = locale.split('-')[0];
   let ifLocaleExist = false;

   translatedlanguages.forEach((item) => {
      if (item.locale === locale) {
         ifLocaleExist = true;
         return;
      }
   });

   if(!ifLocaleExist) {
      locale =  'ru';
   }

   return locale;
}

export function startLocale() {
   loadLanguageAsync(getLocale());
}

function setLanguage(lang) {
   i18n.global.locale = lang;
   document.querySelector('html').setAttribute('lang', lang);
   localStorage.setItem('locale', lang);
}

export async function loadLanguageAsync(lang) {
  if (i18n.global.locale === lang) {
    return Promise.resolve(setLanguage(lang));
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setLanguage(lang));
  }

  return import(`@/lang/translate/${lang}.json`).then(messages => {
   i18n.global.setLocaleMessage(lang, messages.default);
   loadedLanguages.push(lang);
   return setLanguage(lang);
  })
}

export const translatedlanguages = [
   {
      locale: 'ru',
      flag: 'flag-icon-ru',
      name: 'Русский'
   },
   {
      locale: 'en',
      flag: 'flag-icon-us',
      name: 'English'
   }
];

export function activeLocaleSettings() {
   const locale = getLocale();
   return translatedlanguages.find(item => item.locale === locale);
}
