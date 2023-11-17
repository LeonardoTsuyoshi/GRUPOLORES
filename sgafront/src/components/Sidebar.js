import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faHome, faBuilding, faTags, faUsers, faDesktop } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
    return (
        <aside>
            <ul>
                <li>
                    <Link to="/home">
                        <FontAwesomeIcon icon={faHome} /> Home
                    </Link>
                </li>
            <li>
                <Link to="/ambientes">
                    <FontAwesomeIcon icon={faBuilding} /> Ambientes
                </Link>
            </li>
            <li>
                <Link to="/categorias">
                    <FontAwesomeIcon icon={faTags} /> Categorias
                </Link>
            </li>
            <li>
                <Link to="/usuarios">
                    <FontAwesomeIcon icon={faUsers} /> Usuários
                </Link>
            </li>
            <li>
                <Link to="/ativos">
                    <FontAwesomeIcon icon={faDesktop} /> Ativos
                </Link>
            </li>
            </ul>
        </aside>
    );
}

export default Sidebar;