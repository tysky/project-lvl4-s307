import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const currentChannelId = handleActions({
  [actions.setCurrentChannel](state, { payload }) {
    return payload;
  },
}, 1);

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
  [actions.messageFetched](state, { payload }) {
    return [...state, payload];
  },
}, 'none');

const modalAddChannel = handleActions({
  [actions.openModalAddChannel]() {
    return { modalAddChannelShow: true };
  },
  [actions.closeModalAddChannel]() {
    return { modalAddChannelShow: false };
  },
}, { modalAddChannelShow: false });


const channelAddingState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.addChannelSuccess]() {
    return 'successed';
  },
}, 'none');

const channels = handleActions({
  [actions.channelsFetched](state, { payload }) {
    return [...state, payload];
  },
}, 'none');

export default combineReducers({
  channels,
  channelAddingState,
  currentChannelId,
  messageSendingState,
  messages,
  modalAddChannel,
  form: formReducer,
});
