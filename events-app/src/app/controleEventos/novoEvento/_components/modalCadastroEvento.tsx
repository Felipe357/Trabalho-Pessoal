import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useNovoEventoContext } from "../novoEventoProvider";
import { api } from "@/service/api";
import { useInicialContext } from "@/providers/client.providers/evento.client.provider";

interface Objeto {
  id: string;
  titulo: string;
  descricao: string;
  obrigatorio: boolean;
  valores: { titulo: string; valor: string }[];
  fotos?: { index: number; name: string; foto: any }[];
}

const ModalCadastroEvento = () => {
  const {
    disclousureNovoEvento,
    form,
    disclousureRequicisaoSucesso,
    disclousureRequicisaoErro,
  } = useNovoEventoContext();

  const { isOpen, onClose } = disclousureNovoEvento;

  const { onOpen } = disclousureRequicisaoSucesso;

  const { onOpen: onOpenErro } = disclousureRequicisaoErro;

  const { watch } = form;

  const { novoEvento } = watch();

  const { form: formInicial } = useInicialContext();

  const { setValue } = formInicial;

  const cadastrarEvento = async () => {
    try {
      const foto = novoEvento.foto;
      delete novoEvento.foto;

      const semFotos: Objeto[] = [];
      const comFotos: any[] = [];

      novoEvento.campo.forEach((objeto: any) => {
        comFotos.push({ id: objeto.id, fotos: objeto.fotos });
        semFotos.push({
          id: objeto.id,
          titulo: objeto.titulo,
          descricao: objeto.descricao,
          obrigatorio: objeto.obrigatorio,
          valores: objeto.valores,
        });
      });

      novoEvento.campo = semFotos;

      const response = await api.post("evento/criar", novoEvento);

      if (response.data.status === 200) {
        if (
          foto &&
          foto.name &&
          foto.name !== "Arquivo sem nome" &&
          foto.name !==
            (novoEvento.foto_base64 ? novoEvento.foto_base64.nome : "")
        ) {
          await api.put(
            `evento/alterar/foto`,
            {
              id: response.data.evento_id,
              nome_foto: foto.name,
              foto: foto.foto,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        if (comFotos.length > 0) {
          await Promise.all(
            comFotos.map(async (e) => {
              if (e.fotos && e.fotos.length > 0) {
                e.fotos.forEach(async (teste: any) => {
                  await api.put(
                    `evento/campo/imagens`,
                    {
                      id: e.id,
                      imagens: teste.foto,
                    },
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                });
              }
            })
          );
        }

        setValue("reload", Math.random());
        onClose();
        onOpen();
      } else {
        onClose();
        onOpenErro();
      }
    } catch (error) {
      console.log(error);

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
      classNames={{ backdrop: "z-[6000]", wrapper: "z-[7000]" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>

            <ModalBody className=" overflow-y-auto text-center gap-10">
              <span className="font-bold text-2xl md:text-xl text-black">
                Confirmar cadastro do novo evento?
              </span>

              <span className="font-medium text-2xl md:text-xl text-black">
                Cadastro poderá ser alterado até a data do evento.
              </span>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-primary text-white"
                onPress={() => {
                  cadastrarEvento();
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

export default ModalCadastroEvento;
