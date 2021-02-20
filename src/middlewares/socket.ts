import { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { Dispatch } from "react";
import { CHANNELS } from "../constants/socket";
import { Action } from "../Interface/Action";
import { BgRequest } from "../Interface/Background";
import { socketOn } from "../utils/helperFunctions";
import { ON } from "../constants/background"

const socketMiddleware = (): Middleware => {
    // Socket param is the client. We'll show how to set this up later.
    return ({ dispatch, getState }: MiddlewareAPI) => {
        CHANNELS.forEach((channel) => {
            socketOn(ON, channel)
        });
        chrome.runtime.onMessage.addListener((requestObj: BgRequest, sender: chrome.runtime.MessageSender, sendResponse) => {
            const { from } = requestObj;
            if (from === "popup") {
                return;
            }
            const { type, data } = requestObj;
            const action: Action = {
                type,
                payload: data
            }
            dispatch(action);
        })
        return (next: Dispatch<AnyAction>) => (action: any) => {
            next(action);
        }
    }
}

export default socketMiddleware;
