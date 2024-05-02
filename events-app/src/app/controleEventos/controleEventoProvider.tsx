"use client";

import { api } from "@/service/api";
import { useDisclosure } from "@nextui-org/react";
import { createContext, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

interface ControleEventoProviderProps extends React.PropsWithChildren {}

type DisclosureProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
};

interface ControleEventoContextProps {
  form: any;
  disclosureDesativarEvento: DisclosureProps;
  disclousureRequicisaoSucesso: DisclosureProps;
  disclousureRequicisaoErro: DisclosureProps;
}

export const ControleEventoContext = createContext(
  {} as ControleEventoContextProps
);

export function ControleEventoProvider({
  children,
}: ControleEventoProviderProps) {
  const tabs: string[] = ["list", "participants"];

  const form = useForm({
    defaultValues: {
      filter: {
        nome: "",
        tipoParticipante: "all",
        participacao: "all",
        bebida: "all",
        transporte: "all",
      },
      eventoSelect: {
        titulo: "Nenhum Evento Selecionado",
      },
      tabs: {
        select: "list",
        tabs: tabs,
      },
      eventos: "",
      reload: 0,
    },
  });

  const { setValue, watch } = form;

  const buscarEventos = async () => {
    const response = await api.get("evento/listar");

    if (response.data.status === 200) {
      setValue("eventos", response.data.eventos);
    }
  };

  useEffect(() => {
    buscarEventos();
  }, [watch("reload")]);

  const disclosureDesativarEvento = useDisclosure({
    id: "disclousure-desativar-evento",
  });

  const disclousureRequicisaoSucesso = useDisclosure({
    id: "disclousure-modal-desativar-evento-sucesso",
  });

  const disclousureRequicisaoErro = useDisclosure({
    id: "disclousure-modal-desativar-evento-erro",
  });

  return (
    <ControleEventoContext.Provider
      value={{
        form: form,
        disclosureDesativarEvento: disclosureDesativarEvento,
        disclousureRequicisaoSucesso: disclousureRequicisaoSucesso,
        disclousureRequicisaoErro: disclousureRequicisaoErro,
      }}
    >
      {children}
    </ControleEventoContext.Provider>
  );
}

export const useControleEventoContext = (): ControleEventoContextProps => {
  const context = useContext(ControleEventoContext);

  return context;
};
