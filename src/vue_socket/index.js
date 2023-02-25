import VueSocketIO from 'vue-3-socket.io';
import store from '@/store';

const options = { 
   transports: ['websocket'] 
};

const VueSocket = new VueSocketIO({
   debug: true,
   connection: '/127.0.0.1:5763',
   options,
   vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
   }
});

export default VueSocket;