import io from 'socket.io-client';
import { channelEdited, channelsFetched, messageFetched } from './actions';

export default (store) => {
  const socket = io();
  socket.on('newMessage', ((message) => {
    store.dispatch(messageFetched(message.data.attributes));
  }));
  socket.on('newChannel', ((channel) => {
    store.dispatch(channelsFetched(channel.data.attributes));
  }));
  socket.on('renameChannel', ((channel) => {
    store.dispatch(channelEdited(channel.data.attributes));
  }));
};
