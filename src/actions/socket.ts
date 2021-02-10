import { Socket } from "socket.io-client";

export const SEND:string = 'SOCKET_SEND';
export const SEND_SUCCESS:string = 'SOCKET_SEND_SUCCESS';
export const SEND_FAIL:string = 'SOCKET_SEND_FAIL';

const TYPE = {
  type : 'socket',
  /*
  Comment 1: 
  keeping this types as it is.
  It may be needed when backend changes are implemented and status of loader, sent data or received callback needs to be implemented.
  Otherwise these are not in use right now
  */
  types:[SEND, SEND_SUCCESS, SEND_FAIL]
}


export const socketConnect = () => {
  return {
    ...TYPE,
    promise: (socket:Socket)=>socket.connect()
  }
}

export const socketDisconnect = () => {
  return {
    ...TYPE,
    promise: (socket:Socket)=>socket.disconnect()
  }
}

export const socketOn = (event:string,cb:Function) => {
  return {
    ...TYPE,
    promise: (socket:Socket)=>socket.on(event,cb)
  }
}

export const socketEmit = (event:string, data:any)  => {
    return {
      ...TYPE,
      promise: (socket:Socket) => socket.emit(event, data),
    }
}