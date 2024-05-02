import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useNovoEventoContext } from "../novoEventoProvider";

const ModalCadastroEvento = () => {
  const { disclousureNovoEvento, form } = useNovoEventoContext();

  const { isOpen, onClose } = disclousureNovoEvento;

  const { watch } = form

  const { novoEvento } = watch()

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
            <ModalHeader>
              {JSON.stringify(novoEvento, null, 2)}
            </ModalHeader>
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
                  onClose();
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
