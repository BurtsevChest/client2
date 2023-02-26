import VueSocketIO from 'vue-3-socket.io';
import app from '@/main';
import store from '@/store';
import SocketIO from 'socket.io-client';

const options = { 
   transports: ['websocket'] 
};

const VueSocket = new VueSocketIO({
   debug: true,
   connection: SocketIO('http://127.0.0.1:5763', options),
   options,
   vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
   }
});

export function ConnectSocket() {
   app.use(VueSocket)
}