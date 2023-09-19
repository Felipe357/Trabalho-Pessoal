import "./style.css"

import User from "../../assets/images/do-utilizador.png"
import Rede from "../../assets/images/rede.png"
import Sino from "../../assets/images/sino.png"

function HeaderTop() {
    return (
        <header>
            <div className="rede">
                <img id="header-img" src={Rede} alt="Menu Aplicações" />

                </div>
            <div className="sino">
                <img id="header-img" src={Sino} alt="Notificações" />
                </div>
            <div className="colaborador">
                <img id="header-img-col" src={User} alt="Usuário" />
                <span id="nome-col">Felipe</span>
            </div>
        </header>
    )
}

export default HeaderTop