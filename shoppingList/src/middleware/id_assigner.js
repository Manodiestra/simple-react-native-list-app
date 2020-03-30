import UUID from 'uuid-js';
import { constants } from '../actions/listActions';

export default (store) => (next) => (action) => {
  if (
    (action.payload && action.payload.id == undefined) ||
    action.type == constants.get('ADD_TO_LIST')
  ) {
    console.log('NEW ID MADE');
    action.payload.id = UUID.create().toString();
  }
  const result = next(action);
  return result;
};
