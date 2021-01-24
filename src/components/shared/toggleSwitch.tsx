import React from "react";
import Switch from '@material-ui/core/Switch';

type SwitchProps = {
    heading: string,
    onChange?: ()=>{}
  }
  
const ToggleSwitch = ({ heading,onChange }: SwitchProps):JSX.Element => {
  return (
    <div className="d-flex align-items-center">
        <div>
            {heading}
        </div>
        <div className="ml-auto">
            <Switch
                onChange={onChange}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </div>
    </div>
  )
}

export default ToggleSwitch;