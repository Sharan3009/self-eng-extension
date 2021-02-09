import { Executor } from "../Interface/Executor";

class Storage {

    private watching:boolean=false;

    public get = <T,>(key:string):Promise<T> =>{
        return new Promise((resolve:Executor)=>{
            chrome.storage.local.get(key,(data)=>{
                resolve(data[key]);
            })
        })
    }

    public set = <T,>(key:string,data:T):Promise<any> => {
        return new Promise((resolve:Executor)=>{
            let dataToSet:{[key:string]:T} = {};
            dataToSet[key] = data;
            chrome.storage.local.set(dataToSet,()=>{
                resolve();
            })
        })
    }

    public remove = (keys:string|string[]):Promise<any> => {
        return new Promise((resolve:Executor)=>{
            chrome.storage.local.remove(keys,()=>{
                resolve();
            })
        })
    }

    public clear = ():Promise<any> => {
        return new Promise((resolve:Executor)=>{
            chrome.storage.local.clear(()=>{
                resolve();
            })
        })
    }

    public getAll = ():Promise<any> =>{
        return new Promise((resolve:Executor)=>{
            chrome.storage.local.get(null,(data)=>{
                resolve(data);
            })
        })
    }

    public watchStorageKey = (key:string,cb:(values:chrome.storage.StorageChange)=>void) => {
        if(!this.watching){
            chrome.storage.onChanged.addListener((changes:{[key:string]:chrome.storage.StorageChange}) => {
                cb(changes[key] || {});
            })
            this.watching = true;
        }
    }

}

export default new Storage();