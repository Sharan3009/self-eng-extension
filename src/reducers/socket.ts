import { SEND } from '../actions/socket';
import Storage from '../Class/Storage';
import { AUTHORIZATION } from '../constants/socket';
import { Action } from '../Interface/Action';
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
        for(let key in action.payload){
          Storage.set(key,action.payload[key]);
        }
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