import { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { Dispatch } from "react";
import { SocketAction, SocketEvents } from "../Interface/Socket";
import { CHANNELS } from "../constants/socket";
import { Response } from "../Interface/Response";

const socketMiddleware = (socket:SocketEvents):Middleware => {
  // Socket param is the client. We'll show how to set this up later.
  return ({dispatch, getState}:MiddlewareAPI) => (next:Dispatch<AnyAction>) => {
    
    socket.connect()
    .then(()=>{
      subscribeToChannels(socket,dispatch);
    })

    return (action:SocketAction|Function) => {

      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      
      /*
      * Socket middleware usage.
      * promise: (socket) => socket.emit('MESSAGE', 'hello world!')
      * type: always 'socket'
      * types: [REQUEST, SUCCESS, FAILURE]
      */
      const { promise, type, types, ...rest } = action;
  
      if (type !== "socket" || !promise) {
        // Move on! Not a socket request or a badly formed one.
        return next(action);
      }

      /*
      REQUEST, SUCCESS, FAILURE are currently not in use.
      Check comment 1 in socket.action.js for explanation
      */
      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
      return promise(socket)
      .then((result:any) => {
        return next({...rest, result, type: SUCCESS });
      })
      .catch((error:any) => {
        return next({...rest, error, type: FAILURE });
      })
    }
  };
}

const subscribeToChannels = (socket:SocketEvents, dispatch:Dispatch<AnyAction>) => {
    CHANNELS.forEach(async (channel:string)=>{
      socket.on(channel,(resp:Response<any>)=>{
        dispatch({
          type:channel,
          payload: resp
        })
      })
    })
}

export default socketMiddleware;
