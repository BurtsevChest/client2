export default {
   actions: {},
   mutations: {
      setTheme(state, theme) {
         state.appTheme = theme;
         document.documentElement.setAttribute('data-theme', theme);
         localStorage.setItem('theme', theme);
      }
   },
   state: {
      appTheme: 'dark'
   },
   getters: {
      appTheme(state) {
         return state.appTheme
      }
   }
}