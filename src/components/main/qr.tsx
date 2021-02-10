import { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { generateQr } from "../../actions/main/qr";
import { QrProps } from "../../Interface/Qr";
import { Response } from "../../Interface/Response";
import Error from "../shared/error";

class Qr extends Component<any>{

    componentDidMount(){
        this.getNewQr();
    }

    private getNewQr = ():void => {
        this.props.dispatch(generateQr());
    }

    render(){
        const { qrObj } = this.props;
        return <div>
            <div className="mt-2 text-center">
                <img src={qrObj?.data} alt="" height="250" width="250"/>
            </div>
            <Error msg={qrObj?.message} />
        </div>
    }
}

type S2P = {
    qr:QrProps
}
const mapStateToProps = ({qr}:S2P) => {
     const {qrObj} = qr;
     return {
        qrObj
     };
  }

export default compose(
    connect<QrProps,{},{},S2P>(mapStateToProps)
)(Qr);