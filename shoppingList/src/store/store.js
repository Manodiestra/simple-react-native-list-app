import {createStore, combineReducers, applyMiddleware} from 'redux';
import lists from '../reducers/lists';
import idAssigner from '../middleware/id_assigner';
import storage from '../middleware/storage';

export default createStore(
  combineReducers({
    lists,
  }),
  applyMiddleware(idAssigner, storage),
);
