import UUID from 'uuid-js';
import {constants} from '../actions/listActions';
const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.get('CREATE_LIST'):
      console.log('Action Payload', action.payload);
      let updatedState = JSON.parse(JSON.stringify(state));
      for (let list in updatedState) {
        if (updatedState[list].id == action.payload.id) {
          updatedState[list] = action.payload;
          console.log("SUCCESS, UPDATED");
          return updatedState;
        }
      }
      const newList = {
        ...action.payload,
        items: [],
      };
      return [...state, newList];
    case constants.get('GET_LISTS_DONE'):
      return action.payload;
    case constants.get('DELETE_LIST'):
      let newState = JSON.parse(JSON.stringify(state));
      for (let list in newState) {
        if (newState[list].id == action.payload) {
          newState.splice(list, 1);
          break;
        }
      }
      return newState;
  }
  return state;
}
