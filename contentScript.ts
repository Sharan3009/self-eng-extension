import $ from "jquery";
import "bootstrap";
import { BgRequest } from "./src/Interface/Background";
class ContentScript {
    private selection:string="";
    constructor(){
        this.init();
    }

    private init = ():void => {
        const msg:BgRequest = {
            type:"ON",
            data:"GET_MEANING"
        }
        chrome.runtime.sendMessage(msg);
        chrome.runtime.onMessage.addListener((requestObj:BgRequest, sender:chrome.runtime.MessageSender, sendResponse) => {
            if(requestObj.from!=="background"){
                return;
            }
            console.log(requestObj)
        })
        this.addBodyDbClickEvent();
    }

    private addBodyDbClickEvent = ():void => {
        $("body").on("click",(e:JQuery.ClickEvent)=>{
            ($(".example-popover") as any).popover("hide");
        })
        $("body").on("dblclick",(e:JQuery.DoubleClickEvent)=>{
            const selection:string|undefined = window.getSelection()?.toString()?.trim();
            if(selection){
                this.selection = selection;
                this.addPopup(e);
            }
        })
    }

    private addPopup = (e:JQuery.DoubleClickEvent):void => {
        this.addDivLayer(e);
    }

    private addDivLayer = (e:JQuery.DoubleClickEvent):void => {
        let offset = $(e.currentTarget).offset();
        $("body").append(`<div style="position:absolute;left:${e.pageX-offset.left}px;top:${e.pageY-offset.top}px;" data-placement="top" class="example-popover" data-content="${this.selection}"></div>`);
        ($('.example-popover') as any).popover("show");
        const msg:BgRequest = {
            type:"EMIT",
            data:{
                type:"GET_MEANING",
                payload:this.selection
            }
        }
        chrome.runtime.sendMessage(msg);
    }
}
export default new ContentScript();