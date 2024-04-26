"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Navigation } from "@/components/navigation";

import { useForm } from "react-hook-form";
import { api } from "@/service/api";

export type EventoProp = {
  id: string;
  campos?: {
    titulo: string;
    descricao: string;
    valores: {
      titulo: string;
      valor: string;
    }[];
  }[];
  pulseira?: {
    bebida: string;
    cor: string;
    idadeInicio: string;
    idadeFim: string;
  }[];
  titulo: string;
  descricao?: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  foto?: string;
  formulario: {
    start: string;
    end: string;
  };
  tipo_participante: number[];
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  confirmacao: boolean;
  idade_dependente: number;
  status: number;
};

interface InicialContextProps {
  form: any;
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

  const form = useForm();

  const { setValue } = form;

  const buscarColaborador = async () => {
    const response = await api.get(
      "colaborador/buscar/2748bec4-cacb-456b-9a37-80f49e0e4ac2"
    );

    if (response.data.status === 200) {
      setValue("colaborador", response.data.colaborador);
    }
  };

  const buscarEventos = async () => {
    const response = await api.get(
      "evento/listar/colaborador/a8a1a717-5802-4e17-9590-750f8de66f58/2748bec4-cacb-456b-9a37-80f49e0e4ac2"
    );

    if (response.data.status === 200) {
      setValue("eventos", response.data.eventos);
    }
  };

  React.useEffect(() => {
    buscarColaborador();
    buscarEventos();
  }, []);

  return (
    <NextUIProvider className="provider">
      <InicialContext.Provider
        value={{
          form: form,
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
