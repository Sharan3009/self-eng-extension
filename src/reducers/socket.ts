import { ADD_BACKLOG, SEND } from '../actions/socket';
import { AUTHORIZATION } from '../constants/socket';
import { Action } from '../Interface/Action';
import { setTokenInStorage } from '../utils/helperFunctions';
/*
Reducer is currently not in use.
Check comment 1 in socket.action.js for explanation
*/
const initialState = {
  backlog: []
}
const reducer = (state = initialState, action:Action) => {
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
      case ADD_BACKLOG: {
        return {
          ...state,
          backlog : state.backlog.concat(action.payload)
        }
      }
      default: {
        return state;
      }
    }
  }

export default reducer;