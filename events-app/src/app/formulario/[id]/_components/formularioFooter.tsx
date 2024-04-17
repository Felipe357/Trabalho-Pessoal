import { Button } from "@nextui-org/react";
import { useFomrularioContext } from "../formularioProvider";

const FormularioFooter = () => {
  const { disclousureFormularioConfirmacao } = useFomrularioContext();

  const { onOpen } = disclousureFormularioConfirmacao;

  return (
    <div className="flex flex-row items-center justify-end w-full">
      <Button color="primary" className="text-white h-14 w-32" onPress={onOpen}>
        Confirmar
      </Button>
    </div>
  );
};

export default FormularioFooter;
