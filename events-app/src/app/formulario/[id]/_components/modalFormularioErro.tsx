import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useFormularioContext } from "../formularioProvider";

const ModalErro = () => {
  const { disclousureFormularioErroFormulario } = useFormularioContext();

  const { isOpen, onClose } = disclousureFormularioErroFormulario;

  return (
    <Modal
      size={"sm"}
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
            <ModalHeader></ModalHeader>

            <ModalBody className="text-center font-bold text-lg md:text-xl text-black">
              Por favor, preencha todos os campos obrigatórios.
            </ModalBody>

            <ModalFooter>
              <Button color="primary" className="text-white" onPress={onClose}>
                Ok
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalErro;
