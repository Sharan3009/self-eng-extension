import { GENERATE } from "../../actions/main/qr";
import { Action } from "../../Interface/Action";
import { QrProps } from "../../Interface/Qr";

const initialState:QrProps = {
    qrObj:null
}

const reducer = (state:QrProps = initialState,action:Action):QrProps => {
    switch(action.type){

        case GENERATE:
            return {
                ...state,
                qrObj: action.payload
            };
        default:
            return state;
    }
}
export default reducer;