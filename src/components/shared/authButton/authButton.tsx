import React from "react";
import styles from "./authButton.module.scss";
  
type AuthButtonProps = {
  text:string,
  onClick?: (event:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>void
}

const AuthButton = ({text, onClick}:AuthButtonProps):JSX.Element => {
  return (
    <button onClick={onClick} className={`btn ${styles.auth_btn} btn-primary p-0 d-flex align-items-center justify-content-center wpx-240`}>
          {text}
    </button>
  )
}

export default AuthButton;