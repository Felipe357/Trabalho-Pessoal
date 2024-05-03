import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useFormularioContext } from "../formularioProvider";
import Image from "next/image";

const ModalImagem = () => {
  const { disclousureCamposImagens, form } = useFormularioContext();

  const { isOpen, onClose } = disclousureCamposImagens;

  const { watch } = form;

  const { campoSelect } = watch();

  return (
    <Modal
      size={"2xl"}
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      placement="center"
      className="events"
      scrollBehavior="inside"
      classNames={{ backdrop: "z-[5000]", wrapper: "z-[6000]" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>

            {campoSelect && campoSelect.campo_imagem && (
              <ModalBody className=" overflow-y-auto text-center gap-10">
                {campoSelect.campo_imagem.map((e: any) => (
                  <Image
                    key={e.id}
                    src={
                      e.imagem_base64 === undefined
                        ? ""
                        : `data:image/.png;base64,${e.imagem_base64}`
                    }
                    layout="fill"
                    objectFit="cover"
                    alt="Fundo Evento"
                  />
                ))}
              </ModalBody>
            )}

            <ModalFooter>
              <Button color="primary" className="text-white" onPress={() => {}}>
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalImagem;
