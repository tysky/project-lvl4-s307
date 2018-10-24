import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const currentChannelId = handleActions({
  [actions.setCurrentChannel](state, { payload }) {
    return payload;
  },
}, 1);

// messages
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

// Adding channel
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

// Editing channel
const modalEditChannel = handleActions({
  [actions.openModalEditChannel](state, { payload: { channelId } }) {
    return { channelId, modalEditChannelShow: true };
  },
  [actions.closeModalEditChannel]() {
    return { modalEditChannelShow: false };
  },
}, { modalEditChannelShow: false });

const channelEditingState = handleActions({
  [actions.editChannelRequest]() {
    return 'requested';
  },
  [actions.editChannelFailure]() {
    return 'failed';
  },
  [actions.editChannelSuccess]() {
    return 'successed';
  },
}, 'none');

const channels = handleActions({
  [actions.channelsFetched](state, { payload }) {
    return [...state, payload];
  },
  [actions.channelEdited](state, { payload }) {
    const filteredState = state.filter(channel => channel.id !== payload.id);
    return [...filteredState, payload];
  },
}, 'none');

export default combineReducers({
  channels,
  channelAddingState,
  channelEditingState,
  currentChannelId,
  messageSendingState,
  messages,
  modalAddChannel,
  modalEditChannel,
  form: formReducer,
});
