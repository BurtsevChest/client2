import { io } from "socket.io-client"
import { protocol, chatApi } from "@/components/Common/helpers/host";

const URL = `${protocol}${chatApi}`;
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