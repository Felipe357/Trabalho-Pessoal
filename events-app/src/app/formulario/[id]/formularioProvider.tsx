"use client";

import { type EventoProp, useInicialContext } from "@/provider/provider";
import { transformJSON } from "@/utils/transformColaborador";
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

  const { form: inicialForm } = useInicialContext();

  const { watch } = inicialForm;

  const { colaborador, eventos } = watch();

  useEffect(() => {
    if (params.id) {
      let filterEvento = eventos.filter(
        (e: EventoProp) => e.id === params.id
      )[0];
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
      colaborador: transformJSON(colaborador),
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
