import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { usePageContext } from "../pageProvider";

const ModalEventoCancelar = () => {
  const { disclousureEventoCancelar, disclousureEvento, form } =
    usePageContext();

  const { isOpen, onClose: onCloseCancelar } = disclousureEventoCancelar;

  const { onClose: onCloseEvento } = disclousureEvento;

  const { watch } = form;

  const { id, titulo, data } = watch("evento");

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
              <span className="font-bold text-2xl md:text-xl text-black">
                Certeza qua não vai participar?
              </span>

              <span className=" font-bold text-xl md:text-3xl text-primary">
                {titulo}
              </span>

              <span className="font-medium text-2xl md:text-xl text-black">
                Cadastro poderá ser alterado até{" "}
                <span className="font-bold">{data}</span>
              </span>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-primary text-white"
                onPress={() => {
                  onClose();
                  onCloseEvento();
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

export default ModalEventoCancelar;
