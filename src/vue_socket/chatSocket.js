import { io } from "socket.io-client";

const URL = `${process.env.VUE_APP_PROTOCOL}${process.env.VUE_APP_CHAT_API}`;
const socket = io(URL, {transports: ['websocket'], query: {"accessToken": localStorage.accessToken} })

socket.onAny((event, ...args) => {
   console.log(event, args);
 });

 socket.on("connect_error", (err) => { //Прирендеренный emit socket io. Срабатывает когда new Error
  console.log(err instanceof Error);
  console.log(err.message); // not authorized
  console.log(err.data); // { content: "Please retry later" }
});

export default socket