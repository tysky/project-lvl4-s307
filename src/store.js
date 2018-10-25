import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


export default (reducers, initState) => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  const store = createStore(
    reducers,
    initState,
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  );

  return store;
};
