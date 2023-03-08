import { createI18n } from 'vue-i18n';
import messages from '@/lang/translate/ru.json';
import messagesEn from '@/lang/translate/en.json';

export const i18n = createI18n({
   locale: 'ru',
   fallbackLocale: 'en',
   messages: {
      ru: messages,
      en: messagesEn
   }
})

const loadedLanguages = ['ru'];

export function getLocale() {
   if(localStorage.locale) {
      return localStorage.locale;
   } else {
      return navigator.language;
   }
}

export function startLocale() {
   loadLanguageAsync(getLocale());
}

function setI18nLanguage(lang) {
  i18n.global.locale = lang;
  document.querySelector('html').setAttribute('lang', lang);
  localStorage.setItem('locale', lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  if (i18n.global.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  return import(`@/lang/translate/${lang}.json`).then(messages => {
   i18n.global.setLocaleMessage(lang, messages.default);
   loadedLanguages.push(lang);
   return setI18nLanguage(lang);
  })
}

export function tr(key) {
   return i18n.global.t(key, getLocale());
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
