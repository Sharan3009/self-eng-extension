export interface SocketEvents {
    connect: ()=>Promise<any>,
    disconnect: ()=>void,
    on: (event:string,data:any)=>void,
    emit: (event:string,data:any)=>void,
    isConnected: ()=>boolean
}