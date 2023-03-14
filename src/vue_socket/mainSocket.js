import { io } from "socket.io-client"

const URL = "http://127.0.0.1:5763";
const socket = io(URL, {transports: ['websocket'], query: {"user_id": JSON.parse(localStorage.user).user_id} })

socket.onAny((event, ...args) => {
   console.log(event, args);
 });

export default socket