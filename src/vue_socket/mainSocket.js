import { io } from "socket.io-client"
import store from '@/store';

const URL = `${process.env.VUE_APP_PROTOCOL}${process.env.VUE_APP_SOCKET_API}`;
const socket = io(URL, {transports: ['websocket'], query: {"user_id": JSON.parse(localStorage.user).user_id} })

socket.onAny((event, ...args) => {
  console.log(event, args);
 });

 socket.on('notificationDefault', (data) => {
  console.log(data);
  store.commit('showNotice', data);
 })

export default socket