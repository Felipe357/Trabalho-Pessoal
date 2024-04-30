"use client";

import { type EventoProp, useInicialContext } from "@/provider/provider";
import { api } from "@/service/api";
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
  disclousureFormularioErroFormulario: DisclosureProps;
  disclousureRequicisaoSucesso: DisclosureProps;
  disclousureRequicisaoErro: DisclosureProps;
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
    if (params.id && eventos) {
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
  }, [eventos, params, router]);

  const form = useForm({
    defaultValues: {
      participantes: [],
    },
  });

  const { setValue } = form;

  const buscarEventos = async () => {
    if (eventoFilter) {
      try {
        const response = await api.get(
          `participante/buscar/${eventoFilter.id}/${colaborador.id}`
        );
        if (response.data.status === 200 && response.data.participantes) {
          setValue(
            "participantes",
            response.data.participantes.map((e: any) => {
              return {
                ...e,
                bebida_alcoolica: e.bebida_alcoolica === 1,
                transporte: e.transporte === 1,
              };
            })
          );
        } else {
          setValue("participantes", transformJSON(colaborador) as never[]);
        }
      } catch (error) {
        setValue("participantes", transformJSON(colaborador) as never[]);
      }
    }
  };

  useEffect(() => {
    buscarEventos();
  }, [eventoFilter]);

  const disclousureFormularioConfirmacao = useDisclosure({
    id: "disclosure-formulario-confirmacao",
  });

  const disclousureFormularioErroFormulario = useDisclosure({
    id: "disclosure-formulario-erro-validacao",
  });

  const disclousureRequicisaoSucesso = useDisclosure({
    id: "disclosure-formulario-sucesso",
  });

  const disclousureRequicisaoErro = useDisclosure({
    id: "disclosure-formulario-erro",
  });

  return (
    <FomrularioContext.Provider
      value={{
        form: form,
        evento: eventoFilter,
        disclousureFormularioConfirmacao: disclousureFormularioConfirmacao,
        disclousureFormularioErroFormulario:
          disclousureFormularioErroFormulario,
        disclousureRequicisaoErro: disclousureRequicisaoErro,
        disclousureRequicisaoSucesso: disclousureRequicisaoSucesso,
      }}
    >
      {children}
    </FomrularioContext.Provider>
  );
}

export const useFormularioContext = (): FomrularioContextProps => {
  const context = useContext(FomrularioContext);

  return context;
};
