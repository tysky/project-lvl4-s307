import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import ChatContext from './context';
import ChatApp from './components/ChatApp';
import addListeners from './socket';
import configureStore from './store';

export default (gon, userName) => {
  const store = configureStore(reducers, gon);
  addListeners(store);

  const context = {
    userName,
  };

  render(
    <Provider store={store}>
      <ChatContext.Provider value={context}>
        <ChatApp />
      </ChatContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
