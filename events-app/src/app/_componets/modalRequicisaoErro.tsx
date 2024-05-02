import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { usePageContext } from "../pageProvider";

const ModalRequicisaoErro = () => {
  const { disclousureRequicisaoErro } = usePageContext();

  const { isOpen, onClose } = disclousureRequicisaoErro;

  return (
    <Modal
      size={"xl"}
      isOpen={isOpen}
      hideCloseButton
      backdrop="blur"
      placement="center"
      className="events"
      classNames={{ backdrop: "z-[5000]", wrapper: "z-[6000]" }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader></ModalHeader>

            <ModalBody className="flex items-center text-center gap-10 font-bold text-lg md:text-xl text-black">
              <div className=" border-2 border-[#F00] rounded-full w-32 h-32 flex justify-center items-center">
                <FontAwesomeIcon icon={faClose} size="4x" color="#F00" />
              </div>
              Não foi possível cancelar a inscrição, por favor tente novamente
              mais tarde.
            </ModalBody>

            <ModalFooter>
              <Button
                color="primary"
                className="text-white"
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

export default ModalRequicisaoErro;
