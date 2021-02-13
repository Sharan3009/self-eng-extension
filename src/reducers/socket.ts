import { SEND } from '../actions/socket';
import { AUTHORIZATION } from '../constants/socket';
import { Action } from '../Interface/Action';
import { setTokenInStorage } from '../utils/helperFunctions';
/*
Reducer is currently not in use.
Check comment 1 in socket.action.js for explanation
*/
const reducer = (state = {}, action:Action) => {
    switch(action.type) {
      case SEND: {
        return {
          ...state,
          isSending: true,
        };
      }
      case AUTHORIZATION : {
        setTokenInStorage(action.payload);
        return {
          ...state
        }
      }
      default: {
        return state;
      }
    }
  }

export default reducer;