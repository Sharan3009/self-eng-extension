import React from "react";
import { Link } from "react-router-dom";

const Skip = () =>{
    return <div className="text-center small pt-4">
        <u><Link to="home" className="text-muted">Skip</Link></u>
    </div>
}

export default Skip;