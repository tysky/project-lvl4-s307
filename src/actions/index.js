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
    await axios.post(routes.messagesUrl(currentChannelId), data);
    dispatch(addMessageSuccess());
    reset();
  } catch (e) {
    console.error('Error with sending message to server:', e);
    dispatch(addMessageFailure());
  }
};

export const messageFetched = createAction('MESSAGE_FETCHED');

export const setCurrentChannel = createAction('CURRENT_CHANNEL_SET');

export const openModalAddChannel = createAction('MODAL_ADD_CHANNEL_OPEN');
export const closeModalAddChannel = createAction('MODAL_ADD_CHANNEL_CLOSE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const addChannel = (channelName, reset) => async (dispatch) => {
  dispatch(addChannelRequest());
  const data = {
    data: {
      attributes: {
        name: channelName,
      },
    },
  };
  try {
    await axios.post(routes.channelsUrl(), data);
    dispatch(addChannelSuccess());
    dispatch(closeModalAddChannel());
    reset();
  } catch (e) {
    console.error('Error with creating new channel:', e);
    dispatch(addChannelFailure());
  }
};

export const channelsFetched = createAction('CHANNELS_FETCHED');
