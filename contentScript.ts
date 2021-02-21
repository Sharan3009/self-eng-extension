import $ from "jquery";
import "bootstrap";
import { BgRequest } from "./src/Interface/Background";
import { EMIT, ON } from "./src/constants/background";
import { Response } from "./src/Interface/Response";
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
        this.addWhiteListPopover();
        this.listenToSocket();
        this.closePopupOnBodyClick();
        this.openPopupOnBodyDblClick();
    }

    private addWhiteListPopover = ():void => {
        ($.fn as any).tooltip.Constructor.Default.whiteList['*'].push('style')
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
            this.updatePopup(requestObj.data);
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

    private updatePopup = (obj:Response<any>):void => {
        if(obj.status==="success"){
            this.updatePopupSuccess(obj.data)
        } else {
            this.updatePopupError(obj.message);
        }
    }

    private updatePopupError = (err:string):void => {
        $(this.popoverIdSelector)
        .attr("data-content",this.getPopupErrHtml(err))
        .data("bs.popover")
        .setContent();
    }

    private updatePopupSuccess = (data:any):void => {
        $(this.popoverIdSelector)
        .attr("data-content",this.getPopupSuccessHtml(data))
        .data("bs.popover")
        .setContent();
    }

    private addPopup = ():void => {
        this.appendUniquelyToBody();
        this.emitGetMeaning();
    }

    private appendUniquelyToBody = ():void => {
        const html:string = this.getPopupHtml();
        this.removePopup();
        this.bodyEle.append(html);
        this.togglePopup(true);
    }

    private removePopup = ():void => {
        $(this.popoverIdSelector).remove();
    }

    private togglePopup = (show:boolean):void => {
        ($(this.popoverIdSelector) as any)
        .popover({
            html:true
        })
        .popover(show?"show":"hide");
    }

    private getPopupErrHtml = (err:string): string => {
        return `<div>
                    <h3>Error occured</h3>
                    <p>${err || "Something went wrong"}</p>
                </div>`
    }

    private getPopupSuccessHtml = (data:any): string => {
        return `<div>
                    <h3>${data.title}</h3>
                    <p>${data.meanings[0].definitions[0].meaning}</p>
                </div>`
    }

    private getPopupHtml = ():string => {
        let html:string = "";
        const offset:JQuery.Coordinates|undefined = $(this.event.currentTarget).offset();
        if(offset){
            const {pageX,pageY} = this.event;
            const {top,left} = offset;
            html=`<div id="${this.popoverId}" 
            style="position:absolute;
            left:${pageX-left}px;
            top:${pageY-top}px;" 
            data-placement="top" 
            data-content='${this.getLoader()}'>
            </div>`;
        }
        return html;
    }

    private getLoader = ():string => {
        const dimension:number = 100;
        return `
        <div class="injected-bootstrap">
            <div class="d-flex align-items-center justify-content-center"
            style="height:${dimension}px;width:${dimension}px;">
                <div class="spinner-grow text-primary" role="status">
                <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>`
    }
}
export default new ContentScript();