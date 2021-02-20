export interface BgRequest {
    from: "popup"|"content",
    type:string,
    data?:any;
}