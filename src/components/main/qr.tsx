import { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { clearInterval, GENERATE, setQrInterval } from "../../actions/main/qr";
import { socketEmit } from "../../actions/socket";
import { qrInterval } from "../../config";
import { QrProps } from "../../Interface/Qr";
import Error from "../shared/error";

class Qr extends Component<any>{

    componentDidMount(){
        this.generateQr();
        this.generateQrAtIntervals()
    }

    componentWillUnmount(){
        this.props.dispatch(clearInterval());
    }

    private generateQrAtIntervals = () => {
        const interval:number = window.setInterval(()=>{
            this.generateQr();
        },qrInterval)
        this.props.dispatch(setQrInterval(interval))
    }

    private generateQr = () =>{
        this.props.dispatch(socketEmit(GENERATE));
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
     const {qrObj, qrInterval} = qr;
     return {
        qrObj, qrInterval
     };
  }

export default compose(
    connect<QrProps,{},{},S2P>(mapStateToProps)
)(Qr);