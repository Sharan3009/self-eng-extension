import React from "react";

const Error = ({msg,error=true}:{msg:string,error?:boolean}) => {
    return (msg)?
        <div className={`${(error)?"text-danger":"text-success"} text-center w-100 small`}>
            {msg}
        </div>
        :null
}

export default Error;