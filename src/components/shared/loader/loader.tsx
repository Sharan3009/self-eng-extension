import React from "react";
import style from "./loader.module.scss";

const Loader = ({isLoader}:{isLoader:boolean}) => {
    return (isLoader)?
        <div className={`${style.spinner_bg} d-flex align-items-center justify-content-center`}>
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        :null
}

export default Loader;