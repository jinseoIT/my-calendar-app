import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import schedule from './modules/schedule';

const middlewares = [thunk];
const rootReducer = combineReducers({
  schedule: schedule
})
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;


