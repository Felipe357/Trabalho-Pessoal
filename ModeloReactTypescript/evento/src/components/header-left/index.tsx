import React from "react";
import "./style.css";

import Logo from "../../assets/images/logo_tv_folhas.png"
import Interrogacao from "../../assets/images/ponto-de-interrogacao.png"
import Calendario from "../../assets/images/calendario.png"
import Close from "../../assets/images/fechar.png"

function HeaderLeft() {
    return (
        <div className="menu-lateral">
            <div className="title">
                <div className="title-left">
                    <img src={Logo} alt="Logo Terra Viva" />
                        <span>MEGTV</span>
                </div>
                <button className="fechar">
                    <img src={Close} alt="Fechar" />
                </button>
            </div>
            <div className="menu">
                <div className="btn-menu">
                    <div className="icon">
                        <img src={Interrogacao} alt="icon" />
                    </div>
                    <span id="span-menu">inicio</span>
                </div>
                <div className="btn-menu">
                    <div className="icon">
                        <img src={Interrogacao} alt="icon" />
                    </div>
                    <span id="span-menu">Avaliaçoes</span>
                </div>
                <div className="btn-menu">
                    <div className="icon">
                        <img src={Interrogacao} alt="icon" />
                    </div>
                    <span id="span-menu">Aplicativos</span>
                </div>
                <div className="btn-menu btn-menu-select">
                    <div className="icon">
                        <img src={Calendario} alt="icon" />
                    </div>
                    <span id="span-menu" className="s">Eventos</span>
                </div>
            </div>
            <div className="menu">
                <span id="title-UGB">UGB</span>
                <div className="btn-menu">
                    <div className="icon">
                        <img src={Interrogacao} alt="icon" />
                    </div>
                    <span id="span-menu">Minha UGB</span>
                </div>
                <div className="btn-menu">
                    <div className="icon">
                        <img src={Interrogacao} alt="icon" />
                    </div>
                    <span id="span-menu">Indicadores</span>
                </div>
                <div className="btn-menu">
                    <div className="icon">
                        <img src={Interrogacao} alt="icon" />
                    </div>
                    <span id="span-menu">Sugestao de melhoria</span>
                </div>
            </div>
        </div>
    )
}

export default HeaderLeft