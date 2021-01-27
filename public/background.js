chrome.runtime.onMessage.addListener(function (requestObj, sender, sendMessage) {

    let payload = requestObj.payload;

    switch (requestObj.type) {        

        case "google": {
            let popupWidth = 460;
            let popupHeight=560;
            chrome.windows.create({ url: "http://localhost:3000/api/v1/google/auth", type: "popup",
             width: popupWidth, height:popupHeight, 
             top:screen.height/2-popupHeight/2, 
             left:screen.width/2-popupWidth/2 }, (window) => {
                chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
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

    }
});