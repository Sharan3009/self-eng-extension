import storage from "./Storage";
class GoogleSSO {

    public init = ():void => {
        chrome.windows.create({url:"http://localhost:3000/api/v1/google/auth",type:"popup"},(window?:chrome.windows.Window)=>{
            chrome.tabs.onUpdated.addListener(function listener(tabId:number, changeInfo:chrome.tabs.TabChangeInfo,tab:chrome.tabs.Tab){
                if(window?.tabs && tabId===window?.tabs[0].id){
                    if(tab.status==="complete" && tab.title){
                        let [code,status,token] = tab.title.split(" - ");
                        if(code==="custom_msg"){
                            switch(status){
                                case "success":
                                    if(token){
                                        chrome.tabs.remove(tabId);
                                        chrome.tabs.onUpdated.removeListener(listener);
                                        storage.set("authToken",token)
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
    }
}

export default new GoogleSSO();