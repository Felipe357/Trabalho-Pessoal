"use client";

import { useDisclosure } from "@nextui-org/react";
import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { useInicialContext } from "@/provider/provider";

interface NovoEventoProviderProps extends React.PropsWithChildren {}

type DisclosureProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
};

interface NovoEventoContextProps {
  form: any;
  disclousureNovoEvento: DisclosureProps;
  disclosureErroEvento: DisclosureProps;
}

export interface HorasProps {
  value: string;
}

export interface Filial {
  id: string;
  filial: string;
  fazenda: string;
  regiao: string;
  status: number;
  log_criacao: string;
  log_alteracao: string | null;
}

export const NovoEventoContext = createContext({} as NovoEventoContextProps);

export function NovoEventoProvider({ children }: NovoEventoProviderProps) {
  const horas: HorasProps[] = [];

  const carregarHorario = () => {
    for (let index = 0; index < 24; index++) {
      horas.push({
        value:
          index.toString().length === 1
            ? "0" + index.toString() + ":00"
            : index.toString() + ":00",
      });
      horas.push({
        value:
          index.toString().length === 1
            ? "0" + index.toString() + ":30"
            : index.toString() + ":30",
      });
    }
  };

  carregarHorario();

  const tabs: string[] = ["event", "location", "branch", "bracelet", "fields"];

  const filiais: Filial[] = [
    {
      id: "a8a1a717-5802-4e17-9590-750f8de66f58",
      filial: "001001",
      fazenda: "Terra Viva",
      regiao: "HOLAMBRA",
      status: 0,
      log_criacao: "2023-10-17T17:58:28.189Z",
      log_alteracao: null,
    },
    {
      id: "dee0527a-2dc6-45ee-8847-d75174e2179b",
      filial: "001050",
      fazenda: "São J. Dos Pinheiros",
      regiao: "HOLAMBRA",
      status: 0,
      log_criacao: "2023-10-17T17:58:28.191Z",
      log_alteracao: null,
    },
    {
      id: "e3c83e00-526f-4201-826a-289fbc874b38",
      filial: "001100",
      fazenda: "CBB - Vargem Grande do Sul",
      regiao: "CASA BRANCA",
      status: 0,
      log_criacao: "2023-10-17T17:58:28.191Z",
      log_alteracao: null,
    },
    {
      id: "957f3ed0-5c71-4e4c-95b4-918feecc83c4",
      filial: "001200",
      fazenda: "Cocais do Rio Verde",
      regiao: "CASA BRANCA",
      status: 0,
      log_criacao: "2023-10-17T17:58:28.212Z",
      log_alteracao: null,
    },
    {
      id: "657811ed-7bd3-476b-b23e-f3304aa10081",
      filial: "001220",
      fazenda: "Cachimbão",
      regiao: "CASA BRANCA",
      status: 0,
      log_criacao: "2023-10-17T17:58:28.190Z",
      log_alteracao: null,
    },
    {
      id: "c9b6a079-3dd9-4f69-9eb5-ff2f02ae2081",
      filial: "001300",
      fazenda: "Chapadão das Emas",
      regiao: "MINAS GERAIS",
      status: 0,
      log_criacao: "2023-10-17T17:58:28.203Z",
      log_alteracao: null,
    },
    {
      id: "75309fe9-6bc7-4db3-9a6a-17244e9df0e5",
      filial: "001320",
      fazenda: "Chapadão das Perdizes",
      regiao: "MINAS GERAIS",
      status: 0,
      log_criacao: "2023-10-17T17:58:28.212Z",
      log_alteracao: null,
    },
  ];
  const { form: formControle } = useInicialContext();

  const { watch } = formControle;

  const { eventoSelect } = watch();

  const form = useForm({
    defaultValues: {
      novoEvento: eventoSelect ?? {
        pulseiras: [],
        campos: [],
      },
      horas: {
        keys: horas,
        disableKeysInicio: [],
        disableKeysFim: [],
      },
      filiais: filiais,
      tabs: {
        select: "event",
        tabs: tabs,
      },
      pulseira: {
        idadeInicio: "",
        idadeFim: "",
        color: "#3E7E28",
        bebida: false,
      },
      campo: {
        titulo: "",
        descricao: "",
        tituloValor: "",
        valor: "",
        valores: [],
      },
    },
  });

  const disclosureNovoEvento = useDisclosure({
    id: "disclosure-novo-evento",
  });

  const disclosureErroEvento = useDisclosure({
    id: "disclosure-erro-novo-evento",
  });

  return (
    <NovoEventoContext.Provider
      value={{
        form: form,
        disclousureNovoEvento: disclosureNovoEvento,
        disclosureErroEvento: disclosureErroEvento,
      }}
    >
      {children}
    </NovoEventoContext.Provider>
  );
}

export const useNovoEventoContext = (): NovoEventoContextProps => {
  const context = useContext(NovoEventoContext);

  return context;
};
