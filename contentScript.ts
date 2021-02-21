import $ from "jquery";
import "bootstrap";
class ContentScript {
    private selection:string="";
    constructor(){
        this.init();
    }

    private init = ():void => {
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
        console.log(e.pageY,offset.top)
        $("body").append(`<div style="position:absolute;left:${e.pageX-offset.left}px;top:${e.pageY-offset.top}px;" data-placement="top" class="example-popover" data-content="${this.selection}"></div>`);
        ($('.example-popover') as any).popover("show")
    }
}
export default new ContentScript();