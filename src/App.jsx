import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import ChatContext from './context';
import ChatApp from './components/ChatApp';

export default ({ channels }) => {
  /* eslint-disable no-underscore-dangle */
  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  const devtoolMiddleware = ext && ext();
  /* eslint-enable */

  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      devtoolMiddleware,
    ),
  );

  ReactDOM.render(
    <Provider store={store}>
      <ChatContext.Provider value={channels}>
        <ChatApp />
      </ChatContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
