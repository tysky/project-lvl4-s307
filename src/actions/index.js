import { createAction } from 'redux-actions';
import axios from 'axios';

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
