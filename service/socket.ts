import { io, Socket } from 'socket.io-client';
import { host } from '../src/config';
import { SocketEvents } from '../src/Interface/Socket';
import { getAuthHeader, setTokenInStorage } from '../src/utils/helperFunctions';
import { Action } from "../src/Interface/Action";

class CustomSocket implements SocketEvents {

  private socket:Socket;
  private backlogs:Action[] = [];

  public connect = async ():Promise<any> => {
    if(this.isConnected()){
        return;
    }
    const headers:any = await getAuthHeader();
    this.socket = io(
      host,
      {
        extraHeaders:{
          ...headers
        }
      }
    );
    this.listenToAuthToken();
    this.on("connect",this.clearBacklog);
    this.on("connect_error",()=>{
      throw new Error("Connection was not established");
    })
  }

  public disconnect = ():void => {
    this.socket.disconnect();
  }

  public emit = (event:string, data?:any):void => {
      const action:Action = {
        type: event,
        payload: data
      }
      if (!this.isConnected()){
          this.backlogs.push(action);
          return;
      }

      this.socket.emit(event, data);
  }

  public on = (event:string, fun:Function):void => {
    // No promise is needed here, but we're expecting one in the middleware.
      this.socket.off(event).on(event, fun);
  }

  public isConnected = ():boolean => {
    return this.socket?.connected;
  }

  private listenToAuthToken = ():void => {
    this.on("authorization",(tokenObj:any)=>{
      setTokenInStorage(tokenObj)
    })
  }

  private clearBacklog = ():void => {
    while(this.backlogs.length>0){
      const backlog:Action = this.backlogs.shift() as Action;
      this.emit(backlog.type,backlog.payload);
    }
  }
}

export default new CustomSocket();