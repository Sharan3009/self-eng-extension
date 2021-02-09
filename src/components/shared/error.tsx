import React from "react";

const Error = ({msg}:{msg:string}) => {
    return (msg)?
        <div className="text-danger text-center w-100 small">
            {msg}
        </div>
        :null
}

export default Error;