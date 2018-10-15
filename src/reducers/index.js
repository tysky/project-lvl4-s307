import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const currentChannelId = handleActions({}, 1);

const messageSendingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
  [actions.addMessageSuccess]() {
    return 'successed';
  },
}, 'none');

const messages = handleActions({
  [actions.addSocketMessage](state, { payload }) {
    return [...state, payload];
  },
}, 'none');


export default combineReducers({
  currentChannelId,
  messageSendingState,
  messages,
  form: formReducer,
});
