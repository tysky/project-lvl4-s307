import { createAction } from 'redux-actions';
import axios from 'axios';

import routes from '../routes';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (messageData, reset) => async (dispatch) => {
  dispatch(addMessageRequest());
  const { messageText, userName, currentChannelId } = messageData;
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
    reset();
  } catch (e) {
    console.error('Error with sending message to server:', e);
    dispatch(addMessageFailure());
  }
};

export const messageFetched = createAction('MESSAGE_FETCHED');

export const setCurrentChannel = createAction('CURRENT_CHANNEL_SET');
