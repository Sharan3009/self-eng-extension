import React, { Component } from "react";
import Title from "../shared/title";
import ToggleSwitch from "../shared/toggleSwitch";

class Settings extends Component{

    render(){
        return (
            <>
            <div className="border-bottom pb-2">
                <Title text="Popup" />
                <ToggleSwitch heading="Definition"/>
                <ToggleSwitch heading="Translation"/>
            </div>
            </>
        )
    }
}

export default Settings;