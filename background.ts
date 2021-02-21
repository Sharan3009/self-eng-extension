import { Action } from "./src/Interface/Action";
import { BgRequest } from "./src/Interface/Background";
import {host, apiVersion} from "./src/config";
import socket from "./service/socket";
import { GOOGLE_LOGIN, EMIT, ON } from "./src/constants/background";
import { Response } from "./src/Interface/Response";
chrome.runtime.onMessage.addListener(async (requestObj:BgRequest, sender:chrome.runtime.MessageSender, sendResponse) => {

    const { from } = requestObj;
    if(from==="background"){
        return;
    }

    const { type, data } = requestObj;

    await socket.connect();

    switch (type) {        

        case GOOGLE_LOGIN: {
            let popupWidth:number = 460;
            let popupHeight:number=560;
            chrome.windows.create({ url: `${host}${apiVersion}google/auth`, type: "popup",
             width: popupWidth, height:popupHeight, 
             top:screen.height/2-popupHeight/2, 
             left:screen.width/2-popupWidth/2 }, (window) => {
                chrome.tabs.onUpdated.addListener(function listener(tabId:number, changeInfo, tab:chrome.tabs.Tab) {
                    if (window?.tabs && tabId === window?.tabs[0].id) {
                        if (tab.status === "complete" && tab.title) {
                            let [code, status, token] = tab.title.split(" - ");
                            if (code === "custom_msg") {
                                switch (status) {
                                    case "success":
                                        if (token) {
                                            chrome.tabs.remove(tabId);
                                            chrome.tabs.onUpdated.removeListener(listener);
                                            chrome.storage.local.set({ [data]: token });
                                        }
                                        break;
                                    default:
                                    // do nothing
                                }
                            }
                        }
                    }
                })
            })
            return false;
        }
        case EMIT: {
            const { type, payload } = data;
            socket.emit(type,payload);
            return false;
        }
        case ON: {
            socket.on(data,(payload:Response<any>)=>{
                sendMessage(data,payload);
            });
            return false;
        }
    }
});

const sendMessage = (type:string,data:any) => {
    const req:BgRequest = {
        from: "background",
        type,
        data
    }
    chrome.runtime.sendMessage(req);
    chrome.tabs.query({active: true, currentWindow: true}, (tabs:chrome.tabs.Tab[])=>{
        let myTabId:number = tabs[0].id;
        chrome.tabs.sendMessage(myTabId, req);
    });
}

export {}