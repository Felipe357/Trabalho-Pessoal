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

export const NovoEventoContext = createContext({} as NovoEventoContextProps);

export function NovoEventoProvider({ children }: NovoEventoProviderProps) {
  const form = useForm({
    defaultValues: {
      novoEvento: {},
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
