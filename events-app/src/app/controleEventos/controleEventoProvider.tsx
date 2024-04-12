"use client";

import { useDisclosure } from "@nextui-org/react";
import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { EventoProp, useInicialContext } from "@/provider/provider";

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
  evento: EventoProp[];
}

export const ControleEventoContext = createContext(
  {} as ControleEventoContextProps
);

export function ControleEventoProvider({
  children,
}: ControleEventoProviderProps) {
  const form = useForm();

  const { evento } = useInicialContext();

  return (
    <ControleEventoContext.Provider
      value={{
        form: form,
        evento: [...evento, ...evento, ...evento, ...evento, ...evento],
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
