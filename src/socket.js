import io from 'socket.io-client';
import { messageFetched } from './actions';

export default (store) => {
  const socket = io();
  socket.on('newMessage', ((message) => {
    store.dispatch(messageFetched(message.data.attributes));
  }));
};
