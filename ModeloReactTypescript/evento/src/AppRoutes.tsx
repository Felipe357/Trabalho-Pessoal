import { BrowserRouter, Route, Routes } from "react-router-dom";
import Formulario from "./components/formulario-evento";
import HeaderTop from "./components/header-top";
import FormularioCadastro from "./components/formulario-cadastro";
import Eventos from "./components/Eventos";

function AppRoutes() {
    return (
        <BrowserRouter>
            <HeaderTop />
            <Routes>
                <Route path="/" element={<Eventos cra="008939" />} />
                <Route path="/formularioEvento" element={<Formulario />} />
                <Route path="/formularioCadastro" element={<FormularioCadastro cra="008939" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes





















