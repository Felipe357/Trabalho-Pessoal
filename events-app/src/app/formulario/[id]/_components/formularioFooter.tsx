import { Button } from "@nextui-org/react";
import { useFormularioContext } from "../formularioProvider";

const FormularioFooter = () => {
  const {
    disclousureFormularioConfirmacao,
    disclousureFormularioErroFormulario,
    evento,
    form,
  } = useFormularioContext();

  const { onOpen } = disclousureFormularioConfirmacao;

  const { onOpen: onOpenErro } = disclousureFormularioErroFormulario;

  const { watch } = form;

  const { participantes } = watch();

  const validarForm = () => {
    const campos = participantes.find((e: any) => e.colaborador).campos;
    const isArrayOfStrings = campos.every(
      (item: any) => typeof item === "string"
    );

    if (!isArrayOfStrings || campos?.length !== evento?.campo?.length) {
      onOpenErro();
    } else {
      onOpen();
    }
  };

  return (
    <div className="flex flex-row items-center justify-end w-full">
      <Button
        color="primary"
        className="text-white h-14 w-32"
        onPress={validarForm}
      >
        Confirmar
      </Button>
    </div>
  );
};

export default FormularioFooter;
