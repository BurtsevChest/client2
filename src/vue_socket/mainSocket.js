import { io } from "socket.io-client"
import { protocol, socket_domain } from "@/components/Common/helpers/host";
import store from '@/store';

const URL = `${protocol}${socket_domain}`;
const socket = io(URL, {transports: ['websocket'], query: {"user_id": JSON.parse(localStorage.user).user_id} })

socket.onAny((event, ...args) => {
  console.log(event, args);
 });

 socket.on('notificationDefault', (data) => {
  console.log(data[0]);
  store.commit('showNotice', data[0]);
 })

export default socket