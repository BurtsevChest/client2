import store from "@/store";

export function openRightAside(options) {
   store.commit('openRightAside', options)
}

export function closeRightAside() {
   store.commit('close')
}

export function openAside(options) {
   store.commit('openAsideNew', options)
}

export function closeAsideNew(opener) {
   store.commit('closeAsideNew', opener);
}