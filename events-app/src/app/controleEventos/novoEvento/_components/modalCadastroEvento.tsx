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
import { useInicialContext } from "@/provider/provider";

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
      const foto = novoEvento.foto
      delete novoEvento.foto
      const response = await api.post("evento/criar", novoEvento);

      if (response.data.status === 200) {

        if (foto.name) {
          await api.put(`evento/alterar/foto`, {
            "id": response.data.evento_id,
            "foto": foto.foto
          }, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })

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
