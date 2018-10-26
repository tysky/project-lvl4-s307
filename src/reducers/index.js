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


const modalWindow = handleActions({
  [actions.openModalWindow](state, { payload: { channelId, type } }) {
    return { channelId, type, show: true };
  },
  [actions.closeModalWindow]() {
    return { show: false };
  },
  [actions.addChannelSuccess]() {
    return { show: false };
  },
  [actions.editChannelSuccess]() {
    return { show: false };
  },
  [actions.deleteChannelSuccess]() {
    return { show: false };
  },
}, { show: false });


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

const channelDeletingState = handleActions({
  [actions.deleteChannelRequest]() {
    return 'requested';
  },
  [actions.deleteChannelFailure]() {
    return 'failed';
  },
  [actions.deleteChannelSuccess]() {
    return 'successed';
  },
}, 'none');


const channels = handleActions({
  [actions.channelsFetched](state, { payload }) {
    return [...state, payload];
  },
  [actions.channelEdited](state, { payload }) {
    const filteredState = state.filter(channel => channel.id !== payload.id);
    const newState = [...filteredState, payload].sort((a, b) => (a.id - b.id));
    return newState;
  },
  [actions.channelDeleted](state, { payload }) {
    const filteredState = state.filter(channel => channel.id !== payload.id);
    return filteredState;
  },
}, 'none');

export default combineReducers({
  channels,
  channelAddingState,
  channelDeletingState,
  channelEditingState,
  currentChannelId,
  messageSendingState,
  messages,
  modalWindow,
  form: formReducer,
});
