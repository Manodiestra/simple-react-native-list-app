import UUID from 'uuid-js';
import {constants} from '../actions/listActions';
import {act} from 'react-test-renderer';
const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.get('CREATE_LIST'):
      let updatedState = JSON.parse(JSON.stringify(state));
      for (let list in updatedState) {
        if (updatedState[list].id == action.payload.id) {
          updatedState[list] = action.payload;
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
    case constants.get('ADD_TO_LIST'):
      let addState = JSON.parse(JSON.stringify(state));
      let searchingID = null;
      let searchingIndex = null;
      for (let i in addState) {
        if (addState[i].id == action.payload.list_id) {
          searchingID = action.payload.list_id;
          searchingIndex = i;
          console.log('SUCCESS, FOUND');
          break;
        }
      }
      addState[searchingIndex].items = [
        ...addState[searchingIndex].items,
        {id: action.payload.id, title: action.payload.title},
      ];
      return addState;
    case constants.get('DELETE_LIST'):
      let newState = JSON.parse(JSON.stringify(state));
      for (let list in newState) {
        if (newState[list].id == action.payload) {
          newState.splice(list, 1);
          break;
        }
      }
      return newState;
    case constants.get('DELETE_ITEM'):
      newState = JSON.parse(JSON.stringify(state));
      for (let list in newState) {
        if (newState[list].id == action.payload.list_id) {
          for (let index in newState[list].items) {
            if (newState[list].items[index].id == action.payload.item_id) {
              newState[list].items.splice(index, 1);
              break;
            }
          }
        }
      }
      return newState;
  }
  return state;
}
