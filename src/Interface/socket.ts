export interface SocketActionType {
    type: "socket",
    types: Array<string>
}

export interface SocketAction extends SocketActionType{
    promise: (socket:SocketEvents)=>Promise<any>
}

export interface SocketEvents {
    connect: (cb:Function)=>Promise<any>,
    disconnect: ()=>Promise<any>,
    on: (event:string,data:any)=>Promise<any>,
    emit: (event:string,data:any)=>Promise<any>,
    isConnected: ()=>boolean
}