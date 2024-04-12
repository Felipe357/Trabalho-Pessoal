import { Button } from "@nextui-org/react";
import { useFomrularioContext } from "../formularioProvider";

const FormularioFooter = () => {
  const { disclousureFormularioConfirmacao } = useFomrularioContext();

  const { onOpen } = disclousureFormularioConfirmacao;

  return (
    <div className="flex flex-row items-center justify-end w-full">
      <Button className="bg-[#3E7E28] text-white h-14 w-32" onPress={onOpen}>
        Confirmar
      </Button>
    </div>
  );
};

export default FormularioFooter;
