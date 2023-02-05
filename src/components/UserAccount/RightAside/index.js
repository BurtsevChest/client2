import store from "@/store";

export function openRightAside(options) {
   store.commit('openRightAside', options)
}

export function closeRightAside() {
   store.commit('close')
}