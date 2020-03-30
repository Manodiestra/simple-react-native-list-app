import Constants from './constants';

export const constants = new Constants({
  CREATE_LIST: 'CREATE_LIST',
  GET_LISTS: 'GET_LISTS',
  GET_LISTS_DONE: 'GET_LISTS_DONE',
  DELETE_LIST: 'DELETE_LIST',
  ADD_TO_LIST: 'ADD_TO_LIST',
  DELETE_ITEM: 'DELETE_ITEM',
});

export const createList = payload => ({
  type: constants.get('CREATE_LIST'),
  payload: payload,
});

export const addToList = payload => ({
  type: constants.get('ADD_TO_LIST'),
  payload: payload,
});

export const getLists = () => ({
  type: constants.get('GET_LISTS'),
});

export const deleteList = payload => ({
  type: constants.get('DELETE_LIST'),
  payload: payload,
});

export const deleteItem = payload => ({
  type: constants.get('DELETE_ITEM'),
  payload: payload,
});
