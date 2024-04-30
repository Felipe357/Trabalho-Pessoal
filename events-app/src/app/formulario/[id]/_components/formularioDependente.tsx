import { Input } from "@nextui-org/react";
import { useFormularioContext } from "../formularioProvider";
import ControllerCheckbox from "@/components/form/controllerCheckbox";
import { differenceInYears, parse } from "date-fns";

type Props = {
  dependente: any;
};

const FormDependente = (params: Props) => {
  const { dependente } = params;
  const { form, evento } = useFormularioContext();

  const { control, watch } = form;

  const { participantes } = watch();

  const index = participantes.indexOf(dependente);

  const dataAtual = new Date();

  const providedDate = evento
    ? parse(evento.formulario.end, "dd/MM/yyyy", new Date())
    : new Date();

  const disable = dataAtual > providedDate;

  return (
    <div className="flex flex-wrap gap-6 items-start">
      <Input
        isReadOnly
        variant="bordered"
        value={dependente?.dependente.nome_completo}
        className="w-full max-w-96"
        classNames={{
          inputWrapper: "h-14 border-[#52b032] ",
          mainWrapper: "hover:border-[#52b032]",
        }}
      />
      <ControllerCheckbox
        checkBoxProps={{
          title: "Vai á festa?",
          isDisabled: disable,
          defaultSelected: dependente.participacao,
        }}
        controllerProps={{
          control: control,
          name: `participantes.${index}.participacao`,
        }}
      />

      <ControllerCheckbox
        checkBoxProps={{
          title: "Consumo de bebida alcoolica?",
          isDisabled:
            (dependente &&
              differenceInYears(
                dataAtual,
                dependente.dependente.data_nascimento
              ) < 18) ??
            disable,
          defaultSelected: dependente.bebida_alcoolica,
        }}
        controllerProps={{
          control: control,
          name: `participantes.${index}.bebida_alcoolica`,
        }}
      />
    </div>
  );
};

export default FormDependente;
