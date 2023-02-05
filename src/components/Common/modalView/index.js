import store from "@/store";

export function openDialog(options) {
   store.commit('openModalView', options)
}

export function closeDialog() {
   store.commit('closeModalView')
}