import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '@/components/lang/translate/ru.json';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages
})

const loadedLanguages = ['ru'];

function getLocale() {
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
  i18n.locale = lang;
  document.querySelector('html').setAttribute('lang', lang);
  localStorage.setItem('locale', lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  return import(`@/components/lang/translate/${lang}.json`).then(messages => {
    i18n.setLocaleMessage(lang, messages.default);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  })
}

export const translatedlanguages = ['ru', 'en'];
