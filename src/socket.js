import io from 'socket.io-client';
import { messageFetched } from './actions';

export default () => (dispatch) => {
  const socket = io();
  socket.on('newMessage', ((message) => {
    dispatch(messageFetched(message.data.attributes));
  }));
};
