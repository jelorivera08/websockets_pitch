import { socket } from './index';

const reducer = (
  state = {
    pot: 0,
    snackbarIsOpen: false,
    name: null,
    names: [],
    mode: null,
    whoDidIt: null
  },
  action
) => {
  switch (action.type) {
    case 'PITCH_IN':
      state = { ...state, pot: ++state.pot, mode: 'pitch' };
      socket && socket.emit('UPDATE_POT', state);
      break;
    case 'GET_ONE':
      state = { ...state, pot: --state.pot, mode: 'get' };
      socket && socket.emit('UPDATE_POT', state);
      break;
    case 'DELIVER_UPDATED_POT_TO_REDUCER':
      state = { ...state, pot: action.updatedPot.pot };
      break;
    case 'CURRENT_POT_TO_REDUCER':
      state = { ...state, pot: action.pot };
      break;
    case 'ASSIGNED_USERNAME':
      state = { ...state, name: action.name };
      break;
    case 'PUT_ALL_NAMES_TO_REDUCER':
      state = { ...state, names: action.names };
      break;
    case 'PICTHED_IN':
      state = {
        ...state,
        snackbarIsOpen: true,
        mode: 'pitch',
        whoDidIt: action.name
      };
      break;
    case 'GOT_ONE':
      state = {
        ...state,
        snackbarIsOpen: true,
        mode: 'get',
        whoDidIt: action.name
      };
      break;
    case 'ANOTHER_ONE_PITCHED_IN':
      state = { ...state, snackbarIsOpen: false };
      break;
    default:
      break;
  }

  return state;
};

export default reducer;
