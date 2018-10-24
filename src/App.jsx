import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import ChatContext from './context';
import ChatApp from './components/ChatApp';
import fetchMessages from './socket';

export default (gon, userName) => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  // const { channels, messages } = gon;

  const store = createStore(
    reducers,
    gon,
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  );

  fetchMessages(store);

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
