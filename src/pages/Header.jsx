import React from "react";

function Header(){
    return (
        <div className="header">
            <div className="logo">Keeper</div>
            <div className="rightlogo">Hello! <span>{localStorage.getItem("username")}</span></div>
        </div>
    )
}

export default Header;