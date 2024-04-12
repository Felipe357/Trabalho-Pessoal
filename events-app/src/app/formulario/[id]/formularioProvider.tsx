"use client";

import { EventoProp, useInicialContext } from "@/provider/provider";
import { useDisclosure } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FomrularioProviderProps extends React.PropsWithChildren {}

type DisclosureProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
};

interface FomrularioContextProps {
  form: any;
  evento?: EventoProp;
  disclousureFormularioConfirmacao: DisclosureProps;
}

export const FomrularioContext = createContext({} as FomrularioContextProps);

export function FomrularioProvider({ children }: FomrularioProviderProps) {
  const params = useParams<{ id: string }>();

  const router = useRouter();

  const [eventoFilter, setEvento] = useState<EventoProp>();

  const { evento } = useInicialContext();

  useEffect(() => {
    if (params.id) {
      let filterEvento = evento.filter((e) => e.id === params.id)[0];
      if (filterEvento) {
        setEvento(filterEvento);
      } else {
        router.replace("/");
      }
    } else {
      router.replace("/");
    }
  }, [params]);

  const form = useForm({
    defaultValues: {
      colaborador: {
        id: "000014",
        nome: "Fabiana Barboza Ribeiro",
        presenca: true,
        bebida: false,
        transporte: false,
        dependentes: [
          {
            id: "0321457",
            nome: "Henrique Augusto Ribeiro Serra",
            idade: 5,
            tipo: 1,
            presenca: false,
            bebida: false,
          },
          {
            id: "3658749",
            nome: "Felipe Augusto Ribeiro Serra",
            idade: 15,
            tipo: 1,
            presenca: false,
            bebida: false,
          },
          {
            id: "2587469",
            nome: "Samuel Augusto Serra",
            idade: 41,
            tipo: 2,
            presenca: false,
            bebida: false,
          },
        ],
      },
    },
  });

  const disclousureFormularioConfirmacao = useDisclosure({
    id: "disclosure-formulario-confirmacao",
  });

  return (
    <FomrularioContext.Provider
      value={{
        form: form,
        evento: eventoFilter,
        disclousureFormularioConfirmacao: disclousureFormularioConfirmacao,
      }}
    >
      {children}
    </FomrularioContext.Provider>
  );
}

export const useFomrularioContext = (): FomrularioContextProps => {
  const context = useContext(FomrularioContext);

  return context;
};
