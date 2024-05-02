import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useFormularioContext } from "../formularioProvider";
import { api } from "@/service/api";
import { useInicialContext } from "@/provider/provider";

const ModalAceitar = () => {
  const {
    evento,
    disclousureFormularioConfirmacao,
    disclousureRequicisaoSucesso,
    disclousureRequicisaoErro,
    form,
  } = useFormularioContext();

  const { isOpen, onClose } = disclousureFormularioConfirmacao;

  const { onOpen } = disclousureRequicisaoSucesso;

  const { onOpen: onOpenErro } = disclousureRequicisaoErro;

  const { watch } = form;
  const { participantes } = watch();

  const { form: formInicial } = useInicialContext();

  const { setValue, watch: watchInicial } = formInicial;

  const { colaborador } = watchInicial();

  const buscarValor = (valorParams: any) => {
    let resultados: { id: string; titulo: string; valor: string }[] = [];

    evento &&
      evento.campo &&
      evento.campo.forEach((obj) => {
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

  const montarRequest = async () => {
    const dependenteAcompanhante = colaborador.dependente.filter(
      (e: any) => e.tipo === 0
    )[0];

    const request = {
      evento_id: evento?.id,
      participantes: participantes
        .map((e: any) => {
          if (e.dependente && e.dependente.tipo === 0) {
            if (
              dependenteAcompanhante &&
              e.dependente.nome_completo !==
              dependenteAcompanhante.nome_completo
            ) {
              const nome = e.dependente.nome_completo;
              const id = e.dependente.colaborador_id

              delete e.dependente;

              return {
                ...e,
                acompanhante: {
                  nome_completo: nome,
                  colaborador_id: id
                },
                bebida_alcoolica: e.bebida_alcoolica ? 1 : 0,
                transporte: e.transporte ? 1 : 0,
                participacao: e.participacao ? 1 : 0,
                campos: e.campos && buscarValor(e.campos),
              };
            }
            return {
              ...e,
              bebida_alcoolica: e.bebida_alcoolica ? 1 : 0,
              transporte: e.transporte ? 1 : 0,
              participacao: e.participacao ? 1 : 0,
              campos: e.campos && buscarValor(e.campos),
            };
          } else {
            return {
              ...e,
              bebida_alcoolica: e.bebida_alcoolica ? 1 : 0,
              transporte: e.transporte ? 1 : 0,
              participacao: e.participacao ? 1 : 0,
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
        onClose();
        onOpen();
      } else {
        onClose();
        onOpenErro();
      }
    } catch (error) {
      onClose();
      onOpenErro();
    }
  };

  return (
    <Modal
      size={"2xl"}
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      placement="center"
      className="events"
      classNames={{ backdrop: "z-[5000]", wrapper: "z-[6000]" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
            </ModalHeader>

            {evento && (
              <ModalBody className=" overflow-y-auto text-center gap-10">
                <span className="font-bold text-lg md:text-xl text-black">
                  Confirmar participação
                </span>

                <span className=" font-bold text-xl md:text-3xl text-primary">
                  {evento.titulo}
                </span>

                <span className="font-medium text-lg md:text-xl text-black">
                  Cadastro poderá ser alterado até{" "}
                  <span className="font-bold">{evento.formulario.end}</span>
                </span>
              </ModalBody>
            )}

            <ModalFooter>
              <Button
                color="primary"
                className="text-white"
                onPress={() => {
                  void (async () => {
                    await montarRequest();
                  })();
                }}
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

export default ModalAceitar;
