"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Navigation } from "@/components/navigation";

import Teste from "../assets/download.png";

export type EventoProp = {
  id: string;
  img: any;
  titulo: string;
  data: string;
  hora: string;
  local: string;
  descricao: string;
  dataFormularioInicio: string;
  dataFormularioFim: string;
  confirm: boolean;
  tipoConvidado: number;
  idadeDependente: number;
  situacao: number;
};

const eventosTeste: EventoProp[] = [
  {
    id: "123456",
    img: Teste,
    titulo: "Evento Não Confirmado Somente Colaborador",
    data: "05/05/2024",
    hora: "10:00",
    local: "Praça Central, Centro, Primavera do Leste",
    descricao:
      "Venha conferir a diversidade de artesanatos locais, comidas típicas e apresentações culturais.",
    dataFormularioInicio: "01/04/2024",
    dataFormularioFim: "25/04/2024",
    confirm: false,
    tipoConvidado: 1,
    idadeDependente: 0,
    situacao: 1,
  },
];

interface InicialContextProps {
  evento: EventoProp[];
}

export const InicialContext = React.createContext({} as InicialContextProps);

const AppProvider = ({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement => {
  const [open, setOpen] = React.useState(false);

  const [maxLength, setMaxLength] = React.useState(true);

  React.useEffect(() => {
    const updateMaxLength = () => {
      setMaxLength(window.innerWidth < 768 ? false : true);
    };

    updateMaxLength();

    window.addEventListener("resize", updateMaxLength);

    return () => {
      window.removeEventListener("resize", updateMaxLength);
    };
  }, []);

  return (
    <NextUIProvider className="provider">
      <InicialContext.Provider
        value={{
          evento: eventosTeste,
        }}
      >
        <Navigation open={open} setOpen={setOpen} />
        <div
          style={{
            height: "92vh",
            marginTop: "60px",
            marginLeft: `${maxLength && open ? "320px" : "0px"}`,
            transition: "margin-left .3s ease-in-out",
          }}
          className="events"
        >
          {children}
        </div>
      </InicialContext.Provider>
    </NextUIProvider>
  );
};

export default AppProvider;

export const useInicialContext = (): InicialContextProps => {
  const context = React.useContext(InicialContext);

  return context;
};
