import React from "react";
import styles from "./authButton.module.scss";
  
type AuthButtonProps = {
  text:string,
  onClick?: (event:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>void,
  color?:string
}

const AuthButton = ({text, onClick, color="btn-primary"}:AuthButtonProps):JSX.Element => {
  return (
    <button onClick={onClick} className={`btn ${styles.auth_btn} ${color} p-0 d-flex align-items-center justify-content-center wpx-240`}>
          {text}
    </button>
  )
}

export default AuthButton;