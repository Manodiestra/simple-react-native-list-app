import AsyncStorage from '@react-native-community/async-storage';
import {constants} from '../actions/listActions';

export default (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === constants.get('GET_LISTS')) {
    AsyncStorage.getItem('@lists')
      .then(listsJson => {
        let lists = [];
        if (listsJson) {
          lists = JSON.parse(listsJson);
        }
        store.dispatch({
          type: constants.get('GET_LISTS_DONE'),
          payload: lists,
        });
      })
      .catch(console.log);
  } else if (action.type !== constants.get('GET_LISTS_DONE')) {
    AsyncStorage.setItem(
      '@lists',
      JSON.stringify(store.getState().lists),
    ).catch(console.log);
  }
  return result;
};
