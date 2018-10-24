import io from 'socket.io-client';
import {
  channelDeleted, channelEdited, channelsFetched, messageFetched,
} from './actions';

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
  socket.on('removeChannel', ((channel) => {
    store.dispatch(channelDeleted(channel.data));
  }));
};
