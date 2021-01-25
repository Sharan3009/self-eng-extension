import React from "react";
import styles from "./googleButton.module.scss";
  
const GoogleButton = ():JSX.Element => {
  return (
    <button className={`btn ${styles.google_btn} btn-primary p-0 d-flex wpx-240`}>
          <div className={`bg-white ${styles.google_icon_bg} rounded-left d-flex align-items-center justify-content-center h-100`}>
            <img src="/images/svg/google_icon.svg" alt="Google icon"/>
          </div>
          <div className={`d-flex align-items-center justify-content-center col px-2 h-100 ${styles.google_btn_txt}`}>
            Sign in with Google
          </div>
    </button>
  )
}

export default GoogleButton;