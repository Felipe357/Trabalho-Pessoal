"use client";

import { useDisclosure } from "@nextui-org/react";
import { createContext, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInicialContext } from "@/provider/provider";
import { api } from "@/service/api";

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

  const { form: formControle } = useInicialContext();

  const { watch } = formControle;

  const { eventoSelect } = watch();

  const form = useForm({
    defaultValues: {
      novoEvento: eventoSelect ?? {
        pulseira: [],
        campos: [],
      },
      horas: {
        keys: horas,
        disableKeysInicio: [],
        disableKeysFim: [],
      },
      filiais: [],
      tabs: {
        select: "event",
        tabs: tabs,
      },
      pulseiraForm: {
        idadeInicio: "",
        idadeFim: "",
        color: "#52b032",
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

  const { setValue } = form;

  const buscarFiliais = async () => {
    const response = await api.get("filial/listar");

    if (response.data.status) {
      setValue("filiais", response.data.filiais);
    }
  };

  useEffect(() => {
    buscarFiliais();
  }, []);

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
