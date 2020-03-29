import UUID from 'uuid-js';

export default (store) => (next) => (action) => {
  if (action.payload && action.payload.id == undefined) {
    console.log('NEW ID MADE');
    action.payload.id = UUID.create().toString();
  }
  const result = next(action);
  return result;
};
