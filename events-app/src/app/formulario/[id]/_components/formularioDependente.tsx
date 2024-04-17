import { Input } from "@nextui-org/react";
import { useFomrularioContext } from "../formularioProvider";
import ControllerCheckbox from "@/components/form/controllerCheckbox";
import { parse } from "date-fns";

type Props = {
  index: number;
};

const FormDependente = (params: Props) => {
  const { index } = params;
  const { form, evento } = useFomrularioContext();
  const { control, watch } = form;

  const { colaborador } = watch();

  const { nome, idade } = colaborador.dependentes[index];

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
        defaultValue={nome}
        className="w-full max-w-96"
        classNames={{
          inputWrapper: "h-14 border-[#306B25] ",
          mainWrapper: "hover:border-[#306B25]",
        }}
      />
      <ControllerCheckbox
        checkBoxProps={{
          title: "Vai á festa?",
          isDisabled: disable,
        }}
        controllerProps={{
          control: control,
          name: `colaborador.dependentes.${index}.presenca`,
        }}
      />

      <ControllerCheckbox
        checkBoxProps={{
          title: "Consumo de bebida alcoolica?",
          isDisabled: idade < 18 ?? disable,
        }}
        controllerProps={{
          control: control,
          name: `colaborador.dependentes.${index}.bebida`,
        }}
      />
    </div>
  );
};

export default FormDependente;
