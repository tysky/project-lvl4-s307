import { combineReducers } from 'redux';
// import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';


export default combineReducers({
  form: formReducer,
});
