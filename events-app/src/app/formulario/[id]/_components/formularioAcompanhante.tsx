import ControllerCheckbox from "@/components/form/controllerCheckbox";
import { useFormularioContext } from "../formularioProvider";
import ControllerInput from "@/components/form/controllerInput";
import { parse } from "date-fns";
import { useEffect } from "react";

type Props = {
  dependente?: any;
};

const FormAcompanhante = ({ dependente }: Props) => {
  const { form, evento } = useFormularioContext();
  const { control, watch, setValue } = form;
  const { participantes } = watch();

  const index = participantes.indexOf(dependente);

  const tipoParticipante = dependente
    ? dependente.dependente.tipo === 0
      ? "dependente"
      : "acompanhante"
    : "acompanhante";

  const dataAtual = new Date();
  const providedDate = evento
    ? parse(evento.formulario.end, "dd/MM/yyyy", new Date())
    : new Date();
  const disable = dataAtual > providedDate;

  useEffect(() => {
    if (
      participantes[index] &&
      participantes[index].participacao !== undefined &&
      !participantes[index].participacao
    ) {
      setValue(`participantes.${index}.bebida_alcoolica`, false);
    }
  }, [participantes[index]?.participacao]);

  return (
    <div className="flex flex-wrap gap-6 items-start">
      <ControllerInput
        inputProps={{
          isReadOnly: disable,
          placeholder: "Digite nome do namorado(a), marido ou esposa",
          description: "Nome do Namorado(a), Marido ou Esposa",
          className: "max-w-96",
        }}
        controllerProps={{
          control: control,
          name: `participantes.${index}.${tipoParticipante}.nome_completo`,
        }}
      />
      <ControllerCheckbox
        checkBoxProps={{
          title: "Vai à festa?",
          isDisabled: disable,
          defaultSelected: participantes[index]?.participacao ?? false,
        }}
        controllerProps={{
          control: control,
          name: `participantes.${index}.participacao`,
        }}
      />

      <ControllerCheckbox
        checkBoxProps={{
          title: "Consumo de bebida alcoólica?",
          isDisabled:
            (participantes[index] &&
              participantes[index].participacao !== undefined &&
              !participantes[index].participacao) ??
            disable,
          defaultSelected: participantes[index]?.bebida_alcoolica ?? false,
        }}
        controllerProps={{
          control: control,
          name: `participantes.${index}.bebida_alcoolica`,
        }}
      />
    </div>
  );
};

export default FormAcompanhante;
