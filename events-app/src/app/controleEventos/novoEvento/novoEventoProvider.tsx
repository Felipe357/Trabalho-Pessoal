"use client";

import { useDisclosure } from "@nextui-org/react";
import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";

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
}

export interface HorasProps {
  key: string;
  value: string;
}

export const NovoEventoContext = createContext({} as NovoEventoContextProps);

export function NovoEventoProvider({ children }: NovoEventoProviderProps) {
  const horas: HorasProps[] = [];

  const carregarHorario = () => {
    for (let index = 0; index < 24; index++) {
      horas.push({
        key: "H" + index,
        value:
          index.toString().length === 1
            ? "0" + index.toString() + ":00"
            : index.toString() + ":00",
      });
      horas.push({
        key: "M" + index,
        value:
          index.toString().length === 1
            ? "0" + index.toString() + ":30"
            : index.toString() + ":30",
      });
    }
  };

  carregarHorario();

  const tabs: string[] = ["event", "location", "bracelet", "fields"];

  const form = useForm({
    defaultValues: {
      novoEvento: {},
      horas: {
        keys: horas,
        disableKeysInicio: [],
        disableKeysFim: [],
      },
      tabs: {
        select: "event",
        tabs: tabs,
      },
    },
  });

  return (
    <NovoEventoContext.Provider
      value={{
        form: form,
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
