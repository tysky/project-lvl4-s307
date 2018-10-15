import { createAction } from 'redux-actions';
import axios from 'axios';
import io from 'socket.io-client';

import routes from '../routes';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = ({ messageText, userName, currentChannelId }) => async (dispatch) => {
  dispatch(addMessageRequest());

  const data = {
    data: {
      attributes: {
        userName,
        messageText,
      },
    },
  };
  try {
    const response = await axios.post(routes.messagesUrl(currentChannelId), data);
    dispatch(addMessageSuccess({ task: response.data }));
  } catch (e) {
    dispatch(addMessageFailure());
  }
};

export const addSocketMessage = createAction('ADD_SOCKET_MESSAGE');

export const fetchSocketMessages = () => (dispatch) => {
  const socket = io();
  socket.on('newMessage', ((message) => {
    dispatch(addSocketMessage(message.data.attributes));
  }));
};
