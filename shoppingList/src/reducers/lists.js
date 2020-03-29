import UUID from 'uuid-js';
import {constants} from '../actions/listActions';
const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.get('CREATE_LIST'):
      const newList = {
        ...action.payload,
        items: [],
      };
      return [...state, newList];
    case constants.get('GET_LISTS_DONE'):
      return action.payload;
    case constants.get('DELETE_LIST'):
      console.log('state', state);
      console.log('payload', action.payload);
      let newState = JSON.parse(JSON.stringify(state));
      for (let list in newState) {
        if (newState[list].id == action.payload) {
          console.log('list', newState[list]);
          newState.splice(list, 1);
        }
      }
      console.log('newState', newState);
      return newState;
  }
  return state;
}
