import { SEND } from '../actions/socket';
/*
Reducer is currently not in use.
Check comment 1 in socket.action.js for explanation
*/
const reducer = (state = {}, action:any) => {
    switch(action.type) {
      case SEND: {
        return {
          ...state,
          isSending: true,
        };
      }
      default: {
        return state;
      }
    }
  }

export default reducer;