import { io, Socket } from 'socket.io-client';
import { SocketEvents } from '../Interface/Socket';
import { getExtraHeaders } from '../utils/network';

// Example conf. You can move this to your config file.
const host:string = process.env.REACT_APP_DOMAIN as string;

class CustomSocket implements SocketEvents {

  private socket:Socket;

  constructor(){
    this.connect();
  }

  private connect = async ():Promise<any> => {
    this.socket = await io(
      host,
      {
        extraHeaders: await getExtraHeaders()
      }
    )
  }

  public disconnect = ():Promise<any> => {
    this.socket.disconnect();
    return Promise.resolve();
  }

  public emit = (event:string, data:any):Promise<any> => {
    return new Promise((resolve, reject) => {
      if (this.socket.disconnected) return reject('No socket connection.');

      return this.socket.emit(event, data, (response:any) => {
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
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');

      this.socket.on(event, fun);
      resolve(true);
    });
  }
}

export default new CustomSocket();