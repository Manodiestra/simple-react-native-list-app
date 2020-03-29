import Constants from './constants';

export const constants = new Constants({
  CREATE_LIST: 'CREATE_LIST',
  GET_LISTS: 'GET_LISTS',
  GET_LISTS_DONE: 'GET_LISTS_DONE',
  DELETE_LIST: 'DELETE_LIST',
  UPDATE_LIST: 'UPDATE_LIST',
});

export const createList = (title, selectedIcon) => ({
  type: constants.get('CREATE_LIST'),
  payload: {
    title,
    selectedIcon,
  },
});

export const updateList = payload => ({
  type: constants.get('UPDATE_LIST'),
  payload: payload,
});

export const getLists = () => ({
  type: constants.get('GET_LISTS'),
});

export const deleteList = payload => ({
  type: constants.get('DELETE_LIST'),
  payload: payload,
});
