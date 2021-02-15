import { io, Socket } from 'socket.io-client';
import { ADD_BACKLOG } from '../actions/socket';
import { host } from '../config';
import { Action } from '../Interface/Action';
import { Executor } from '../Interface/Executor';
import { SocketEvents } from '../Interface/Socket';
import { getAuthHeader } from '../utils/helperFunctions';

class CustomSocket implements SocketEvents {

  private socket:Socket;

  public connect = async (cb:Function):Promise<any> => {
    const headers:any = await getAuthHeader();
    this.socket = io(
      host,
      {
        extraHeaders:{
          ...headers
        }
      }
    );
    this.socket.on("connect",cb);
    this.socket.on("connect_error",()=>{
      throw new Error("Connection interrupted");
    })
  }

  public disconnect = ():Promise<any> => {
    this.socket.disconnect();
    return Promise.resolve();
  }

  public emit = (event:string, data:any):Promise<any> => {
    return new Promise((resolve, reject) => {
      const action:Action = {
        type: event,
        payload: data
      }
      const dispatchAction:Action = {
        type: ADD_BACKLOG,
        payload:action
      }
      if (!this.socket || this.socket.disconnected) return reject(dispatchAction);

      this.socket.emit(event, data, (response:any) => {
        // Response is the optional callback that you can use with socket.io in every request. See 1 above.
        if (response.error) {
          return reject(response.error);
        }

        resolve(response);
      });
    });
  }

  public on = (event:string, fun:Function):Promise<any> => {
    // No promise is needed here, but we're expecting one in the middleware.
    return new Promise((resolve) => {
      this.socket.off(event).on(event, fun);
      resolve(true);
    });
  }

  public isConnected = ():boolean => {
    return this.socket?.connected;
  }
}

export default new CustomSocket();