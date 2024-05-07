import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { api } from "@/service/api";
import { useControleEventoContext } from "../controleEventoProvider";
import { useInicialContext } from "@/providers/client.providers/evento.client.provider";

const ModalDesativarEvento = () => {
  const {
    form,
    disclosureDesativarEvento,
    disclousureRequicisaoSucesso,
    disclousureRequicisaoErro,
  } = useControleEventoContext();

  const { isOpen, onClose } = disclosureDesativarEvento;

  const { onOpen } = disclousureRequicisaoSucesso;

  const { onOpen: onOpenErro } = disclousureRequicisaoErro;

  const { watch, setValue: setValueLista } = form;

  const { eventoSelect } = watch();

  const { form: formInicial } = useInicialContext();

  const { setValue } = formInicial;

  const montarRequest = async () => {
    try {
      const response = await api.put(`evento/desativar/${eventoSelect.id}`);

      if (response.data.status === 200) {
        setValue("reload", Math.random());
        setValueLista("reload", Math.random());
        onClose();
        onOpen();
      } else {
        onClose();
        onOpenErro();
      }
    } catch (error) {
      onClose();
      onOpenErro();
    }
  };

  return (
    <Modal
      size={"2xl"}
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      placement="center"
      className="events"
      classNames={{ backdrop: "z-[700000]", wrapper: "z-[800000]" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>

            {eventoSelect && (
              <ModalBody className=" overflow-y-auto text-center gap-10">
                <span className="font-bold text-lg md:text-xl text-black">
                  Desaja mesmo desativar esse evento?
                </span>

                <span className=" font-bold text-xl md:text-3xl text-primary">
                  {eventoSelect.titulo}
                </span>

                <span className="font-medium text-lg md:text-xl text-red-600">
                  Está ação não poderá ser desfeita!
                </span>
              </ModalBody>
            )}

            <ModalFooter>
              <Button
                color="primary"
                className="text-white"
                onPress={() => {
                  void (async () => {
                    await montarRequest();
                  })();
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

export default ModalDesativarEvento;
