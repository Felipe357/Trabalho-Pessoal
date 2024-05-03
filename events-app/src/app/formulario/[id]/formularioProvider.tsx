"use client";

import { type EventoProp, useInicialContext } from "@/provider/provider";
import { api } from "@/service/api";
import { transformJSON } from "@/utils/transformColaborador";
import { useDisclosure } from "@nextui-org/react";
import { format, parse } from "date-fns";
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
  disclousureCamposImagens: DisclosureProps;
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
      campoSelect: "",
    },
  });

  const { setValue } = form;

  const buscarParticipantes = async () => {
    if (eventoFilter) {
      const montarParticipanteDependente = colaborador.dependente
        .map((e: any) => {
          const calcIdade =
            (Number(parse(eventoFilter.data, "dd/MM/yyyy", "yyyyMMdd")) -
              Number(format(e.data_nascimento, "yyyyMMdd"))) /
            10000;

          if (
            (eventoFilter.tipo_participante as unknown as number) >= 3 &&
            e.tipo === 1 &&
            eventoFilter.idade_dependente >= Math.trunc(calcIdade)
          ) {
            return e;
          } else if (
            ((eventoFilter.tipo_participante as unknown as number) == 2 ||
              (eventoFilter.tipo_participante as unknown as number) == 4) &&
            e.tipo === 0
          ) {
            return e;
          } else {
            return;
          }
        })
        .filter((e: any) => e !== undefined);
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
          setValue(
            "participantes",
            transformJSON({
              ...colaborador,
              dependente: montarParticipanteDependente,
            }) as never[]
          );
        }
      } catch (error) {
        console.log(error);
        setValue(
          "participantes",
          transformJSON({
            ...colaborador,
            dependente: montarParticipanteDependente,
          }) as never[]
        );
      }
    }
  };

  useEffect(() => {
    buscarParticipantes();
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

  const disclousureCamposImagens = useDisclosure({
    id: "disclosure-campos-imagens",
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
        disclousureCamposImagens: disclousureCamposImagens,
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
