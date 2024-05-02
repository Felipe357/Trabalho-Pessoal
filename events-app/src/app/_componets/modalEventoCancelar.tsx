import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { usePageContext } from "../pageProvider";
import { useEffect, useState } from "react";
import { transformJSON } from "@/utils/transformColaborador";
import { useInicialContext } from "@/provider/provider";
import { api } from "@/service/api";

const ModalEventoCancelar = () => {
  const {
    disclousureEventoCancelar,
    disclousureEvento,
    form,
    disclousureRequicisaoSucesso,
    disclousureRequicisaoErro,
  } = usePageContext();

  const { form: inicialForm } = useInicialContext();

  const { watch: watchInicial, setValue } = inicialForm;

  const { colaborador } = watchInicial();

  const { isOpen, onClose: onCloseCancelar } = disclousureEventoCancelar;

  const { onClose: onCloseEvento } = disclousureEvento;

  const { onOpen: onOpenRequicisaoSucesso } = disclousureRequicisaoSucesso;
  const { onOpen: onOpenRequicisaoErro } = disclousureRequicisaoErro;

  const { watch } = form;

  const { evento } = watch();

  const { titulo, formulario } = evento ?? {};

  const [participante, setParticipante] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const buscarParticipantes = async () => {
    setIsLoading(true);
    if (evento) {
      try {
        const response = await api.get(
          `participante/buscar/${evento.id}/${colaborador.id}`
        );
        if (response.data.status === 200 && response.data.participantes) {
          setParticipante(
            response.data.participantes.map((e: any) => {
              return {
                ...e,
                bebida_alcoolica: e.bebida_alcoolica === 1,
                transporte: e.transporte === 1,
              };
            })
          );

          setIsLoading(false);
        } else {
          setParticipante(transformJSON(colaborador) as never[]);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setParticipante(transformJSON(colaborador) as never[]);
      }
    }
  };

  useEffect(() => {
    buscarParticipantes();
  }, [isOpen]);

  const buscarValor = (valorParams: any) => {
    let resultados: { id: string; titulo: string; valor: string }[] = [];

    evento &&
      evento.campo &&
      evento.campo.forEach((obj: { valores: any[] }) => {
        valorParams.forEach((valorBuscado: string) => {
          obj.valores.forEach((valor) => {
            if (valor.valor === valorBuscado) {
              resultados.push({
                id: valor.id,
                titulo: valor.titulo,
                valor: valor.valor,
              });
            }
          });
        });
      });

    return resultados;
  };

  const recusarEvento = async () => {
    const dependenteAcompanhante = colaborador.dependente.filter(
      (e: any) => e.tipo === 0
    )[0];

    const request = {
      evento_id: evento?.id,
      participantes: participante
        .map((e: any) => {
          if (e.dependente && e.dependente.tipo === 0) {
            if (
              dependenteAcompanhante &&
              e.dependente.nome_completo !==
                dependenteAcompanhante.nome_completo
            ) {
              const nome = e.dependente.nome_completo;
              const id = e.dependente.colaborador_id;

              delete e.dependente;

              return {
                ...e,
                acompanhante: {
                  nome_completo: nome,
                  colaborador_id: id,
                },
                bebida_alcoolica: 0,
                transporte: 0,
                participacao: 0,
                campos: e.campos && buscarValor(e.campos),
              };
            }
            return {
              ...e,
              bebida_alcoolica: 0,
              transporte: 0,
              participacao: 0,
              campos: e.campos && buscarValor(e.campos),
            };
          } else {
            return {
              ...e,
              bebida_alcoolica: 0,
              transporte: 0,
              participacao: 0,
              campos: e.campos && buscarValor(e.campos),
            };
          }
        })
        .filter((participante: { acompanhante: { nome_completo: string } }) => {
          return (
            participante.acompanhante === null ||
            participante.acompanhante === undefined ||
            (participante.acompanhante &&
              participante.acompanhante.nome_completo !== "")
          );
        }),
    };
    try {
      const response = await api.post("participante/criar", request);

      if (response.data.status === 200) {
        setValue("reload", Math.random());
        onCloseCancelar();
        onCloseEvento();
        onOpenRequicisaoSucesso();
      } else {
        onCloseCancelar();
        onCloseEvento();
        onOpenRequicisaoErro();
      }
    } catch (error) {
      onCloseCancelar();
      onCloseEvento();
      onOpenRequicisaoErro();
    }
  };

  return (
    <Modal
      size={"2xl"}
      isOpen={isOpen}
      onClose={onCloseCancelar}
      backdrop="blur"
      placement="center"
      className="events"
      classNames={{ backdrop: "z-[6000]", wrapper: "z-[7000]" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody className=" overflow-y-auto text-center gap-10">
              <span className="font-bold text-lg md:text-xl text-black">
                Certeza qua não vai participar?
              </span>

              <span className=" font-bold text-xl md:text-3xl text-primary">
                {titulo}
              </span>

              <span className="font-medium text-lg md:text-xl text-black">
                Cadastro poderá ser alterado até{" "}
                <span className="font-bold">
                  {formulario && formulario.end}
                </span>
              </span>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-primary text-white"
                onPress={() => {
                  recusarEvento();
                }}
                isDisabled={isLoading}
              >
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalEventoCancelar;
