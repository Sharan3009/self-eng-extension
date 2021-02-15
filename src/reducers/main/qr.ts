import { GENERATE, CLEAR_INTERVAL, SET_INTERVAL } from "../../actions/main/qr";
import { Action } from "../../Interface/Action";
import { QrProps } from "../../Interface/Qr";

const initialState:QrProps = {
    qrObj:null,
    qrInterval:0
}

const reducer = (state:QrProps = initialState,action:Action):QrProps => {
    switch(action.type){

        case GENERATE:
            return {
                ...state,
                qrObj: action.payload
            };
        case CLEAR_INTERVAL:
            if(state.qrInterval){
                clearInterval(state.qrInterval);
            }
            return {
                ...state,
                qrInterval:0
            };
        case SET_INTERVAL:
            return {
                ...state,
                qrInterval: action.payload
            }
        default:
            return state;
    }
}
export default reducer;