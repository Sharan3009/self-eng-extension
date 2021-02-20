import $ from "jquery";
class ContentScript {
    private selection:string="";
    constructor(){
        this.init();
    }

    private init = ():void => {
        this.addBodyDbClickEvent();
    }

    private addBodyDbClickEvent = ():void => {
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
        let offset = $(e.target).offset();
        // $("body").append(`<div style="position:fixed;top:0px;left:0px;right:0px;bottom:0px;z-index:999;"></div>`)
        // let html:string = $(e.target).html();
        // $(e.target).html(html.replace(this.selection,"haha"))
    }
}
export default new ContentScript();