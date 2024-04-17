import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useFomrularioContext } from "../formularioProvider";

const ModalAceitar = () => {
  const { evento, disclousureFormularioConfirmacao, form } =
    useFomrularioContext();

  const { isOpen, onClose } = disclousureFormularioConfirmacao;

  const { watch } = form;
  const { colaborador } = watch();

  return (
    <Modal
      size={"2xl"}
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      placement="center"
      classNames={{ backdrop: "z-[5000]", wrapper: "z-[6000]" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>

            {evento && (
              <ModalBody className=" overflow-y-auto text-center gap-10">
                <span className="font-bold text-2xl md:text-xl text-black">
                  Confirmar participação
                </span>

                <span className=" font-bold text-xl md:text-3xl text-primary">
                  {evento.titulo}
                </span>

                <span className="font-medium text-2xl md:text-xl text-black">
                  Cadastro poderá ser alterado até{" "}
                  <span className="font-bold">{evento.dataFormularioFim}</span>
                </span>
              </ModalBody>
            )}

            <ModalFooter>
              <Button
                color="primary"
                className="text-white"
                onPress={() => console.log(colaborador)}
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
