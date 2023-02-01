import store from "@/store";

export function openDialog(template, options) {
   store.commit('openModalView', template, options)
}