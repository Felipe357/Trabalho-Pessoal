import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useNovoEventoContext } from "../../novoEventoProvider";

const ModalVisualizarImagem = () => {
  const { disclousureImagemCampo, form } = useNovoEventoContext();
  const { isOpen, onClose } = disclousureImagemCampo;
  const { watch, setValue } = form;
  const { imagemCampo, campo } = watch();

  const { valores, titulo, descricao, tituloValor, valor, fotos } = campo;

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const getImageDimensions = async () => {
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(imagemCampo.foto);
    };

    if (imagemCampo) {
      getImageDimensions();
    }
  }, [imagemCampo]);

  return (
    <Modal
      size={"2xl"}
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      placement="center"
      className="events"
      scrollBehavior="inside"
      classNames={{ backdrop: "z-[6000]", wrapper: "z-[7000]" }}
    >
      <ModalContent>
        <ModalHeader>{imagemCampo && imagemCampo.name}</ModalHeader>
        <ModalBody>
          {imagemCampo && imagemCampo.foto && (
            <img
              src={URL.createObjectURL(imagemCampo.foto)}
              alt={"Imagem Campo"}
              width={imageDimensions.width}
              height={imageDimensions.height}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </ModalBody>
        <ModalFooter className="h-20">
          <Button
            color="danger"
            onPress={() => {
              setValue("campo", {
                titulo: titulo,
                descricao: descricao,
                tituloValor: tituloValor,
                valor: valor,
                valores: valores,
                fotos: fotos.filter(
                  (foto: any) => foto.index !== imagemCampo.index
                ),
              });
              onClose();
            }}
          >
            Excluir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalVisualizarImagem;
