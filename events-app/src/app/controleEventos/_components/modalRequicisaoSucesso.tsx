import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useControleEventoContext } from "../controleEventoProvider";

const ModalRequicisaoSucesso = () => {
  const { disclousureRequicisaoSucesso } = useControleEventoContext();

  const { isOpen, onClose } = disclousureRequicisaoSucesso;

  const router = useRouter();

  return (
    <Modal
      size={"xl"}
      isOpen={isOpen}
      hideCloseButton
      backdrop="blur"
      placement="center"
      className="events"
      classNames={{ backdrop: "z-[700000]", wrapper: "z-[800000]" }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader></ModalHeader>

            <ModalBody className="flex items-center gap-10 font-bold text-lg md:text-xl text-black">
              <div className=" border-2 border-primary rounded-full w-32 h-32 flex justify-center items-center">
                <FontAwesomeIcon icon={faCheck} size="4x" color="#52b032" />
              </div>
              Evento desativado com sucesso!
            </ModalBody>

            <ModalFooter>
              <Button
                color="primary"
                className="text-white"
                onPress={() => {
                  router.push("/controleEventos");
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

export default ModalRequicisaoSucesso;
