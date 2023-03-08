export function setUser(user) {
   localStorage.setItem(user, JSON.stringify(user))
}

export function getUser() {
   if(localStorage.user) {
      return JSON.parse(localStorage.user);
   }
}

