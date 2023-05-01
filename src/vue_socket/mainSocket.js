import { io } from "socket.io-client"
import { protocol, api_domain } from "@/components/Common/helpers/host";
import Notification from '@/components/Common/Notification/Notification.vue';

const URL = `${protocol}${api_domain}`;
const socket = io(URL, {transports: ['websocket'], query: {"user_id": JSON.parse(localStorage.user).user_id} })

socket.onAny((event, ...args) => {
  Notification.methods.showNotice(event, args);
  console.log(event, args);
 });

export default socket