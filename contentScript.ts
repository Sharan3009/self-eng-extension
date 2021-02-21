import $ from "jquery";
import "bootstrap";
import { BgRequest } from "./src/Interface/Background";
import { EMIT, ON } from "./src/constants/background";
class ContentScript {
    private selection:string="";
    private popoverId:string = "examplePopover";
    private popoverIdSelector:string = "#"+this.popoverId;
    private bodyEle:JQuery = $("body");
    private getMeaning:string = "GET_MEANING";
    private event:JQuery.DoubleClickEvent;
    constructor(){
        this.init();
    }

    private init = ():void => {
        this.listenToSocket();
        this.closePopupOnBodyClick();
        this.openPopupOnBodyDblClick();
    }

    private listenToSocket = ():void => {
        const msg:BgRequest = {
            type:ON,
            data:this.getMeaning
        }
        chrome.runtime.sendMessage(msg);
        chrome.runtime.onMessage.addListener((requestObj:BgRequest, sender:chrome.runtime.MessageSender, sendResponse) => {
            if(requestObj.from!=="background"){
                return;
            }
            console.log(requestObj)
        })
    }

    private emitGetMeaning = () => {
        const msg:BgRequest = {
            type:EMIT,
            data:{
                type:this.getMeaning,
                payload:this.selection
            }
        }
        chrome.runtime.sendMessage(msg);
    }

    private closePopupOnBodyClick = ():void => {
        this.bodyEle.on("click",(e:JQuery.ClickEvent)=>{
            this.togglePopup(false);
        })
    }

    private openPopupOnBodyDblClick = ():void => {
        this.bodyEle.on("dblclick",(e:JQuery.DoubleClickEvent)=>{
            this.event = e;
            const selection:string = this.getSelection();
            if(selection){
                this.selection = selection;
                this.addPopup();
            }
        })
    }

    private getSelection = ():string => {
        let returnVal:string = "";
        const selection:string|undefined = window.getSelection()?.toString()?.trim();
        if(selection){
            returnVal = selection;
        }
        return returnVal;

    }

    private addPopup = ():void => {
        this.appendUniquelyToBody();
        this.emitGetMeaning();
    }

    private appendUniquelyToBody = ():void => {
        const html:string = this.getPopupHtml();
        if(this.ifPopupExists()){
            
        } else {
            this.bodyEle.append(html);
        }
        this.togglePopup(true);
    }

    private ifPopupExists = ():boolean => {
        return $(this.popoverIdSelector).length===1;
    }

    private togglePopup = (show:boolean):void => {
        ($(this.popoverIdSelector) as any).popover(show?"show":"hide");
    }

    private getPopupHtml = ():string => {
        let html:string = "";
        const offset:JQuery.Coordinates|undefined = $(this.event.currentTarget).offset();
        if(offset){
            const {top,left} = offset;
            html=`<div id="${this.popoverId}" style="position:absolute;
            left:${this.event.pageX-offset.left}px;
            top:${this.event.pageY-offset.top}px;" 
            data-placement="top" 
            data-content="${this.selection}">
            </div>`;
        }
        return html;
    }
}
export default new ContentScript();