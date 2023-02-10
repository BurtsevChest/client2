import store from "@/store";

export function openHeaderMenu() {
   store.commit('openHeaderMenu');
}

export function closeHeaderMenu() {
   store.commit('closeHeaderMenu');
}