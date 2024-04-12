import { Input } from "@nextui-org/react";
import { useFomrularioContext } from "../formularioProvider";
import ControllerCheckbox from "@/components/form/checkbox";
import { parse } from "date-fns";

const FormColaborador = () => {
  const { form, evento } = useFomrularioContext();
  const { control, watch } = form;

  const { colaborador } = watch();

  const dataAtual = new Date();

  const providedDate = evento
    ? parse(evento.dataFormularioFim, "dd/MM/yyyy", new Date())
    : new Date();

  const disable = dataAtual > providedDate;

  return (
    <div className="flex flex-wrap gap-6 items-start">
      <Input
        isReadOnly
        variant="bordered"
        defaultValue={colaborador.nome}
        className="w-full max-w-96"
        classNames={{
          inputWrapper: `h-14 border-[#306B25]`,
        }}
      />
      <ControllerCheckbox
        checkBoxProps={{
          title: "Consumo de bebida alcoolica?",
          isDisabled: disable,
        }}
        controllerProps={{ control: control, name: "colaborador.bebida" }}
      />

      <ControllerCheckbox
        checkBoxProps={{
          title: "Vou com o ônibus da empresa?",
          isDisabled: disable,
        }}
        controllerProps={{ control: control, name: "colaborador.transporte" }}
      />
    </div>
  );
};

export default FormColaborador;
