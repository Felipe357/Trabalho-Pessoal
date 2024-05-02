"use client";

import { useInicialContext } from "@/provider/provider";
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
  disclousureEvento: DisclosureProps;
  disclousureEventoCancelar: DisclosureProps;
  disclousureRequicisaoSucesso: DisclosureProps;
  disclousureRequicisaoErro: DisclosureProps;
}

export const PageContext = createContext({} as PageContextProps);

export function PageProvider({ children }: PageProviderProps) {
  const form = useForm();

  const disclosureEvento = useDisclosure({
    id: "disclosure-evento",
  });

  const disclousureEventoCancelar = useDisclosure({
    id: "disclousure-evento-cancelar",
  });

  const disclousureRequicisaoSucesso = useDisclosure({
    id: "disclosure-page-formulario-sucesso",
  });

  const disclousureRequicisaoErro = useDisclosure({
    id: "disclosure-page-formulario-erro",
  });

  return (
    <PageContext.Provider
      value={{
        form: form,
        disclousureEvento: disclosureEvento,
        disclousureEventoCancelar: disclousureEventoCancelar,
        disclousureRequicisaoSucesso: disclousureRequicisaoSucesso,
        disclousureRequicisaoErro: disclousureRequicisaoErro,
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
