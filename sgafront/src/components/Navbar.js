import React from "react";
import logo from "../imagens/logo.png";

function NavBar () {
    return (
        <nav>
            <div className="logo">
                <img src={logo} alt="Logo" />
                <a href="#"> SGA - Sistema de Gerenciamento de Ativos</a>
            </div>
        </nav>       
    );
}

export default NavBar;