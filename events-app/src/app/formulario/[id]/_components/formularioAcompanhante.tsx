import ControllerCheckbox from "@/components/form/controllerCheckbox";
import { useFomrularioContext } from "../formularioProvider";
import ControllerInput from "@/components/form/controllerInput";
import { parse } from "date-fns";

type Props = {
  index: number;
};

const FormAcompanhante = (params: Props) => {
  const { index } = params;
  const { form, evento } = useFomrularioContext();
  const { control, watch } = form;
  const { colaborador } = watch();

  const acompanhante = colaborador?.dependentes[index];

  const dataAtual = new Date();

  const providedDate = evento
    ? parse(evento.formulario.end, "dd/MM/yyyy", new Date())
    : new Date();

  const disable = dataAtual > providedDate;

  return (
    <div className="flex flex-wrap gap-6 items-start">
      <ControllerInput
        inputProps={{
          isReadOnly: disable,
          defaultValue: acompanhante?.nome,
          placeholder: "Digite nome do namorado(a), marido ou esposa",
          description: "Nome do Namorado(a), Marido ou Esposa",
          className: "max-w-96",
        }}
        controllerProps={{
          control: control,
          name: `colaborador.dependentes.${index}.nome`,
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
          isDisabled: disable,
        }}
        controllerProps={{
          control: control,
          name: `colaborador.dependentes.${index}.bebida`,
        }}
      />
    </div>
  );
};

export default FormAcompanhante;
