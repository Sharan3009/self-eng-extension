import { SocketAction, SocketActionType, SocketEvents } from "../Interface/Socket";

export const SEND:string = 'SOCKET_SEND';
export const SEND_SUCCESS:string = 'SOCKET_SEND_SUCCESS';
export const SEND_FAIL:string = 'SOCKET_SEND_FAIL';

const TYPE:SocketActionType = {
  type : "socket",
  /*
  Comment 1: 
  keeping this types as it is.
  It may be needed when backend changes are implemented and status of loader, sent data or received callback needs to be implemented.
  Otherwise these are not in use right now
  */
  types:[SEND, SEND_SUCCESS, SEND_FAIL]
}


export const socketDisconnect = ():SocketAction => {
  return {
    ...TYPE,
    promise: (socket:SocketEvents)=>socket.disconnect()
  }
}

export const socketOn = (event:string,cb:Function):SocketAction => {
  return {
    ...TYPE,
    promise: (socket:SocketEvents)=>socket.on(event,cb)
  }
}

export const socketEmit = (event:string, data?:any):SocketAction  => {
    return {
      ...TYPE,
      promise: (socket:SocketEvents) => socket.emit(event, data),
    }
}