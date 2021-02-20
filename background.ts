import { Action } from "./src/Interface/Action";
import {host, apiVersion} from "./src/config";
import socket from "./service/socket";
import { GOOGLE_LOGIN, EMIT } from "./src/constants/background";
chrome.runtime.onMessage.addListener((requestObj:Action, sender:chrome.runtime.MessageSender, sendMessage) => {

    let payload:any = requestObj.payload;

    socket.connect();

    switch (requestObj.type) {        

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
                                            chrome.storage.local.set({ [payload]: token });
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
            socket.emit(payload.type);
            return false;
        }
    }
});

export {}