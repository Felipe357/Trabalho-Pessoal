"use client";

import { EventoProp, useInicialContext } from "@/provider/provider";
import { useDisclosure } from "@nextui-org/react";
import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";

interface PageProviderProps extends React.PropsWithChildren {}

type DisclosureProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
};

interface PageContextProps {
  form: any;
  evento: EventoProp[];
  disclousureEvento: DisclosureProps;
  disclousureEventoCancelar: DisclosureProps;
}

export const PageContext = createContext({} as PageContextProps);

export function PageProvider({ children }: PageProviderProps) {
  const form = useForm({
    defaultValues: {
      evento: {},
      colaborador: {
        id: "000014",
        nome: "Fabiana Barboza Ribeiro",
        dependentes: [
          {
            id: "0321457",
            nome: "Henrique Augusto Ribeiro Serra",
            idade: 5,
            tipo: 1,
          },
          {
            id: "3658749",
            nome: "Felipe Augusto Ribeiro Serra",
            idade: 15,
            tipo: 1,
          },
          {
            id: "2587469",
            nome: "Samuel Augusto Serra",
            idade: 41,
            tipo: 2,
          },
        ],
      },
    },
  });

  const disclosureEvento = useDisclosure({
    id: "disclosure-evento",
  });

  const disclousureEventoCancelar = useDisclosure({
    id: "disclousure-evento-cancelar",
  });

  const { evento } = useInicialContext();

  return (
    <PageContext.Provider
      value={{
        form: form,
        evento: evento,
        disclousureEvento: disclosureEvento,
        disclousureEventoCancelar: disclousureEventoCancelar,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export const usePageContext = (): PageContextProps => {
  const context = useContext(PageContext);

  return context;
};
