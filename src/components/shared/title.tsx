import React from "react";

type TitleProps = {
    text: string,
  }
  
const Title = ({ text }: TitleProps):JSX.Element => {
  return (
    <h6 className="pb-2">
      {text}
    </h6>
  )
}

export default Title;