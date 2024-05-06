import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useFormularioContext } from "../formularioProvider";
import Image from "next/image";

const ModalImagem = () => {
  const { disclousureCamposImagens, form } = useFormularioContext();
  const { isOpen, onClose } = disclousureCamposImagens;
  const { watch } = form;
  const { campoSelect } = watch();

  return (
    <Modal
      size={"5xl"}
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      placement="center"
      className="events"
      scrollBehavior="inside"
      classNames={{ backdrop: "z-[5000]", wrapper: "z-[6000]" }}
    >
      <ModalContent>
        <ModalHeader />
        {campoSelect && campoSelect.campo_imagem && (
          <ModalBody className="overflow-auto">
            {campoSelect.campo_imagem.map((e: any) => (
              <div key={e.id} className="w-full max-w-5xl mx-auto">
                <Image
                  src={
                    e.imagem_base64 === undefined
                      ? ""
                      : `data:image/.png;base64,${e.imagem_base64}`
                  }
                  layout="responsive"
                  width={1200}
                  height={800}
                  alt="Fundo Evento"
                />
              </div>
            ))}
          </ModalBody>
        )}
        <ModalFooter>
          <Button color="primary" className="text-white" onPress={onClose}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalImagem;
