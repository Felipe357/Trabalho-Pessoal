"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Navigation } from "@/components/navigation";

import { useForm } from "react-hook-form";
import { api } from "@/service/api";
import { NextAuthProvider } from "./nextauth.client.provider";
import SessionProvider from "./session.client.provider";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import SinginScreen from "@/components/singin/page";

export type EventoProp = {
  id: string;
  campo?: {
    id: string;
    titulo: string;
    descricao: string;
    valores: {
      id: string;
      titulo: string;
      valor: string;
    }[];
    campo_imagem: any[];
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
  foto_base64?: string;
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
  longitude?: string;
  latitude?: string;
  confirmacao: boolean;
  idade_dependente: number;
  status: number;
};

interface InicialContextProps {
  form: any;
}

export const InicialContext = React.createContext({} as InicialContextProps);

const EventosProvider = ({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement => {
  const { data: session } = useSession();

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
  const { setValue, watch } = form;

  const buscarColaborador = async () => {
    try {
      const id =
        session && (jwtDecode((session as any).access_token) as any).oid;

      const response = await api.get(`colaborador/buscar/${id}`);

      if (response.data.status === 200) {
        setValue("colaborador", response.data.colaborador);
      }
    } catch (error) {}
  };

  const buscarEventos = async () => {
    if (watch("colaborador")) {
      try {
        const response = await api.get(
          `evento/listar/colaborador/${watch("colaborador").id}`
        );

        if (response.data.status === 200) {
          setValue("eventos", response.data.eventos);
        }
      } catch (error) {}
    }
  };

  React.useEffect(() => {
    if (session) {
      if (!watch("colaborador")) {
        buscarColaborador();
      }

      buscarEventos();
    }
  }, [session, watch("colaborador"), watch("reload")]);

  return (
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
        {session ? (
          children
        ) : (
          <>
            <SinginScreen />
            {children}
          </>
        )}
      </div>
    </InicialContext.Provider>
  );
};

export default EventosProvider;

export const useInicialContext = (): InicialContextProps => {
  const context = React.useContext(InicialContext);

  return context;
};
