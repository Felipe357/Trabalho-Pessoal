import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useNovoEventoContext } from "../novoEventoProvider";

const ModalErroEvento = () => {
  const { disclosureErroEvento } = useNovoEventoContext();

  const { isOpen, onClose } = disclosureErroEvento;

  return (
    <Modal
      size={"md"}
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
            <ModalBody className="text-center">
              <span className="font-bold text-2xl md:text-xl text-black">
                Campos informados incorretamente.
              </span>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-primary text-white"
                onPress={() => {
                  onClose();
                }}
              >
                Ok
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalErroEvento;
