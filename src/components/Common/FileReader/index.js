import store from "@/store";

export function openFileReader(options) {
   store.commit('openFileReader', options);
}
